"use client";

import React from "react";
import { SearchX } from "lucide-react";
import MenuItemCard from "./MenuItemCard";
import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

interface MenuGridProps {
  items: HomeMenuItem[];
  onOpenItem: (item: HomeMenuItem) => void;
  onClearFilters: () => void;
}

export default function MenuGrid({
  items,
  onOpenItem,
  onClearFilters,
}: MenuGridProps) {
  return (
    <section
      id="menu-items"
      className="relative w-full bg-[#F8F2E8] pb-16 lg:pb-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24">

            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5">
              <SearchX
                size={28}
                strokeWidth={1.5}
                className="text-[#005544]/50"
              />
            </div>

            <h3 className="font-serif font-black text-[25px] text-[#062F27]">
              No dishes found
            </h3>

            <p className="text-[12px] text-gray-500 mt-2 max-w-xs">
              Try changing your search or filters to find something delicious.
            </p>

            <button
              onClick={onClearFilters}
              className="mt-6 px-7 py-3 rounded-full bg-[#005544] text-white text-[10px] font-bold uppercase tracking-[0.15em]"
            >
              Clear Filters
            </button>

          </div>
        ) : (
          <>
            {/* section heading */}
            <div className="text-center pb-8">

              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-10 h-px bg-[#B8893D]" />

                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#B8893D] font-bold">
                  Chef's Picks
                </span>

                <span className="w-10 h-px bg-[#B8893D]" />
              </div>

              <h2 className="font-serif font-black text-[36px] sm:text-[46px] leading-none text-[#062F27]">
                Featured Dishes
              </h2>

              <p className="mt-3 text-[12px] sm:text-[14px] text-[#625F59]">
                Handpicked favourites from our kitchen
              </p>

            </div>

            {/* PRODUCT GRID */}
            <div className="
              grid
              grid-cols-2
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-3
              sm:gap-5
              lg:gap-6
            ">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onOpen={onOpenItem}
                />
              ))}
            </div>

          </>
        )}

      </div>
    </section>
  );
}