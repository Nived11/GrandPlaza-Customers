"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { useStoreStatus } from "@/hooks/useStoreStatus";

export default function ExclusiveOffersCard() {
  const storeStatus = useStoreStatus();

  // If the admin turned off the offer card, don't display it
  if (!storeStatus.isOfferCardActive) {
    return null;
  }

  const badgeText = storeStatus.offerBadgeText || "Late Night Special";
  const title = storeStatus.offerTitle || "Up to 40% OFF";
  const subtitle = storeStatus.offerSubtitle || "Midnight feast on selected items";
  const bannerSrc = storeStatus.offerBannerImage || "/offers-banner.jpg";

  return (
    <Link
      href="/menu?offers=true"
      className="group relative block w-full overflow-hidden rounded-2xl border border-[var(--brand-gold)]/30 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
    >
      <div className="relative min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] w-full flex items-center bg-[#0d1f18]">
        {/* Background Poster Image */}
        <img
          src={bannerSrc}
          alt="Empire Plaza Late Night Offers"
          className="absolute inset-0 h-full w-full object-cover object-[85%_35%] sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-transparent sm:via-black/60" />

        {/* Text & Action Content */}
        <div className="relative z-10 w-[75%] sm:w-[60%] lg:w-[58%] p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
          {/* Badge */}
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[var(--brand-gold)]/20 border border-[var(--brand-gold)]/40 px-2.5 py-0.5 mb-2 backdrop-blur-sm">
              <Flame className="w-3 h-3 text-[var(--brand-gold)] animate-pulse" />
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[var(--brand-gold)]">
                {badgeText}
              </span>
            </div>
          )}

          {/* Heading */}
          <h3 className="text-white text-[19px] sm:text-[22px] lg:text-[28px] font-serif font-black leading-tight mb-1 drop-shadow-sm">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-gray-200 text-[10px] sm:text-[11px] lg:text-[13px] font-medium leading-snug mb-3.5 sm:mb-4">
              {subtitle}
            </p>
          )}

          {/* Action Button */}
          <div>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[var(--brand-gold)] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-wider text-[#0d1f18] shadow-sm transition-all duration-200 group-hover:bg-amber-400 group-hover:shadow-md">
              View Offers
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
