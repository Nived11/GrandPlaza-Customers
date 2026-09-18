"use client";

import React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type {
  MenuCategory,
  MenuDiet,
  MenuSection,
} from "../hooks/useMenuHook";

export const ALL_CATEGORY = "all" as const;

export type CategoryFilter =
  | number
  | typeof ALL_CATEGORY;

interface MenuFiltersProps {
  categories: MenuCategory[];

  activeCategory: CategoryFilter;
  onCategoryChange: (
    category: CategoryFilter
  ) => void;

  diet: MenuDiet;
  onDietChange: (diet: MenuDiet) => void;

  section: MenuSection;
  onSectionChange: (section: MenuSection) => void;

  resultCount: number;
}

const sectionOptions: MenuSection[] = [
  "ALL",
  "BEST SELLER",
  "COMBO MENU",
  "TODAY'S SPECIAL",
  "OTHERS",
];

export default function MenuFilters({
  categories,
  activeCategory,
  onCategoryChange,
  diet,
  onDietChange,
  section,
  onSectionChange,
  resultCount,
}: MenuFiltersProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="relative z-30 bg-[#F8F2E8]">

      <div className="max-w-[1200px] mx-auto px-5 sm:px-7 lg:px-8 pt-5">

        {/* CATEGORY CARDS */}
        <div className="rounded-[28px] bg-white/80 border border-[#EDE4D7] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-3">

          <div className="flex items-stretch gap-2 overflow-x-auto no-scrollbar">

            {/* ALL */}
            <button
              onClick={() =>
                onCategoryChange(ALL_CATEGORY)
              }
              className={`shrink-0 w-[82px] sm:w-[100px] h-[92px] sm:h-[105px] rounded-[20px] flex flex-col items-center justify-center gap-2 transition-all ${
                activeCategory === ALL_CATEGORY
                  ? "bg-[#005544] text-white shadow-lg"
                  : "bg-[#FCFAF6] text-[#263B36] hover:bg-[#F5EFE4]"
              }`}
            >
              <div className="text-[24px]">♨</div>

              <span className="text-[10px] sm:text-[11px] font-semibold">
                All
              </span>
            </button>

            {categories.map((category) => {
              const active =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    onCategoryChange(category.id)
                  }
                  className={`shrink-0 w-[82px] sm:w-[100px] h-[92px] sm:h-[105px] rounded-[20px] flex flex-col items-center justify-center gap-2 transition-all ${
                    active
                      ? "bg-[#005544] text-white shadow-lg"
                      : "bg-[#FCFAF6] text-[#263B36] hover:bg-[#F5EFE4]"
                  }`}
                >
                  <div className="text-[23px] text-[#B8893D]">
                    ◉
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-semibold text-center px-1">
                    {category.name}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        {/* FILTER CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">

          <div>
            <p className="font-serif text-[24px] sm:text-[28px] font-black text-[#062F27]">
              Our Menu
            </p>

            <p className="text-[10px] uppercase tracking-[0.16em] text-[#9B948A] mt-1">
              {resultCount} dishes available
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* DIET */}
            <div className="flex items-center bg-white rounded-full border border-[#E6DED2] p-1">

              {(["ALL", "VEG", "NON-VEG"] as MenuDiet[]).map(
                (value) => (
                  <button
                    key={value}
                    onClick={() =>
                      onDietChange(value)
                    }
                    className={`px-3 sm:px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.08em] transition-all ${
                      diet === value
                        ? "bg-[#005544] text-white"
                        : "text-[#77716A]"
                    }`}
                  >
                    {value === "ALL"
                      ? "All"
                      : value === "VEG"
                      ? "Veg"
                      : "Non-Veg"}
                  </button>
                )
              )}

            </div>

            {/* SECTION */}
            <div className="relative">

              <button
                onClick={() => setOpen((value) => !value)}
                className="flex items-center gap-2 bg-white border border-[#E6DED2] rounded-full px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#263B36]"
              >
                <SlidersHorizontal size={13} />
                <span className="hidden sm:block">
                  {section === "ALL"
                    ? "Filter"
                    : section}
                </span>
                <ChevronDown size={13} />
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-2 w-[210px] bg-white rounded-2xl border border-[#E9E1D5] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-2 overflow-hidden">

                  {sectionOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onSectionChange(option);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.08em] ${
                        section === option
                          ? "bg-[#005544] text-white"
                          : "text-[#625E58] hover:bg-[#F8F2E8]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}