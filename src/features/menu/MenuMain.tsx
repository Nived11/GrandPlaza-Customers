"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MenuHero from "./components/MenuHero";
import MenuFilters, {
  ALL_CATEGORY,
  CategoryFilter,
} from "./components/MenuFilters";
import MenuGrid from "./components/MenuGrid";
import MenuMoodSection from "./components/MenuMoodSection";
import MenuSkeleton from "./components/MenuSkeleton";

import ProductQuickViewModal from "@/features/product/components/ProductQuickViewModal";

import { useMenuHook } from "./hooks/useMenuHook";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

const MenuMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>(ALL_CATEGORY);

  const [selectedProduct, setSelectedProduct] =
    React.useState<HomeMenuItem | null>(null);

  const {
    menuItems,
    categories,
    loading,
    error,
  } = useMenuHook({
    category:
      activeCategory === ALL_CATEGORY
        ? undefined
        : String(activeCategory),
    search: searchQuery,
  });

  const handleClearFilters = () => {
    // Clear selected category
    setActiveCategory(ALL_CATEGORY);

    // Clear search from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");

    const query = params.toString();

    router.replace(
      query ? `/menu?${query}` : "/menu",
      { scroll: false }
    );
  };

  if (loading && menuItems.length === 0) {
    return <MenuSkeleton />;
  }

  if (error && menuItems.length === 0) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-[12px] font-bold text-red-500 uppercase tracking-[0.15em] text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <MenuHero />

      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div
        className={
          loading
            ? "opacity-60 transition-opacity"
            : "transition-opacity"
        }
      >
        <MenuGrid
          items={menuItems}
          onOpenItem={setSelectedProduct}
          onClearFilters={handleClearFilters}
        />
      </div>

      <MenuMoodSection />

      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default MenuMain;