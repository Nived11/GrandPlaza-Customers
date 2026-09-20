"use client";

import React from "react";
import { UtensilsCrossed } from "lucide-react";
import type { MenuCategory } from "../hooks/useMenuHook";
import { getCategoryIcon } from "../utils/menuUtils";

export const ALL_CATEGORY = "ALL" as const;

export type CategoryFilter = number | typeof ALL_CATEGORY;

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
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
      className={`h-8 w-8 object-cover rounded-full ${
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
  onCategoryChange,
}: MenuFiltersProps) {
  return (
    <section className="relative z-20 w-full bg-transparent">
      <div className="mx-auto -mt-8 max-w-[1200px] px-4 sm:px-6 lg:-mt-10 lg:px-8">
        <div className="rounded-[22px] border border-gray-100 bg-white px-3 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.08)] sm:px-4 sm:py-4">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto sm:gap-3 lg:justify-center lg:gap-3">
            {/* ALL */}
            <button
              type="button"
              onClick={() => onCategoryChange(ALL_CATEGORY)}
              className={`flex h-[72px] w-[68px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl transition-all sm:h-[78px] sm:w-[74px] ${
                activeCategory === ALL_CATEGORY
                  ? "bg-[var(--brand-green-dark)] text-white shadow-md"
                  : "bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              <UtensilsCrossed
                size={22}
                strokeWidth={activeCategory === ALL_CATEGORY ? 2.2 : 1.7}
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

            {categories.map((category) => {
              const active = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl px-1 transition-all sm:h-[78px] sm:w-[78px] ${
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
                      active ? "text-white" : "text-[var(--brand-green-dark)]"
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