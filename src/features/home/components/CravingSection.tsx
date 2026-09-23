"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        if (isSticky) setIsSticky(false);
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sentinelRef.current) {
            ticking = false;
            return;
          }

          const sentinelRect = sentinelRef.current.getBoundingClientRect();
          const currentHeaderHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--mobile-header-height"
            ) || "70",
            10
          );

          // 🛡️ Smooth Hysteresis (Header height-ൽ sticky ആകുന്നു, +10px തിരികെ സ്ക്രോൾ ചെയ്യുമ്പോൾ un-stick ആകുന്നു)
          setIsSticky((prev) => {
            if (!prev && sentinelRect.top <= currentHeaderHeight) {
              return true;
            }
            if (prev && sentinelRect.top > currentHeaderHeight + 10) {
              return false;
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

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
    <div ref={containerRef} className="w-full relative">
      {/* Title Section */}
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 px-2">
        <span className="text-[var(--brand-gold)] opacity-70">✦✧</span>
        <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Explore Our{" "}
          <span className="text-[var(--brand-gold)] font-serif">Menu</span>
        </h2>
        <span className="text-[var(--brand-gold)] opacity-70">✧✦</span>
      </div>

      {/* 📍 Invisible Sentinel for rock-solid sticky detection */}
      <div ref={sentinelRef} className="h-0 w-full pointer-events-none" />

      {/* Layout Wrapper: അടിയിലുള്ള വിഭവങ്ങൾ ചാടാതിരിക്കാൻ സ്പേസ് നിലനിർത്തുന്നു */}
      <div className="w-full relative min-h-[96px] md:min-h-0">
        {/* Category Container */}
        <div
          style={
            isSticky
              ? { top: "var(--mobile-header-height, 70px)" }
              : undefined
          }
          className={`${
            isSticky
              ? "fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-1.5"
              : "relative w-full mx-auto py-1"
          } lg:px-10 transition-[top,background-color,box-shadow] duration-300 ease-out`}
        >
          {/* Left Arrow (Desktop only) */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-[45px] -translate-y-1/2 z-20 w-8 h-8 bg-white border border-gray-200 rounded-full hidden lg:flex items-center justify-center shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600 cursor-pointer active:scale-95"
          >
            <ChevronLeft size={16} className="w-4 h-4" />
          </button>

          {/* Scroll container: സ്ക്രീനിൽ കൃത്യമായി 5 എണ്ണം മാത്രം ഫിറ്റ് ആകുന്ന രീതിയിൽ */}
          <div
            ref={scrollContainerRef}
            className="no-scrollbar [&::-webkit-scrollbar]:hidden flex items-start gap-2.5 px-3 lg:px-4 lg:gap-6 overflow-x-auto scroll-smooth py-1 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {data.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0 snap-start w-[calc((100vw-64px)/5)] max-w-[76px] lg:w-[82px] lg:max-w-none"
              >
                {/* റൗണ്ട് സർക്കിൾ (കൃത്യം 5 എണ്ണം ഫിറ്റ് ആകുന്ന അനുപാതത്തിൽ) */}
                <div
                  className={`${
                    isSticky
                      ? "w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] p-0.5 shadow-xs"
                      : "w-[56px] h-[56px] sm:w-[58px] sm:h-[58px] p-1 shadow-sm"
                  } lg:w-[82px] lg:h-[82px] lg:p-1 rounded-full bg-white border border-gray-200 group-hover:border-[var(--brand-gold)] group-hover:shadow-md transition-[width,height,padding] duration-300 ease-out`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* പേര് (കണ്ടെയ്നറിന്റെ വിഡ്ത്തിൽ ഒതുങ്ങി നിൽക്കുന്നു) */}
                <span className="text-[8px] sm:text-[8.5px] lg:text-[10px] w-full lg:w-[82px] line-clamp-1 lg:line-clamp-2 font-bold lg:font-black text-slate-700 uppercase tracking-wider text-center leading-tight group-hover:text-[var(--brand-green-dark)] transition-colors">
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
    </div>
  );
}