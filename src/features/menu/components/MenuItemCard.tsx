"use client";

import React from "react";
import { Heart, Plus } from "lucide-react";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

import {
  isVeg,
  getDisplayPrice,
  getDiscountPercent,
  getBadgeLabel,
  isOrderable,
} from "../utils/menuUtils";

interface MenuItemCardProps {
  item: HomeMenuItem;
  onOpen: (item: HomeMenuItem) => void;
}

export default function MenuItemCard({
  item,
  onOpen,
}: MenuItemCardProps) {
  const orderable = isOrderable(item);

  const { price, original } =
    getDisplayPrice(item);

  const discountPct =
    getDiscountPercent(item);

  const badge =
    getBadgeLabel(item);

  const veg = isVeg(item);

  return (
    <article
      onClick={() => {
        if (orderable) {
          onOpen(item);
        }
      }}
      className={`group relative bg-white rounded-[15px] sm:rounded-[18px] overflow-hidden border border-[#EEE5D9] shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ${
        orderable
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
          : "opacity-60 cursor-not-allowed"
      }`}
    >

      {/* IMAGE */}
      <div className="relative w-full aspect-[1/0.88] overflow-hidden bg-[#EEE8DE]">

        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              orderable
                ? "group-hover:scale-105"
                : "grayscale"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#B6AEA2]">
            No Image
          </div>
        )}

        {/* dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* VEG INDICATOR */}
        <span
          className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 rounded-[3px] bg-white border-2 flex items-center justify-center ${
            veg
              ? "border-green-600"
              : "border-red-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              veg
                ? "bg-green-600"
                : "bg-red-500"
            }`}
          />
        </span>

        {/* HEART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center"
          aria-label={`Favourite ${item.name}`}
        >
          <Heart
            size={15}
            strokeWidth={1.8}
            className="text-white"
          />
        </button>

        {/* BADGE */}
        {badge && (
          <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-[#B8893D] text-white px-2 py-1 rounded-full text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.08em]">
            {badge}
          </span>
        )}

        {/* DISCOUNT */}
        {discountPct !== null && (
          <span className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#005544] text-white px-2 py-1 rounded-full text-[7px] sm:text-[8px] font-bold">
            {discountPct}% OFF
          </span>
        )}

        {/* SOLD OUT */}
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="px-3 py-1.5 border border-white/60 rounded-full text-white text-[8px] font-bold uppercase tracking-[0.15em]">
              Sold Out
            </span>
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4">

        <span className="block text-[7px] sm:text-[8px] font-bold text-[#B8893D] uppercase tracking-[0.16em] truncate">
          {item.category_name}
        </span>

        <h3 className="mt-1 font-serif font-black text-[14px] sm:text-[16px] leading-tight text-[#062F27] line-clamp-1">
          {item.name}
        </h3>

        <p className="mt-1.5 text-[9px] sm:text-[11px] leading-[1.45] text-[#77736D] line-clamp-2 min-h-[27px] sm:min-h-[32px]">
          {item.description}
        </p>

        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">

          <div className="flex items-baseline gap-1.5 min-w-0">

            {price !== null ? (
              <>
                <span className="text-[14px] sm:text-[16px] font-black text-[#062F27] whitespace-nowrap">
                  ₹{price}
                </span>

                {original !== null && (
                  <span className="text-[9px] sm:text-[11px] text-gray-400 line-through whitespace-nowrap">
                    ₹{original}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase">
                Coming Soon
              </span>
            )}

          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();

              if (orderable) {
                onOpen(item);
              }
            }}
            disabled={!orderable}
            aria-label={`View ${item.name}`}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform ${
              orderable
                ? "bg-[#005544] hover:scale-105"
                : "bg-gray-300"
            }`}
          >
            <Plus
              size={15}
              strokeWidth={2.5}
              className="text-white"
            />
          </button>

        </div>

      </div>

    </article>
  );
}