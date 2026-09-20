"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import type { HomeMenuItem } from '@/features/home/hooks/useHomeHook';

interface MenuGridProps {
  items: HomeMenuItem[];
  onOpenItem: (item: HomeMenuItem) => void;
  onClearFilters: () => void;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export default function MenuGrid({
  items,
  onOpenItem,
  onClearFilters,
  eyebrow = "Chef's Picks",
  title = 'Featured Dishes',
  subtitle = 'Handpicked favourites from our kitchen',
}: MenuGridProps) {
  return (
    <section className="relative w-full bg-[#FCF8F0] py-10 lg:py-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">

        {/* Section header — centered eyebrow + serif title + subtitle */}
        {/* <div className="flex flex-col items-center text-center mb-8 lg:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-[var(--brand-gold)]/50" />
            <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em]">
              {eyebrow}
            </span>
            <div className="w-8 h-px bg-[var(--brand-gold)]/50" />
          </div>
          <h2 className="font-serif font-black text-3xl lg:text-[38px] text-[var(--brand-green-dark)] mb-2">
            {title}
          </h2>
          <p className="text-[12px] lg:text-[13px] text-gray-500 font-medium">
            {subtitle}
          </p>
        </div> */}

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="relative w-20 h-20 mb-4 opacity-70">
              <img
                src="/leaf2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-contain opacity-60"
              />
              <SearchX
                size={28}
                className="absolute inset-0 m-auto text-[var(--brand-green-dark)]/50"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-serif font-black text-xl text-[var(--brand-green-dark)] mb-2">
              No dishes found
            </h3>
            <p className="text-[12px] text-gray-500 font-medium mb-5 max-w-xs">
              Try a different search term or category — or browse the full menu below.
            </p>
            <button
              onClick={onClearFilters}
              className="px-6 py-2.5 bg-[var(--brand-green-dark)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* grid-cols-2 stays fixed at mobile per the explicit "always 2
             cards on mobile" requirement — only column count above sm
             scales up, mobile never drops to a single column. */
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onOpen={onOpenItem} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}