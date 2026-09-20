"use client";

import React from "react";

interface MenuHeroProps {
  onExploreClick?: () => void;
}

export default function MenuHero({ onExploreClick }: MenuHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#faf7ef]">
      <div className="relative w-full min-h-[250px] sm:min-h-[290px] lg:min-h-[340px]">
        <img
          src="/images/menu/header.png"
          alt="Empire Plaza Menu"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Mobile content */}
        <div className="relative z-10 flex lg:hidden min-h-[250px] sm:min-h-[290px] items-center justify-center px-6 text-center">
          <div className="max-w-[420px]">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-gold)]">
              Our Menu
            </p>

            <h1 className="font-serif text-[32px] sm:text-[42px] font-black leading-[1.05] text-[var(--brand-green-dark)]">
              Discover Your
              <br />
              Next Favourite
            </h1>

            <p className="mt-3 text-[11px] sm:text-[12px] leading-relaxed text-gray-600">
              From timeless traditional recipes to modern culinary creations,
              our menu is crafted to bring people together.
            </p>
          </div>
        </div>

        {/* Desktop content */}
        <div className="relative z-10 hidden lg:flex min-h-[340px] items-center justify-center">
          <div className="w-[430px] text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[var(--brand-gold)]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--brand-gold)]">
                Our Menu
              </span>

              <span className="h-px w-9 bg-[var(--brand-gold)]" />
            </div>

            <h1 className="font-serif text-[50px] font-black leading-[0.98] text-[var(--brand-green-dark)] xl:text-[54px]">
              Discover Your
              <br />
              Next Favourite
            </h1>

            <p className="mx-auto mt-4 max-w-[390px] text-[12px] leading-[1.55] text-[#52627a]">
              From timeless traditional recipes to modern culinary creations,
              our menu is crafted to bring people together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}