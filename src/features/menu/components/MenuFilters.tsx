"use client";

import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

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

  onPrefetchCategory?: (
    categoryId: number
  ) => void;
}

/* =========================================================
   CATEGORY IMAGE / FALLBACK
========================================================= */

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
      <div
        className={`flex h-[58px] w-[58px] items-center justify-center rounded-[13px] border bg-white transition-all duration-200 sm:h-[62px] sm:w-[62px] lg:h-[60px] lg:w-[60px] ${
          active
            ? "border-[var(--brand-gold)] shadow-[0_3px_10px_rgba(212,175,55,0.14)]"
            : "border-[#E7E9E7]"
        }`}
      >
        <FallbackIcon
          size={25}
          strokeWidth={
            active ? 2 : 1.7
          }
          className={
            active
              ? "text-[var(--brand-gold)]"
              : "text-[var(--brand-green-dark)]"
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-[58px] w-[58px] items-center justify-center rounded-[13px] border bg-white p-[2px] transition-all duration-200 sm:h-[62px] sm:w-[62px] lg:h-[60px] lg:w-[60px] ${
        active
          ? "border-[var(--brand-gold)] shadow-[0_3px_10px_rgba(212,175,55,0.14)]"
          : "border-[#E7E9E7]"
      }`}
    >
      <img
        src={src}
        alt={alt}
        onError={() =>
          setErrored(true)
        }
        className="h-full w-full rounded-[10px] object-cover"
      />
    </div>
  );
}

/* =========================================================
   DIET ICON ANIMATION
========================================================= */

const iconTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.6,
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MenuFilters({
  categories,
  activeCategory,
  activeDiet,
  onCategoryChange,
  onDietChange,
  onPrefetchCategory,
}: MenuFiltersProps) {
  return (
    <section className="w-full bg-transparent">

      {/* =====================================================
          MENU TITLE
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1600px] px-4 pt-6 sm:px-6 sm:pt-7 lg:px-8 lg:pt-7">
        <div className="flex flex-col items-center text-center">

          {/* Eyebrow */}
          <div className="mb-1.5 flex items-center justify-center gap-3 sm:mb-2">
            <span className="h-px w-6 bg-[var(--brand-gold)] sm:w-8" />

            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--brand-gold)] sm:text-[10px] lg:text-[11px]">
              Explore Our Menu
            </span>

            <span className="h-px w-6 bg-[var(--brand-gold)] sm:w-8" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-[28px] font-black leading-[1.05] text-[var(--brand-green-dark)] sm:text-[34px] lg:text-[38px]">
            A Taste for Every Craving
          </h2>
        </div>
      </div>

      {/* =====================================================
          CATEGORY SECTION
          ALL ITEMS FIXED
          OTHER CATEGORIES SCROLL
      ===================================================== */}

      <div className="mx-auto mt-5 w-full max-w-[1600px] px-4 sm:mt-6 sm:px-6 lg:mt-5 lg:px-8">

        <div className="flex w-full items-start gap-3 sm:gap-4 lg:gap-[14px]">

          {/* =================================================
              FIXED ALL ITEMS
          ================================================= */}

          <div className="w-[72px] shrink-0 sm:w-[78px] lg:w-[76px]">
            <button
              type="button"
              onClick={() =>
                onCategoryChange(
                  ALL_CATEGORY
                )
              }
              className="group flex w-full flex-col items-center"
            >
              <CategoryThumb
                src={null}
                alt="All"
                active={
                  activeCategory ===
                  ALL_CATEGORY
                }
              />

              <span
                className={`mt-2 line-clamp-2 w-full text-center text-[8px] font-extrabold uppercase leading-[1.25] tracking-[0.02em] sm:text-[9px] ${
                  activeCategory ===
                  ALL_CATEGORY
                    ? "text-[var(--brand-green-dark)]"
                    : "text-[#33433D]"
                }`}
              >
                All Items
              </span>

              {/* Active Gold Underline */}
              <span
                className={`mt-2 h-[2px] w-[68px] rounded-full transition-all duration-300 sm:w-[74px] ${
                  activeCategory ===
                  ALL_CATEGORY
                    ? "bg-[var(--brand-gold)]"
                    : "bg-transparent"
                }`}
              />
            </button>
          </div>

          {/* =================================================
              SCROLLABLE OTHER CATEGORIES
          ================================================= */}

          <div className="relative min-w-0 flex-1">

            <div className="no-scrollbar flex w-full items-start gap-3 overflow-x-auto pb-3 sm:gap-4 lg:gap-[14px]">

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
                      onMouseEnter={() =>
                        onPrefetchCategory?.(
                          category.id
                        )
                      }
                      onFocus={() =>
                        onPrefetchCategory?.(
                          category.id
                        )
                      }
                      className="group flex w-[72px] shrink-0 flex-col items-center sm:w-[78px] lg:w-[76px]"
                    >
                      <CategoryThumb
                        src={category.image}
                        alt={category.name}
                        active={active}
                      />

                      <span
                        className={`mt-2 line-clamp-2 w-full text-center text-[8px] font-extrabold uppercase leading-[1.25] tracking-[0.01em] sm:text-[9px] ${
                          active
                            ? "text-[var(--brand-green-dark)]"
                            : "text-[#33433D]"
                        }`}
                      >
                        {category.name}
                      </span>

                      {/* Active Gold Underline */}
                      <span
                        className={`mt-2 h-[2px] w-[68px] rounded-full transition-all duration-300 sm:w-[74px] ${
                          active
                            ? "bg-[var(--brand-gold)]"
                            : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                }
              )}
            </div>

            {/* =================================================
                SUBTLE RIGHT FADE
            ================================================= */}

            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-[#FCF8F0]/80 via-[#FCF8F0]/25 to-transparent sm:w-5"
              aria-hidden="true"
            />
          </div>

        </div>
      </div>

      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="mt-1 h-px w-full bg-[#E8EBE9]" />

      {/* =====================================================
          DIET FILTERS
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8 lg:py-5">

        <div className="flex w-full items-center gap-1.5 sm:w-auto sm:gap-3">

          {/* =================================================
              ALL ITEMS
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              onDietChange("ALL")
            }
            className={`relative flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full px-2 text-[9px] font-bold uppercase tracking-wide transition-all duration-200 sm:h-[40px] sm:flex-none sm:gap-2 sm:px-6 sm:text-[11px] ${
              activeDiet === "ALL"
                ? "bg-[#C88D18] text-white shadow-[0_5px_16px_rgba(200,141,24,0.20)]"
                : "border border-[#E2E5E3] bg-white/70 text-[var(--brand-green-dark)] hover:border-[#C7CDC9]"
            }`}
          >
            <motion.span
              className={`flex shrink-0 items-center justify-center ${
                activeDiet === "ALL"
                  ? "text-white"
                  : "text-[#C88D18]"
              }`}
              animate={{
                scale:
                  activeDiet === "ALL"
                    ? 1.06
                    : 0.96,
              }}
              transition={iconTransition}
            >
              <UtensilsCrossed
                size={15}
                strokeWidth={2}
              />
            </motion.span>

            <span className="whitespace-nowrap">
              All items
            </span>
          </button>

          {/* =================================================
              VEG
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              onDietChange("VEG")
            }
            className={`relative flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full px-2 text-[9px] font-bold uppercase tracking-wide transition-all duration-200 sm:h-[40px] sm:flex-none sm:gap-2 sm:px-6 sm:text-[11px] ${
              activeDiet === "VEG"
                ? "bg-[var(--brand-green-dark)] text-white shadow-[0_5px_16px_rgba(15,61,46,0.20)]"
                : "border border-[#E2E5E3] bg-white/70 text-[var(--brand-green-dark)] hover:border-[#C7CDC9]"
            }`}
          >
            <motion.span
              className={`flex shrink-0 items-center justify-center ${
                activeDiet === "VEG"
                  ? "text-white"
                  : "text-[#17883B]"
              }`}
              animate={{
                scale:
                  activeDiet === "VEG"
                    ? 1.06
                    : 0.96,
              }}
              transition={iconTransition}
            >
              <span
                className={`flex h-[16px] w-[16px] items-center justify-center rounded-[3px] border-2 ${
                  activeDiet === "VEG"
                    ? "border-white"
                    : "border-[#17883B]"
                }`}
              >
                <span
                  className={`h-[7px] w-[7px] rounded-[2px] ${
                    activeDiet === "VEG"
                      ? "bg-white"
                      : "bg-[#17883B]"
                  }`}
                />
              </span>
            </motion.span>

            <span className="whitespace-nowrap">
              Veg
            </span>
          </button>

          {/* =================================================
              NON-VEG
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              onDietChange("NON-VEG")
            }
            className={`relative flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full px-2 text-[9px] font-bold uppercase tracking-wide transition-all duration-200 sm:h-[40px] sm:flex-none sm:gap-2 sm:px-6 sm:text-[11px] ${
              activeDiet === "NON-VEG"
                ? "bg-[#C62828] text-white shadow-[0_5px_16px_rgba(198,40,40,0.20)]"
                : "border border-[#E2E5E3] bg-white/70 text-[var(--brand-green-dark)] hover:border-[#C7CDC9]"
            }`}
          >
            <motion.span
              className={`flex shrink-0 items-center justify-center ${
                activeDiet === "NON-VEG"
                  ? "text-white"
                  : "text-[#E63333]"
              }`}
              animate={{
                scale:
                  activeDiet === "NON-VEG"
                    ? 1.06
                    : 0.96,
              }}
              transition={iconTransition}
            >
              <span
                className={`flex h-[16px] w-[16px] items-center justify-center rounded-[3px] border-2 ${
                  activeDiet === "NON-VEG"
                    ? "border-white"
                    : "border-[#E63333]"
                }`}
              >
                <span
                  className={`h-[7px] w-[7px] rounded-[2px] ${
                    activeDiet === "NON-VEG"
                      ? "bg-white"
                      : "bg-[#E63333]"
                  }`}
                />
              </span>
            </motion.span>

            <span className="whitespace-nowrap">
              Non-veg
            </span>
          </button>

        </div>
      </div>

    </section>
  );
}