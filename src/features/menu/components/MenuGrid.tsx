"use client";

import React from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { SearchX } from "lucide-react";

import MenuItemCard from "./MenuItemCard";
import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

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
  title = "Featured Dishes",
  subtitle = "Handpicked favourites from our kitchen",
}: MenuGridProps) {
  return (
    <section className="relative w-full bg-[#FCF8F0] py-10 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">

        {/* Section header */}
        {/* 
        <div className="mb-8 flex flex-col items-center text-center lg:mb-10">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-px w-8 bg-[var(--brand-gold)]/50" />

            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--brand-gold)]">
              {eyebrow}
            </span>

            <div className="h-px w-8 bg-[var(--brand-gold)]/50" />
          </div>

          <h2 className="mb-2 font-serif text-3xl font-black text-[var(--brand-green-dark)] lg:text-[38px]">
            {title}
          </h2>

          <p className="text-[12px] font-medium text-gray-500 lg:text-[13px]">
            {subtitle}
          </p>
        </div>
        */}

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="relative mb-4 h-20 w-20 opacity-70">
              <img
                src="/leaf2.png"
                alt=""
                className="absolute inset-0 h-full w-full object-contain opacity-60"
              />

              <SearchX
                size={28}
                className="absolute inset-0 m-auto text-[var(--brand-green-dark)]/50"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mb-2 font-serif text-xl font-black text-[var(--brand-green-dark)]">
              No dishes found
            </h3>

            <p className="mb-5 max-w-xs text-[12px] font-medium text-gray-500">
              Try a different search term or category — or browse the full menu below.
            </p>

            <button
              type="button"
              onClick={onClearFilters}
              className="rounded-sm bg-[var(--brand-green-dark)] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            <AnimatePresence mode="sync">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.985,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MenuItemCard
                    item={item}
                    onOpen={onOpenItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}