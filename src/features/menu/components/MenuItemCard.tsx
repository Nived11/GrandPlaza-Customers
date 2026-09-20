"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import type { HomeMenuItem } from '@/features/home/hooks/useHomeHook';
import { getDisplayPrice, isOrderable } from '../utils/menuUtils';

interface MenuItemCardProps {
  item: HomeMenuItem;
  onOpen: (item: HomeMenuItem) => void;
}

export default function MenuItemCard({ item, onOpen }: MenuItemCardProps) {
  const orderable = isOrderable(item);
  const { price, original } = getDisplayPrice(item);

  // Wishlist is UI-only for now — there's no confirmed wishlist endpoint,
  // so this doesn't persist anywhere yet. Wire this up once one exists.
  const [wishlisted, setWishlisted] = React.useState(false);

  const handleClick = () => {
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
      className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-shadow ${
        orderable ? 'cursor-pointer hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]' : 'opacity-60 cursor-not-allowed'
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

        {/* Wishlist heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((v) => !v);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={13}
            strokeWidth={2.2}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>

        {!item.is_available && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
              Sold Out
            </span>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-serif font-black text-[13px] sm:text-[15px] text-[var(--brand-green-dark)] leading-snug mb-1 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed font-medium mb-2.5 sm:mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            {price !== null ? (
              <>
                <span className="text-[13px] sm:text-[15px] font-black text-[var(--brand-green-dark)]">
                  ₹ {price}
                </span>
                {/* Kept subtle rather than a loud badge, since the reference
                    design shows no discount ribbon — but a real discount is
                    still worth surfacing when one exists. */}
                {original !== null && (
                  <span className="text-[10px] text-gray-400 line-through">
                    ₹{original}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">
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
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              orderable
                ? 'bg-[var(--brand-green-dark)] hover:opacity-90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Plus size={14} className="text-white" strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}