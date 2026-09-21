"use client";

import React from "react";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

import {
  getDisplayPrice,
  isOrderable,
} from "../utils/menuUtils";

interface MenuItemCardProps {
  item: HomeMenuItem;
  onOpen: (item: HomeMenuItem) => void;
}

const MenuItemCard = ({
  item,
  onOpen,
}: MenuItemCardProps) => {
  /*
   * getDisplayPrice returns:
   * {
   *   price,
   *   original
   * }
   */
  const {
    price,
    original: displayOriginal,
  } = getDisplayPrice(item);

  /*
   * Discount calculation
   *
   * Example:
   * actual_price = 420
   * offer_price  = 349
   *
   * ((420 - 349) / 420) * 100
   * = 16.90
   * = 17% OFF
   */
  const actualPrice =
    item.actual_price !== null
      ? Number(item.actual_price)
      : null;

  const offerPrice =
    item.offer_price !== null
      ? Number(item.offer_price)
      : null;

  const hasDiscount =
    actualPrice !== null &&
    offerPrice !== null &&
    Number.isFinite(actualPrice) &&
    Number.isFinite(offerPrice) &&
    actualPrice > 0 &&
    offerPrice > 0 &&
    offerPrice < actualPrice;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((actualPrice - offerPrice) /
          actualPrice) *
          100
      )
    : 0;

  const orderable = isOrderable(item);

  return (
    <article className="group relative overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)]">
      {/* IMAGE */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block w-full text-left"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              No Image
            </div>
          )}

          {/* DISCOUNT BADGE */}
          {hasDiscount && discountPercentage > 0 && (
            <div className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[var(--brand-green-dark)] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
              {discountPercentage}% OFF
            </div>
          )}

          {/* SOLD OUT */}
          {!orderable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-800">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </button>

      {/* CONTENT */}
      <div className="p-3 sm:p-4">
        {/* CATEGORY */}
        {item.category_name && (
          <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--brand-gold)] sm:text-[9px]">
            {item.category_name}
          </p>
        )}

        {/* NAME */}
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="block w-full text-left"
        >
          <h3 className="line-clamp-2 min-h-[36px] text-[13px] font-black leading-[1.35] text-[var(--brand-green-dark)] sm:text-[15px]">
            {item.name}
          </h3>
        </button>

        {/* DESCRIPTION */}
        {item.description && (
          <p className="mt-1 line-clamp-2 text-[10px] leading-[1.5] text-gray-500 sm:text-[11px]">
            {item.description}
          </p>
        )}

        {/* PRICE */}
        <div className="mt-3 flex items-center gap-2">
          {price !== null ? (
            <>
              <span className="text-[13px] font-black text-[var(--brand-green-dark)] sm:text-[15px]">
                ₹ {price}
              </span>

              {displayOriginal !== null && (
                <span className="text-[10px] text-gray-400 line-through">
                  ₹{displayOriginal}
                </span>
              )}
            </>
          ) : (
            <span className="text-[11px] font-bold text-gray-400 sm:text-[12px]">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default MenuItemCard;