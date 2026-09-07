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

export default function CravingSection({
  data = [],
}: CravingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      
      {/* Title Section */}
      <div className="flex items-center justify-center gap-3 mb-6 sm:mb-6 px-2">
        <span className="text-[var(--brand-gold)] opacity-70">
          ✦✧
        </span>

        <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Explore Our{" "}
          <span className="text-[var(--brand-gold)] font-serif">
            Menu
          </span>
        </h2>

        <span className="text-[var(--brand-gold)] opacity-70">
          ✧✦
        </span>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-[1200px] mx-auto px-2 sm:px-12">
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 sm:left-2 top-[35px] lg:top-[42px] -translate-y-1/2 z-10 w-7 h-7 lg:w-9 lg:h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600"
        >
          <ChevronLeft
            size={18}
            className="lg:w-5 lg:h-5"
          />
        </button>

        {/* Categories */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 justify-start sm:justify-center"
        >
          {data.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-3 cursor-pointer group min-w-[70px] lg:min-w-[85px] flex-shrink-0"
            >
              <div className="w-[70px] h-[70px] lg:w-[85px] lg:h-[85px] rounded-full p-1 bg-white border border-gray-200 shadow-sm group-hover:border-[var(--brand-gold)] group-hover:shadow-md transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="text-[9px] lg:text-[10px] font-black text-slate-700 uppercase tracking-widest group-hover:text-[var(--brand-green-dark)]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 sm:right-2 top-[35px] lg:top-[42px] -translate-y-1/2 z-10 w-7 h-7 lg:w-9 lg:h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600"
        >
          <ChevronRight
            size={18}
            className="lg:w-5 lg:h-5"
          />
        </button>

      </div>
    </div>
  );
}