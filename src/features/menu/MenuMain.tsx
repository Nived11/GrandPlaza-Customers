"use client";

import React from "react";

import MenuFilters, {
  ALL_CATEGORY,
  CategoryFilter,
  DietFilter,
} from "./components/MenuFilters";

import MenuGrid from "./components/MenuGrid";
import MenuMoodSection from "./components/MenuMoodSection";
import MenuSkeleton from "./components/MenuSkeleton";

import ProductQuickViewModal from "@/features/product/components/ProductQuickViewModal";

import { useMenuHook } from "./hooks/useMenuHook";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

const MenuMain = () => {
  /* =========================================================
     FILTER STATE
  ========================================================= */

  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>(
      ALL_CATEGORY
    );

  const [activeDiet, setActiveDiet] =
    React.useState<DietFilter>("ALL");

  /* =========================================================
     PRODUCT QUICK VIEW
  ========================================================= */

  const [selectedProduct, setSelectedProduct] =
    React.useState<HomeMenuItem | null>(
      null
    );

  /* =========================================================
     MENU API / TANSTACK QUERY
  ========================================================= */

  const {
    menuItems,
    categories,
    loading,
    isFetching,
    error,
    prefetchCategory,
  } = useMenuHook({
    category:
      activeCategory === ALL_CATEGORY
        ? undefined
        : String(activeCategory),

    diet:
      activeDiet === "ALL"
        ? undefined
        : activeDiet,
  });

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const handleClearFilters = () => {
    setActiveCategory(
      ALL_CATEGORY
    );

    setActiveDiet("ALL");
  };

  /* =========================================================
     INITIAL LOADING
  ========================================================= */

  if (
    loading &&
    menuItems.length === 0
  ) {
    return <MenuSkeleton />;
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    error &&
    menuItems.length === 0
  ) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center px-4">
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.15em] text-red-500">
          {error}
        </p>
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FCF8F0]">

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <MenuFilters
        categories={categories}
        activeCategory={
          activeCategory
        }
        activeDiet={activeDiet}
        onCategoryChange={
          setActiveCategory
        }
        onDietChange={
          setActiveDiet
        }
        onPrefetchCategory={
          prefetchCategory
        }
      />

      {/* =====================================================
          PRODUCT GRID
      ===================================================== */}

      <div
        className={`transition-opacity duration-200 ${
          isFetching
            ? "opacity-70"
            : "opacity-100"
        }`}
      >
        <MenuGrid
          items={menuItems}
          onOpenItem={
            setSelectedProduct
          }
          onClearFilters={
            handleClearFilters
          }
        />
      </div>

      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <MenuMoodSection />

      {/* =====================================================
          PRODUCT QUICK VIEW
      ===================================================== */}

      <ProductQuickViewModal
        product={
          selectedProduct
        }
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </div>
  );
};

export default MenuMain;