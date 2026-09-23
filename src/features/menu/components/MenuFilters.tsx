"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Leaf,
  Drumstick,
} from "lucide-react";

import type { MenuCategory } from "../hooks/useMenuHook";
import { getCategoryIcon } from "../utils/menuUtils";

export const ALL_CATEGORY = "ALL" as const;

export type CategoryFilter =
  | number
  | typeof ALL_CATEGORY;

export type DietFilter =
  | "ALL"
  | "VEG"
  | "NON-VEG";

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: CategoryFilter;
  activeDiet: DietFilter;
  onCategoryChange: (
    category: CategoryFilter
  ) => void;
  onDietChange: (
    diet: DietFilter
  ) => void;
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
  const [errored, setErrored] =
    React.useState(false);

  const FallbackIcon =
    getCategoryIcon(alt);

  if (!src || errored) {
    return (
      <FallbackIcon
        size={22}
        strokeWidth={active ? 2 : 1.7}
        className={
          active
            ? "text-white"
            : "text-[var(--brand-gold)]"
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

const iconTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.6,
};

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

          {/* =================================================
              DIET FILTERS
          ================================================= */}
          <div className="mb-3 flex items-center gap-2 overflow-x-auto no-scrollbar sm:justify-center sm:gap-3">

            {/* ALL */}
            <button
              type="button"
              onClick={() =>
                onDietChange("ALL")
              }
              className={`relative flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-4 text-[10px] font-bold uppercase tracking-wide ${
                activeDiet === "ALL"
                  ? "text-white"
                  : "border border-gray-200 bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              {/* Sliding Indicator */}
              {activeDiet === "ALL" && (
                <motion.span
                  layoutId="diet-active-indicator"
                  className="absolute inset-0 rounded-full bg-[var(--brand-green-dark)] shadow-[0_4px_12px_rgba(15,61,46,0.16)]"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    mass: 0.7,
                  }}
                />
              )}

              {/* Animated Icon */}
              <motion.span
                className="relative z-10 flex items-center justify-center"
                animate={{
                  scale:
                    activeDiet === "ALL"
                      ? 1.08
                      : 0.92,
                  opacity:
                    activeDiet === "ALL"
                      ? 1
                      : 0.65,
                }}
                transition={iconTransition}
              >
                <UtensilsCrossed
                  size={14}
                  strokeWidth={
                    activeDiet === "ALL"
                      ? 2.2
                      : 1.9
                  }
                />
              </motion.span>

              <span className="relative z-10">
                All
              </span>
            </button>

            {/* VEG */}
            <button
              type="button"
              onClick={() =>
                onDietChange("VEG")
              }
              className={`relative flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-4 text-[10px] font-bold uppercase tracking-wide ${
                activeDiet === "VEG"
                  ? "text-white"
                  : "border border-gray-200 bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              {activeDiet === "VEG" && (
                <motion.span
                  layoutId="diet-active-indicator"
                  className="absolute inset-0 rounded-full bg-[var(--brand-green-dark)] shadow-[0_4px_12px_rgba(15,61,46,0.16)]"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    mass: 0.7,
                  }}
                />
              )}

              <motion.span
                className="relative z-10 flex items-center justify-center"
                animate={{
                  scale:
                    activeDiet === "VEG"
                      ? 1.08
                      : 0.92,
                  opacity:
                    activeDiet === "VEG"
                      ? 1
                      : 0.65,
                }}
                transition={iconTransition}
              >
                <Leaf
                  size={14}
                  strokeWidth={
                    activeDiet === "VEG"
                      ? 2.2
                      : 1.9
                  }
                />
              </motion.span>

              <span className="relative z-10">
                Veg
              </span>
            </button>

            {/* NON-VEG */}
            <button
              type="button"
              onClick={() =>
                onDietChange("NON-VEG")
              }
              className={`relative flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-4 text-[10px] font-bold uppercase tracking-wide ${
                activeDiet === "NON-VEG"
                  ? "text-white"
                  : "border border-gray-200 bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
              }`}
            >
              {activeDiet === "NON-VEG" && (
                <motion.span
                  layoutId="diet-active-indicator"
                  className="absolute inset-0 rounded-full bg-[var(--brand-green-dark)] shadow-[0_4px_12px_rgba(15,61,46,0.16)]"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    mass: 0.7,
                  }}
                />
              )}

              <motion.span
                className="relative z-10 flex items-center justify-center"
                animate={{
                  scale:
                    activeDiet === "NON-VEG"
                      ? 1.08
                      : 0.92,
                  opacity:
                    activeDiet === "NON-VEG"
                      ? 1
                      : 0.65,
                }}
                transition={iconTransition}
              >
                <Drumstick
                  size={14}
                  strokeWidth={
                    activeDiet === "NON-VEG"
                      ? 2.2
                      : 1.9
                  }
                />
              </motion.span>

              <span className="relative z-10">
                Non-Veg
              </span>
            </button>
          </div>

          {/* DIVIDER */}
          <div className="mb-3 h-px w-full bg-gray-100" />

          {/* =================================================
              CATEGORY FILTERS
          ================================================= */}
          <div className="relative w-full">

            {/* Scrollable Categories */}
            <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-1 pb-1 sm:gap-3">
              
              {/* ALL CATEGORY */}
              <button
                type="button"
                onClick={() =>
                  onCategoryChange(
                    ALL_CATEGORY
                  )
                }
                className={`flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl transition-all sm:h-[74px] sm:w-[76px] ${
                  activeCategory ===
                  ALL_CATEGORY
                    ? "bg-[var(--brand-green-dark)] text-white shadow-md"
                    : "bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
                }`}
              >
                <UtensilsCrossed
                  size={22}
                  strokeWidth={
                    activeCategory ===
                    ALL_CATEGORY
                      ? 2.2
                      : 1.7
                  }
                  className={
                    activeCategory ===
                    ALL_CATEGORY
                      ? "text-white"
                      : "text-[var(--brand-gold)]"
                  }
                />

                <span className="text-[10px] font-semibold">
                  All
                </span>
              </button>

              {/* API CATEGORIES */}
              {categories.map(
                (category) => {
                  const active =
                    activeCategory ===
                    category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        onCategoryChange(
                          category.id
                        )
                      }
                      className={`flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl px-1 transition-all sm:h-[74px] sm:w-[76px] ${
                        active
                          ? "bg-[var(--brand-green-dark)] text-white shadow-md"
                          : "bg-white text-[var(--brand-green-dark)] hover:bg-[#faf8f2]"
                      }`}
                    >
                      <CategoryThumb
                        src={
                          category.image
                        }
                        alt={
                          category.name
                        }
                        active={active}
                      />

                      <span
                        className={`line-clamp-2 text-center text-[9px] font-semibold leading-[1.15] sm:text-[9.5px] ${
                          active
                            ? "text-white"
                            : "text-[var(--brand-green-dark)]"
                        }`}
                      >
                        {
                          category.name
                        }
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            {/* Subtle Right Fade Only */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-white/85 via-white/35 to-transparent sm:w-6"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}