"use client";

import React from "react";
import { Zap, ChevronRight } from "lucide-react";
import type { HomeMenuItem } from "../hooks/useHomeHook";

interface ComboOffersSectionProps {
  data?: HomeMenuItem[];
  onProductClick?: (product: HomeMenuItem) => void;
}

export default function ComboOffersSection({
  data = [],
  onProductClick,
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
            Special Combos
          </h2>

          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>
        </div>
        
        <button className="absolute right-0 hidden md:flex items-center gap-1 border border-gray-200 text-gray-500 hover:text-[var(--brand-gold)] hover:border-[var(--brand-gold)] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {data.map((item) => {
          const availableVariant = item.variants?.find(
            (variant) => variant.is_available
          );

          const offerPrice =
            item.offer_price ||
            availableVariant?.offer_price;

          const actualPrice =
            item.actual_price ||
            availableVariant?.actual_price;

          const savings =
            offerPrice &&
            actualPrice &&
            Number(actualPrice) > Number(offerPrice)
              ? Number(actualPrice) - Number(offerPrice)
              : 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[var(--brand-gold)]/20 shadow-sm hover:shadow-lg transition-all p-3 flex flex-row gap-4 h-full items-stretch"
            >
              
              {/* Image Section */}
              <div className="relative w-[120px] lg:w-[130px] rounded-xl overflow-hidden bg-[var(--brand-cream-soft)] shrink-0">
                
                {/* SAVE Badge */}
                {savings > 0 && (
                  <div className="absolute top-2 left-2 bg-[var(--brand-gold)] text-[var(--brand-green-dark)] text-[9px] font-black uppercase px-2 py-0.5 rounded-md z-10 shadow-sm">
                    SAVE ₹{savings}
                  </div>
                )}
                
                <img
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details Section */}
              <div className="flex flex-col flex-grow py-1">
                
                <h3 className="text-[13px] font-black text-slate-900 leading-tight mb-1 uppercase tracking-tight line-clamp-2">
                  {item.name}
                </h3>
                
                <p className="text-[9px] lg:text-[10px] text-gray-500 leading-snug line-clamp-2 mb-2">
                  {item.description}
                </p>
                
                <div className="flex items-center gap-2 mb-2.5">
                  {offerPrice && (
                    <span className="text-[18px] font-black text-slate-900 leading-none">
                      ₹{offerPrice}
                    </span>
                  )}

                  {actualPrice &&
                    offerPrice &&
                    Number(actualPrice) >
                      Number(offerPrice) && (
                      <span className="text-[12px] font-semibold text-gray-400 line-through">
                        ₹{actualPrice}
                      </span>
                    )}
                </div>
                
                {/* ORDER NOW Button */}
                <button
                  onClick={() =>
                    onProductClick?.(item)
                  }
                  className="w-full mt-auto bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white py-2.5 rounded-lg text-[10px] font-black flex items-center justify-center gap-1.5 uppercase tracking-widest transition-colors shadow-md active:scale-[0.98]"
                >
                  <Zap
                    size={14}
                    className="text-[var(--brand-gold)] fill-[var(--brand-gold)]"
                  />

                  Order Now
                </button>
                
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}