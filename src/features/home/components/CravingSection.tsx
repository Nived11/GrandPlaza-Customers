"use client";

import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const categories = [
  { name: "BIRYANI", img: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=200&h=200&fit=crop" },
  { name: "BURGERS", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
  { name: "PIZZA", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
  { name: "INDIAN", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop" },
  { name: "CHINESE", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop" },
  { name: "DESSERTS", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop" },
  { name: "BEVERAGES", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=200&h=200&fit=crop" },
];

export default function CravingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🌟 Function to handle smooth scrolling when arrows are clicked
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      
      {/* 🌟 Title Section */}
      <div className="flex items-center justify-center gap-3 mb-6 sm:mb-6 px-2">
        <span className="text-[var(--brand-gold)] opacity-70">✦✧</span>
        <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Explore Our <span className="text-[var(--brand-gold)] font-serif">Menu</span>
        </h2>
        <span className="text-[var(--brand-gold)] opacity-70">✧✦</span>
      </div>
      
      {/* 🌟 Carousel Container with px-2 on mobile */}
      <div className="relative w-full max-w-[1200px] mx-auto px-2 sm:px-12">
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-1 sm:left-2 top-[35px] lg:top-[42px] -translate-y-1/2 z-10 w-7 h-7 lg:w-9 lg:h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600"
        >
          <ChevronLeft size={18} className="lg:w-5 lg:h-5" />
        </button>

        {/* Scrollable Categories List (Sizes reverted to old code) */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-4 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 justify-start sm:justify-center"
        >
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 cursor-pointer group min-w-[70px] lg:min-w-[85px] flex-shrink-0">
              <div className="w-[70px] h-[70px] lg:w-[85px] lg:h-[85px] rounded-full p-1 bg-white border border-gray-200 shadow-sm group-hover:border-[var(--brand-gold)] group-hover:shadow-md transition-all">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-[9px] lg:text-[10px] font-black text-slate-700 uppercase tracking-widest group-hover:text-[var(--brand-green-dark)]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-1 sm:right-2 top-[35px] lg:top-[42px] -translate-y-1/2 z-10 w-7 h-7 lg:w-9 lg:h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] transition-all text-gray-600"
        >
          <ChevronRight size={18} className="lg:w-5 lg:h-5" />
        </button>

      </div>
    </div>
  );
}