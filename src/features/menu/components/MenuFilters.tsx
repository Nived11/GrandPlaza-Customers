"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import type { MenuCategory } from '../hooks/useMenuHook';

export type SortOption = 'popular' | 'price-low' | 'price-high';
export const ALL_CATEGORY = 'all' as const;
export type CategoryFilter = number | typeof ALL_CATEGORY;

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
  totalCount: number;
}

const sortLabels: Record<SortOption, string> = {
  popular: 'Most Popular',
  'price-low': 'Price: Low to High',
  'price-high': 'Price: High to Low',
};

export default function MenuFilters({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
}: MenuFiltersProps) {
  const [sortOpen, setSortOpen] = React.useState(false);

  const pills: { key: CategoryFilter; label: string }[] = [
    { key: ALL_CATEGORY, label: 'All' },
    ...categories.map((c) => ({ key: c.id, label: c.name })),
  ];

  return (
    <div className="sticky top-[64px] lg:top-[72px] z-30 bg-[var(--brand-cream-soft)]/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          {/* Category pills — scrollable row with animated active indicator */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {pills.map(({ key, label }) => {
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => onCategoryChange(key)}
                  className="relative shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] rounded-full transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-category-pill"
                      className="absolute inset-0 bg-[var(--brand-green-dark)] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? 'text-white' : 'text-gray-500 hover:text-[var(--brand-green-dark)]'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort control */}
          <div className="relative shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--brand-green-dark)] border border-gray-200 rounded-sm px-3 py-2 bg-white hover:bg-gray-50 transition-colors"
            >
              <ArrowUpDown size={13} strokeWidth={2.5} />
              {sortLabels[sortBy]}
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-100 rounded-sm shadow-[0_15px_50px_rgba(0,0,0,0.08)] overflow-hidden z-40">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onSortChange(key);
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
                      sortBy === key
                        ? 'text-[var(--brand-gold)] bg-gray-50'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="mt-3 text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-[0.1em]">
          Showing {resultCount} of {totalCount} dishes
        </p>
      </div>
    </div>
  );
}
