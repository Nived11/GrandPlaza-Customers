"use client";

import React from "react";

import MenuHero from "./components/MenuHero";
import MenuFilters, {
  ALL_CATEGORY,
  type CategoryFilter,
} from "./components/MenuFilters";

import MenuGrid from "./components/MenuGrid";
import MenuSkeleton from "./components/MenuSkeleton";

import ProductQuickViewModal from "@/features/product/components/ProductQuickViewModal";

import {
  useMenuHook,
  type MenuDiet,
  type MenuSection,
} from "./hooks/useMenuHook";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

export default function MenuMain() {
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>(ALL_CATEGORY);

  const [diet, setDiet] =
    React.useState<MenuDiet>("ALL");

  const [section, setSection] =
    React.useState<MenuSection>("ALL");

  const [searchQuery, setSearchQuery] =
    React.useState("");

  const [selectedProduct, setSelectedProduct] =
    React.useState<HomeMenuItem | null>(null);

  const {
    menuItems,
    categories,
    loading,
    error,
  } = useMenuHook({
    search: searchQuery,

    category:
      activeCategory === ALL_CATEGORY
        ? "ALL"
        : activeCategory,

    diet,

    section,
  });

  const handleClearFilters = () => {
    setActiveCategory(ALL_CATEGORY);
    setDiet("ALL");
    setSection("ALL");
    setSearchQuery("");
  };

  if (loading) {
    return <MenuSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center bg-[var(--brand-cream-soft)] px-6">
        <div className="text-center">
          <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.15em]">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-6 py-3 bg-[var(--brand-green-dark)] text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[var(--brand-cream-soft)] overflow-hidden">

      {/* HERO */}
      <MenuHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* CATEGORY / FILTER BAR */}
      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        diet={diet}
        onDietChange={setDiet}
        section={section}
        onSectionChange={setSection}
        resultCount={menuItems.length}
      />

      {/* PRODUCTS */}
      <MenuGrid
        items={menuItems}
        onOpenItem={setSelectedProduct}
        onClearFilters={handleClearFilters}
      />

      {/* QUICK VIEW */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </main>
  );
}