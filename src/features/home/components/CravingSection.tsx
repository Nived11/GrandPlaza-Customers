"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface HomeCategory {
  id: number;
  name: string;
  image: string;
}

interface CravingSectionProps {
  data?: HomeCategory[];
}

export default function CravingSection({ data = [] }: CravingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  if (!data || data.length === 0) return null;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative">
      {/* Title Section */}
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 px-2">
        <span className="text-[var(--brand-gold)] opacity-70">✦✧</span>
        <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Explore Our{" "}
          <span className="text-[var(--brand-gold)] font-serif">Menu</span>
        </h2>
        <span className="text-[var(--brand-gold)] opacity-70">✧✦</span>
      </div>

      {/* 
        🔑 CSS position:sticky ഉപയോഗിക്കുന്നു — JS state toggle ഇല്ല, jump ഇല്ല!
        Browser നേരിട്ട് GPU-accelerated sticky ചെയ്യുന്നതിനാൽ 
        യാതൊരു jitter/shiver ഉം ഉണ്ടാകില്ല.
      */}
      <div
        className="md:relative md:py-1 sticky z-40 bg-white py-2 lg:px-10"
        style={{ top: "var(--mobile-header-height, 70px)" }}
      >
        {/* Left Arrow (Desktop only) */}
        <button
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-[45px] -translate-y-1/2 z-20 w-8 h-8 bg-white border border-gray-200 rounded-full hidden lg:flex items-center justify-center shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600 cursor-pointer active:scale-95"
        >
          <ChevronLeft size={16} className="w-4 h-4" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar [&::-webkit-scrollbar]:hidden flex items-start gap-3 px-3 lg:px-4 lg:gap-6 overflow-x-auto py-1 snap-x snap-mandatory will-change-scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {data.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0 snap-start w-[calc((100vw-52px)/4.5)] max-w-[82px] lg:w-[82px] lg:max-w-none"
            >
              {/* റൗണ്ട് സർക്കിൾ — GPU layer promote ചെയ്ത് shiver ഒഴിവാക്കുന്നു */}
              <div className="w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] lg:w-[82px] lg:h-[82px] p-1 lg:p-1 rounded-full bg-white border border-gray-200 shadow-sm group-hover:border-[var(--brand-gold)] group-hover:shadow-md transform-gpu">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full transform-gpu"
                />
              </div>

              {/* പേര് */}
              <span className="text-[8.5px] sm:text-[9px] lg:text-[10px] w-full lg:w-[82px] line-clamp-1 lg:line-clamp-2 font-bold lg:font-black text-slate-700 uppercase tracking-wider text-center leading-tight group-hover:text-[var(--brand-green-dark)]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right fade gradient (Desktop only) */}
        <div className="hidden lg:block absolute right-[40px] top-0 bottom-0 w-16 pointer-events-none z-10 bg-gradient-to-l from-white to-transparent" />

        {/* Right Arrow (Desktop only) */}
        <button
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-[45px] -translate-y-1/2 z-20 w-8 h-8 bg-white border border-gray-200 rounded-full hidden lg:flex items-center justify-center shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600 cursor-pointer active:scale-95"
        >
          <ChevronRight size={16} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}