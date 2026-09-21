"use client";

import React from "react";
import { UtensilsCrossed, Leaf, Drumstick } from "lucide-react";
import type { MenuCategory } from "../hooks/useMenuHook";
import { getCategoryIcon } from "../utils/menuUtils";

export const ALL_CATEGORY = "ALL" as const;

export type CategoryFilter = number | typeof ALL_CATEGORY;

export type DietFilter = "ALL" | "VEG" | "NON-VEG";

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: CategoryFilter;
  activeDiet: DietFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onDietChange: (diet: DietFilter) => void;
}

function CategoryThumb({
  src,
  alt,
  active,
}: {
  src?: string | null;
  alt: string;
  active: boolean;
}) {
  const [errored, setErrored] = React.useState(false);

  const FallbackIcon = getCategoryIcon(alt);

  if (!src || errored) {
    return (
      <FallbackIcon
        size={22}
        strokeWidth={active ? 2 : 1.7}
        className={
          active ? "text-white" : "text-[var(--brand-gold)]"
        }
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={`h-8 w-8 rounded-full object-cover ${
        active
          ? "ring-2 ring-white/50"
          : "ring-1 ring-gray-100"
      }`}
    />
  );
}

export default function MenuFilters({
  categories,
  activeCategory,
  activeDiet,
  onCategoryChange,
  onDietChange,
}: MenuFiltersProps) {
  return (
    <section className="relative z-20 w-full bg-[#FCF8F0]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-[20px] border border-gray-100 bg-white px-3 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.06)] sm:px-4 sm:py-4">
          
          {/* Diet Filters */}
          <div className="mb-3 flex items-center gap-2 overflow-x-auto no-scrollbar sm:justify-center sm:gap-3">
            {/* ALL */}
            <button
              type="button"
              onClick={() => onDietChange("ALL")}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[10px] font-bold uppercase tracking-wide transition-all ${
                activeDiet === "ALL"
                  ? "bg-[var(--brand-green-dark)] text-white shadow-sm"
                  : "border border-gray-200 bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              <UtensilsCrossed
                size={14}
                strokeWidth={2}
              />
              All
            </button>

            {/* VEG */}
            <button
              type="button"
              onClick={() => onDietChange("VEG")}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[10px] font-bold uppercase tracking-wide transition-all ${
                activeDiet === "VEG"
                  ? "bg-[var(--brand-green-dark)] text-white shadow-sm"
                  : "border border-gray-200 bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              <Leaf
                size={14}
                strokeWidth={2}
              />
              Veg
            </button>

            {/* NON-VEG */}
            <button
              type="button"
              onClick={() => onDietChange("NON-VEG")}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[10px] font-bold uppercase tracking-wide transition-all ${
                activeDiet === "NON-VEG"
                  ? "bg-[var(--brand-green-dark)] text-white shadow-sm"
                  : "border border-gray-200 bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              <Drumstick
                size={14}
                strokeWidth={2}
              />
              Non-Veg
            </button>
          </div>

          {/* Divider */}
          <div className="mb-3 h-px w-full bg-gray-100" />

          {/* Category Filters */}
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto sm:gap-3 lg:justify-center lg:gap-3">
            
            {/* ALL CATEGORY */}
            <button
              type="button"
              onClick={() => onCategoryChange(ALL_CATEGORY)}
              className={`flex h-[68px] w-[66px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl transition-all sm:h-[74px] sm:w-[72px] ${
                activeCategory === ALL_CATEGORY
                  ? "bg-[var(--brand-green-dark)] text-white shadow-md"
                  : "bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              <UtensilsCrossed
                size={22}
                strokeWidth={
                  activeCategory === ALL_CATEGORY
                    ? 2.2
                    : 1.7
                }
                className={
                  activeCategory === ALL_CATEGORY
                    ? "text-white"
                    : "text-[var(--brand-gold)]"
                }
              />

              <span className="text-[10px] font-semibold">
                All
              </span>
            </button>

            {/* API CATEGORIES */}
            {categories.map((category) => {
              const active =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    onCategoryChange(category.id)
                  }
                  className={`flex h-[68px] w-[70px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl px-1 transition-all sm:h-[74px] sm:w-[76px] ${
                    active
                      ? "bg-[var(--brand-green-dark)] text-white shadow-md"
                      : "bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
                  }`}
                >
                  <CategoryThumb
                    src={category.image}
                    alt={category.name}
                    active={active}
                  />

                  <span
                    className={`line-clamp-2 text-center text-[9px] font-semibold leading-[1.15] sm:text-[9.5px] ${
                      active
                        ? "text-white"
                        : "text-[var(--brand-green-dark)]"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}