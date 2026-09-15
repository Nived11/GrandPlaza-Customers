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
}

export default function MenuGrid({ items, onOpenItem, onClearFilters }: MenuGridProps) {
  return (
    <section className="relative w-full bg-[var(--brand-cream-soft)] py-8 lg:py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
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
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
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
