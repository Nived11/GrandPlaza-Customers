"use client";

import React from "react";
import { Search, ArrowRight, Leaf, Heart, ChefHat } from "lucide-react";

interface MenuHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function MenuHero({
  searchQuery,
  onSearchChange,
}: MenuHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F2E8]">

      {/* Decorative leaves */}
      <img
        src="/ourstoryleft.png"
        alt=""
        className="absolute left-[-45px] top-[-20px] w-[180px] h-[380px] object-contain opacity-40 pointer-events-none"
      />

      <img
        src="/ourstoryleft.png"
        alt=""
        className="absolute right-[-65px] bottom-[-60px] w-[190px] h-[350px] object-contain opacity-30 rotate-180 pointer-events-none"
      />

      <div className="relative min-h-[520px] lg:min-h-[610px]">

        {/* LEFT CREAM CONTENT */}
        <div className="relative z-10 w-full lg:w-[61%] min-h-[520px] lg:min-h-[610px] flex items-center">

          <div className="w-full max-w-[620px] mx-auto lg:mx-0 px-7 sm:px-10 lg:pl-[9vw] lg:pr-10 py-16">

            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-[#B8893D]">
                Good Food, Better Mood
              </span>

              <span className="w-7 h-px bg-[#B8893D]" />
            </div>

            {/* heading */}
            <h1 className="font-serif font-black text-[#062F27] text-[46px] sm:text-[58px] lg:text-[68px] leading-[0.95] tracking-[-0.04em]">
              Flavours for
              <br />
              Every Moment
            </h1>

            {/* description */}
            <p className="mt-6 max-w-[470px] text-[14px] sm:text-[15px] leading-[1.6] text-[#45514D]">
              From timeless traditional recipes to modern culinary
              creations, our menu is crafted to bring people together.
            </p>

            {/* search */}
            <div className="mt-7 relative w-full max-w-[400px]">

              <Search
                size={17}
                strokeWidth={2}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  onSearchChange(e.target.value)
                }
                placeholder="Search dishes..."
                className="w-full h-[50px] rounded-full bg-white border border-[#E8DED0] pl-12 pr-5 text-[13px] text-gray-700 outline-none focus:ring-2 focus:ring-[#B8893D]/20"
              />

            </div>

            {/* CTA */}
            <button
              onClick={() => {
                document
                  .getElementById("menu-items")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="mt-5 inline-flex items-center gap-4 bg-[#005544] hover:bg-[#064638] text-white rounded-full px-7 py-3.5 text-[12px] font-semibold transition-colors"
            >
              Explore Menu
              <ArrowRight size={16} />
            </button>

            {/* feature points */}
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-5">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#B8893D] flex items-center justify-center">
                  <Leaf
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#B8893D]"
                  />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#18332E]">
                    Fresh
                  </p>
                  <p className="text-[12px] text-[#18332E]">
                    Ingredients
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#B8893D] flex items-center justify-center">
                  <ChefHat
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#B8893D]"
                  />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#18332E]">
                    Authentic
                  </p>
                  <p className="text-[12px] text-[#18332E]">
                    Flavours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#B8893D] flex items-center justify-center">
                  <Heart
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#B8893D]"
                  />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#18332E]">
                    A Better
                  </p>
                  <p className="text-[12px] text-[#18332E]">
                    Dining Experience
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="absolute right-0 top-0 w-[46%] h-full hidden lg:block overflow-hidden">

          <div className="absolute inset-0 bg-[#064638]" />

          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&q=85"
            alt="Signature restaurant dish"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* curved cream edge */}
          <div
            className="absolute left-[-1px] top-[-5%] h-[110%] w-[125px] bg-[#F8F2E8]"
            style={{
              clipPath:
                "ellipse(70% 55% at 0% 50%)",
            }}
          />

          <div className="absolute right-12 bottom-14 text-center text-[#B8893D]">
            <div className="w-12 h-px bg-[#B8893D]/60 mx-auto mb-3" />

            <p className="text-[9px] uppercase tracking-[0.25em] leading-[1.8]">
              Taste
              <br />
              Tradition
              <br />
              Together
            </p>
          </div>

        </div>

        {/* MOBILE IMAGE */}
        <div className="lg:hidden relative w-full h-[260px] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1000&q=85"
            alt="Signature restaurant dish"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#062F27]/40 to-transparent" />

        </div>

      </div>
    </section>
  );
}