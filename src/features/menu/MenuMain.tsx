"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  /* =========================================================
     FILTER STATE
  ========================================================= */

  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>(ALL_CATEGORY);

  const [activeDiet, setActiveDiet] =
    React.useState<DietFilter>("ALL");

  // Sync category param from URL
  useEffect(() => {
    if (categoryParam) {
      const num = Number(categoryParam);
      if (!isNaN(num)) {
        setActiveCategory(num);
      }
    } else {
      setActiveCategory(ALL_CATEGORY);
    }
  }, [categoryParam]);

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

    search: searchParam || undefined,

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
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/menu");
    }
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (category === ALL_CATEGORY) {
        params.delete("category");
      } else {
        params.set("category", String(category));
      }
      const q = params.toString();
      window.history.replaceState(null, "", q ? `/menu?${q}` : "/menu");
    }
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
          handleCategoryChange
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