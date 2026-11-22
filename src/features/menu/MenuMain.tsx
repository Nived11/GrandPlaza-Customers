"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Flame } from "lucide-react";

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
import { hasOffer } from "./utils/menuUtils";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

const MenuMain = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const offersParam = searchParams.get("offers");

  /* =========================================================
     FILTER STATE
  ========================================================= */

  const [activeCategory, setActiveCategory] =
    React.useState<CategoryFilter>(ALL_CATEGORY);

  const [activeDiet, setActiveDiet] =
    React.useState<DietFilter>("ALL");

  const [activeOffers, setActiveOffers] =
    React.useState<boolean>(false);

  // Sync category & offers params from URL
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

  useEffect(() => {
    setActiveOffers(offersParam === "true");
  }, [offersParam]);

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
    setActiveOffers(false);
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

  const handleOffersChange = (enabled: boolean) => {
    setActiveOffers(enabled);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (enabled) {
        params.set("offers", "true");
      } else {
        params.delete("offers");
      }
      const q = params.toString();
      window.history.replaceState(null, "", q ? `/menu?${q}` : "/menu");
    }
  };

  /* =========================================================
     FILTERED ITEMS (OFFERS)
  ========================================================= */

  const displayedItems = useMemo(() => {
    if (!activeOffers) return menuItems;
    return menuItems.filter(hasOffer);
  }, [menuItems, activeOffers]);

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
        activeOffers={activeOffers}
        onCategoryChange={
          handleCategoryChange
        }
        onDietChange={
          setActiveDiet
        }
        onOffersChange={
          handleOffersChange
        }
        onPrefetchCategory={
          prefetchCategory
        }
      />

      {/* =====================================================
          ACTIVE OFFERS BANNER
      ===================================================== */}

      {activeOffers && (
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8 pt-4">
          <div className="flex items-center justify-between rounded-xl bg-amber-500/10 border border-amber-400/40 p-3.5 sm:p-4 text-amber-950 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 shrink-0">
                <Flame className="h-4 w-4 animate-pulse" />
              </span>
              <div>
                <h4 className="text-[12px] sm:text-[14px] font-black text-amber-900 leading-tight">
                  Special Offers & Discounts Active
                </h4>
                <p className="text-[10px] sm:text-[11px] font-medium text-amber-800/80">
                  Showing {displayedItems.length} dishes with active discounts
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOffersChange(false)}
              className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-900 hover:text-amber-950 underline underline-offset-4 shrink-0 ml-3"
            >
              Show All Menu
            </button>
          </div>
        </div>
      )}

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
          items={displayedItems}
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