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
    <div className="w-full">
      {/* Title Section */}
      <div className="flex items-center justify-center gap-3 mb-6 sm:mb-6 px-2">
        <span className="text-[var(--brand-gold)] opacity-70">✦✧</span>
        <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Explore Our{" "}
          <span className="text-[var(--brand-gold)] font-serif">Menu</span>
        </h2>
        <span className="text-[var(--brand-gold)] opacity-70">✧✦</span>
      </div>

      {/* Container */}
      <div className="relative w-full mx-auto lg:px-10">
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
          className="flex items-start gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-1 px-4 lg:px-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {data.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-2 cursor-pointer group shrink-0 snap-start"
            >
              {/* റൗണ്ട് സർക്കിൾ */}
              <div className="w-[70px] h-[70px] lg:w-[82px] lg:h-[82px] rounded-full p-1 bg-white border border-gray-200 shadow-sm group-hover:border-[var(--brand-gold)] group-hover:shadow-md transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* പേര് */}
              <span className="text-[9px] lg:text-[10px] font-black text-slate-700 uppercase tracking-widest text-center line-clamp-2 leading-tight group-hover:text-[var(--brand-green-dark)] w-[72px] lg:w-[82px]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right fade gradient — partially visible item smooth ആയി fade ആകും */}
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