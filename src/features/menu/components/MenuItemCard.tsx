"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { HomeMenuItem } from '@/features/home/hooks/useHomeHook';
import {
  isVeg,
  getDisplayPrice,
  getDiscountPercent,
  getBadgeLabel,
  isOrderable,
} from '../utils/menuUtils';

interface MenuItemCardProps {
  item: HomeMenuItem;
  onOpen: (item: HomeMenuItem) => void;
}

export default function MenuItemCard({ item, onOpen }: MenuItemCardProps) {
  const orderable = isOrderable(item);
  const { price, original } = getDisplayPrice(item);
  const discountPct = getDiscountPercent(item);
  const badge = getBadgeLabel(item);
  const veg = isVeg(item);

  const handleClick = () => {
    // Matches Home's HotPicks/BestSellers/ComboOffers pattern: every
    // click — card or button — just opens the shared quick-view modal.
    // Nothing quick-adds locally anymore.
    if (!orderable) return;
    onOpen(item);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 transition-shadow ${
        orderable
          ? 'cursor-pointer hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)]'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              orderable ? 'group-hover:scale-105' : 'grayscale'
            }`}
          />
        )}

        {/* Veg/Non-veg badge */}
        <span
          className={`absolute top-3 left-3 w-4 h-4 rounded-sm border-2 flex items-center justify-center bg-white ${
            veg ? 'border-green-600' : 'border-red-500'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-green-600' : 'bg-red-500'}`} />
        </span>

        {badge && (
          <span className="absolute top-3 right-3 bg-[var(--brand-gold)] text-white text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full shadow-sm">
            {badge}
          </span>
        )}

        {discountPct !== null && (
          <span className="absolute bottom-3 left-3 bg-[var(--brand-green-dark)] text-white text-[8px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full shadow-sm">
            {discountPct}% OFF
          </span>
        )}

        {!item.is_available && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
              Sold Out
            </span>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-[8px] font-black text-[var(--brand-gold)] uppercase tracking-[0.2em]">
          {item.category_name}
        </span>

        <div className="flex items-start justify-between gap-2 mt-1.5 mb-1">
          <h3 className="font-serif font-black text-[15px] text-[var(--brand-green-dark)] leading-snug">
            {item.name}
          </h3>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed font-medium mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {price !== null ? (
              <>
                <span className="text-[15px] font-black text-[var(--brand-green-dark)]">
                  ₹{price}
                </span>
                {original !== null && (
                  <span className="text-[11px] text-gray-400 line-through">
                    ₹{original}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                Coming Soon
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            disabled={!orderable}
            aria-label={`View ${item.name}`}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              orderable
                ? 'bg-[var(--brand-green-dark)] hover:opacity-90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Plus size={15} className="text-white" strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
