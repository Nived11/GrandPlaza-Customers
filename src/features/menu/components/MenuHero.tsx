import React from 'react';
import { Search } from 'lucide-react';

interface MenuHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function MenuHero({ searchQuery, onSearchChange }: MenuHeroProps) {
  return (
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg py-10 lg:py-14 overflow-hidden border-b border-[var(--brand-gold)]/20">

      {/* Left floating decoration — reuses the same asset convention as AboutHero */}
      <div className="absolute top-2 left-6 lg:left-16 h-full w-[90px] sm:w-[120px] lg:w-[160px] z-0 pointer-events-none opacity-90 rotate-12">
        <img
          src="/ourstoryleft.png"
          alt="Decoration"
          className="w-full h-full object-contain object-left drop-shadow-sm"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          {/* Left: Text + Search */}
          <div className="flex flex-col justify-center max-w-lg lg:pl-12 py-2">
            <div className="flex flex-col items-start gap-2 mb-3">
              <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em]">
                Our Menu
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-serif font-black text-white leading-tight mb-3">
              A Menu Worth Savoring
            </h1>

            <div className="w-10 h-px bg-[var(--brand-gold)]/40 mb-3"></div>

            <p className="text-[12px] sm:text-[13px] text-[#F4F1EA]/90 leading-relaxed font-medium mb-6">
              Over 100+ handcrafted dishes, from traditional Kerala delicacies to
              exquisite Arabian flavours — find your next favourite below.
            </p>

            {/* Search bar */}
            <div className="relative w-full max-w-sm">
              <Search
                size={16}
                strokeWidth={2.5}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dishes, e.g. Chicken Burger"
                className="w-full bg-white/95 text-[13px] font-medium text-gray-700 placeholder:text-gray-400 rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/50 shadow-md"
              />
            </div>
          </div>

          {/* Right: Dish image — TODO: swap this Unsplash placeholder for a real hero asset */}
          <div className="relative w-full h-[160px] sm:h-[200px] lg:h-[240px] flex justify-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80"
              alt="Empire Plaza signature dish"
              className="w-full h-full object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
