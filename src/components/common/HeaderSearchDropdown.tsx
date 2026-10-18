"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Utensils, ArrowRight, Sparkles, Folder } from "lucide-react";
import { getMenuCategoriesApi, getMenuItemsApi } from "@/features/menu/api/menuApi";
import type { MenuCategory, MenuItem } from "@/features/menu/hooks/useMenuHook";

interface HeaderSearchDropdownProps {
  searchQuery: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function HeaderSearchDropdown({
  searchQuery,
  isOpen,
  onClose,
  className = "",
}: HeaderSearchDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cache categories and all items for 5 minutes so search is instant 0ms without server lag
  const { data: categories = [] } = useQuery<MenuCategory[]>({
    queryKey: ["global-search-categories"],
    queryFn: () => getMenuCategoriesApi(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ["global-search-menu-items"],
    queryFn: () => getMenuItemsApi(),
    staleTime: 5 * 60 * 1000,
  });

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const cleanQuery = searchQuery.trim().toLowerCase();

  if (!isOpen || cleanQuery.length === 0) {
    return null;
  }

  // Filter Categories
  const matchedCategories = categories
    .filter((cat) => cat.name.toLowerCase().includes(cleanQuery))
    .slice(0, 4);

  // Filter Dishes
  const matchedDishes = menuItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(cleanQuery) ||
        (item.description && item.description.toLowerCase().includes(cleanQuery))
    )
    .slice(0, 5);

  const hasResults = matchedCategories.length > 0 || matchedDishes.length > 0;

  const handleCategoryClick = (catId: number) => {
    onClose();
    router.push(`/menu?category=${catId}`);
  };

  const handleDishClick = (dishName: string) => {
    onClose();
    router.push(`/menu?search=${encodeURIComponent(dishName)}`);
  };

  const handleViewAll = () => {
    onClose();
    router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}
      style={{
        boxShadow: "0 12px 35px -4px rgba(1, 90, 65, 0.15), 0 6px 12px -2px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-100 p-2 space-y-2">
        {/* ================= 1. CATEGORIES SECTION ================= */}
        {matchedCategories.length > 0 && (
          <div className="space-y-1">
            <div className="px-3 pt-1 pb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400">
              <Folder size={12} className="text-[#D4AF37]" />
              <span>Categories</span>
            </div>
            <div className="space-y-0.5">
              {matchedCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-[#FDFBF7] transition-colors group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#015a41]/5 border border-[#015a41]/10 flex items-center justify-center text-[#015a41] group-hover:bg-[#015a41] group-hover:text-white transition-all shrink-0">
                    <Utensils size={13} />
                  </div>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-[#015a41] transition-colors flex-1 truncate">
                    {cat.name}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                    Explore →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= 2. POPULAR DISHES SECTION ================= */}
        {matchedDishes.length > 0 && (
          <div className="space-y-1 pt-1">
            <div className="px-3 pt-1 pb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>Popular Dishes</span>
            </div>
            <div className="space-y-0.5">
              {matchedDishes.map((dish) => {
                const price = dish.offer_price || dish.actual_price;
                return (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => handleDishClick(dish.name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-[#FDFBF7] transition-colors group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200/60">
                      {dish.image ? (
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="40px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Utensils size={15} />
                        </div>
                      )}
                    </div>

                    {/* Dish Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate group-hover:text-[#015a41] transition-colors">
                        {dish.name}
                      </p>
                      {price && (
                        <p className="text-[11px] font-black text-[#D4AF37]">
                          ₹{price}
                        </p>
                      )}
                    </div>

                    <ArrowRight
                      size={14}
                      className="text-gray-300 group-hover:text-[#015a41] group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 3. NO RESULTS FOUND ================= */}
        {!hasResults && (
          <div className="p-4 text-center space-y-1">
            <p className="text-xs font-bold text-gray-700">
              No dishes or categories found
            </p>
            <p className="text-[11px] text-gray-400">
              Try searching for &quot;Biriyani&quot;, &quot;Burgers&quot;, or &quot;Fish&quot;
            </p>
          </div>
        )}
      </div>

      {/* Footer "View all results" link */}
      <button
        type="button"
        onClick={handleViewAll}
        className="w-full px-4 py-2.5 bg-[#015a41]/5 hover:bg-[#015a41] text-[#015a41] hover:text-white border-t border-gray-100 text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>View all results for &quot;{cleanQuery}&quot;</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
