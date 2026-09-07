"use client";

import React from "react";
import type { HomeMenuItem } from "../hooks/useHomeHook";

interface ComboOffersSectionProps {
  data?: HomeMenuItem[];
}

export default function ComboOffersSection({
  data = [],
}: ComboOffersSectionProps) {
  return (
    <div className="w-full mt-16 lg:mt-24">
      
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 z-10 bg-white px-4">
          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>

          <h2 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest">
            Combo Offers
          </h2>

          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
              className="bg-white rounded-xl lg:rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:border-[var(--brand-gold)]/60 hover:shadow-lg transition-all group overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-[var(--brand-cream-soft)]">
                {discount > 0 && (
                  <div className="absolute top-3 left-3 bg-[var(--brand-gold)] text-[var(--brand-green-dark)] text-[8px] sm:text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm z-10">
                    {discount}% OFF
                  </div>
                )}

                <img
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category */}
                <div className="absolute bottom-3 left-3 bg-[var(--brand-green-dark)]/90 backdrop-blur-sm text-[var(--brand-gold)] text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm border border-[var(--brand-gold)]/20">
                  {item.category_name}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                
                {/* Dietary Preference */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.dietary_preference === "NON-VEG"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  />

                  <span
                    className={`text-[8px] sm:text-[9px] font-black tracking-widest ${
                      item.dietary_preference === "NON-VEG"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.dietary_preference}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight mb-2">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-end justify-between">
                  <div className="flex flex-col">
                    {offerPrice && (
                      <span className="text-base sm:text-lg font-black text-[var(--brand-green-dark)]">
                        ₹{offerPrice}
                      </span>
                    )}

                    {actualPrice &&
                      offerPrice &&
                      Number(actualPrice) > Number(offerPrice) && (
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 line-through">
                          ₹{actualPrice}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}