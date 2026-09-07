"use client";

import React from "react";
import { Plus } from "lucide-react";
import type { HomeMenuItem } from "../hooks/useHomeHook";

interface BestSellersSectionProps {
  data?: HomeMenuItem[];
}

export default function BestSellersSection({
  data = [],
}: BestSellersSectionProps) {
  return (
    <div className="w-full mt-16 lg:mt-24">
      
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 z-10 bg-white px-4">
          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>

          <h2 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest">
            Best Sellers
          </h2>

          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-5">
        {data.map((item) => {
          const availableVariant = item.variants?.find(
            (variant) => variant.is_available
          );

          const offerPrice =
            item.offer_price || availableVariant?.offer_price;

          const actualPrice =
            item.actual_price || availableVariant?.actual_price;

          const discount =
            offerPrice &&
            actualPrice &&
            Number(actualPrice) > 0
              ? Math.round(
                  ((Number(actualPrice) - Number(offerPrice)) /
                    Number(actualPrice)) *
                    100
                )
              : 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl lg:rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:border-[var(--brand-gold)]/60 hover:shadow-lg transition-all group flex flex-col overflow-hidden h-full"
            >
              
              {/* Image Wrapper */}
              <div className="relative w-full h-28 sm:h-36 overflow-hidden bg-[var(--brand-cream-soft)]">
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-2 left-2 bg-[var(--brand-gold)] text-[var(--brand-green-dark)] text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm z-10">
                    {discount}% OFF
                  </div>
                )}

                {/* Image */}
                <img
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 bg-[var(--brand-green-dark)]/90 backdrop-blur-sm text-[var(--brand-gold)] text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm border border-[var(--brand-gold)]/20 z-10">
                  {item.category_name}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-2.5 sm:p-4 flex flex-col flex-grow bg-white">
                
                {/* Veg/Non-Veg Indicator */}
                <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      item.dietary_preference === "NON-VEG"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  />

                  <span
                    className={`text-[7px] sm:text-[8px] font-black tracking-widest ${
                      item.dietary_preference === "NON-VEG"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.dietary_preference}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[10px] sm:text-[13px] font-black text-slate-900 leading-tight mb-1 sm:mb-1.5 line-clamp-1">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-gray-500 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                  {item.description}
                </p>

                {/* Price & Add Button */}
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col">
                    {offerPrice && (
                      <span className="text-[12px] sm:text-[16px] font-black text-[var(--brand-green-dark)] leading-none mb-0.5 sm:mb-1">
                        ₹{offerPrice}
                      </span>
                    )}

                    {actualPrice &&
                      offerPrice &&
                      Number(actualPrice) > Number(offerPrice) && (
                        <span className="text-[9px] sm:text-[11px] font-semibold text-gray-400 line-through">
                          ₹{actualPrice}
                        </span>
                      )}
                  </div>

                  {/* Add Button */}
                  <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--brand-green-dark)] hover:bg-[#024532] text-[var(--brand-gold)] flex items-center justify-center shadow-sm sm:shadow-md transition-colors active:scale-95 border border-[var(--brand-gold)]/30">
                    <Plus
                      size={14}
                      strokeWidth={3}
                      className="sm:w-[18px] sm:h-[18px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}