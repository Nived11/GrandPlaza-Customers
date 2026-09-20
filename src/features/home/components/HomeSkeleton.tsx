"use client";

import React from "react";

const SkeletonBox = ({ className }: { className: string }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
};

export default function HomeSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[var(--brand-cream-soft)] overflow-x-hidden">
      
      {/* Banner Skeleton (BannerSection-ന്റെ കൃത്യമായ ലേഔട്ട്) */}
      <div className="relative w-full bg-white pb-24 lg:pb-12 pt-0 overflow-visible font-sans">
        <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[460px] bg-[var(--brand-cream-soft)] overflow-visible flex flex-row items-center">
          
          {/* ഇടത് വശത്തെ Text & Button Skeleton */}
          <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center z-20">
            <div className="text-left mt-0 lg:mt-[-60px] z-10 w-[55%] lg:w-[55%] space-y-3 lg:space-y-4">
              <SkeletonBox className="w-24 sm:w-32 h-3 lg:h-4 rounded-full" />
              <SkeletonBox className="w-4/5 sm:w-3/5 h-6 sm:h-8 lg:h-12 rounded-xl" />
              <div className="space-y-2 max-w-[180px] sm:max-w-[240px] lg:max-w-md">
                <SkeletonBox className="w-full h-2.5 sm:h-3.5 rounded-md" />
                <SkeletonBox className="w-3/4 h-2.5 sm:h-3.5 rounded-md" />
              </div>
              <div className="pt-1 sm:pt-2">
                <SkeletonBox className="w-24 sm:w-32 lg:w-36 h-7 sm:h-9 lg:h-12 rounded-full" />
              </div>
            </div>
          </div>

          {/* വലത് വശത്തെ Curved Food Dish Skeleton */}
          <div className="absolute right-0 top-0 w-[45%] sm:w-[50%] h-full lg:h-[400px] z-10 overflow-hidden">
            <div 
              className="absolute right-0 top-0 w-full h-full bg-gray-200 animate-pulse"
              style={{ 
                borderTopLeftRadius: "500px",
                borderBottomLeftRadius: "500px", 
                borderLeft: "5px solid rgba(231,170,49,0.3)" 
              }}
            />
          </div>

        </div>

        {/* താഴത്തെ 4-Feature Floating Card Skeleton */}
        <div className="absolute -bottom-[-40px] lg:bottom-10 left-[0px] lg:left-[-200px] w-full pointer-events-none z-30">
          <div className="max-w-[1000px] mx-auto px-2 lg:px-10 w-full flex justify-center lg:justify-start">
            <div className="w-full lg:w-[90%] bg-white rounded-lg sm:rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-[var(--brand-gold)]/10 py-1.5 lg:py-2.5 px-3 lg:px-6">
              <div className="grid grid-cols-4 divide-x divide-gray-100 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 px-1 lg:px-3">
                    <SkeletonBox className="w-6 h-6 lg:w-8 lg:h-8 rounded-full shrink-0" />
                    <div className="flex flex-col items-center lg:items-start gap-1 w-full max-w-[80px]">
                      <SkeletonBox className="w-12 lg:w-16 h-2 lg:h-3 rounded" />
                      <SkeletonBox className="w-8 lg:w-12 h-1.5 lg:h-2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <section className="bg-white w-full max-w-[1400px] mx-auto px-4 lg:px-10 pt-4 lg:pt-0">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left */}
          <div className="lg:col-span-8 flex flex-col gap-10 lg:gap-15">
            
            {/* Mobile exclusive card space */}
            <div className="block lg:hidden -mt-8 sm:-mt-12 relative z-10">
              <SkeletonBox className="w-full h-32 rounded-2xl" />
            </div>

            {/* Explore Menu */}
            <div className="w-full">
              <div className="flex justify-center mb-6">
                <SkeletonBox className="w-48 h-6" />
              </div>

              <div className="flex justify-center gap-4 lg:gap-6 overflow-hidden">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col items-center gap-3 min-w-[70px] lg:min-w-[85px]"
                  >
                    <SkeletonBox className="w-[70px] h-[70px] lg:w-[85px] lg:h-[85px] rounded-full" />
                    <SkeletonBox className="w-14 h-3" />
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Hot Picks */}
            <div className="w-full">
              <div className="flex justify-center mb-6 lg:mb-8">
                <SkeletonBox className="w-56 h-6" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-xl lg:rounded-[1.25rem] border border-gray-100 overflow-hidden"
                  >
                    <SkeletonBox className="w-full h-28 sm:h-36 rounded-none" />

                    <div className="p-2.5 sm:p-4">
                      <SkeletonBox className="w-24 h-3 mb-2" />
                      <SkeletonBox className="w-full h-3 mb-2" />
                      <SkeletonBox className="w-3/4 h-3 mb-4" />

                      <div className="flex items-center justify-between">
                        <SkeletonBox className="w-16 h-4" />
                        <SkeletonBox className="w-6 h-6 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:-mt-[80px] relative z-20">
            
            {/* Combo Meals */}
            <SkeletonBox className="w-full h-64 rounded-2xl" />

            {/* Exclusive Offers */}
            <div className="hidden lg:block">
              <SkeletonBox className="w-full h-40 rounded-2xl" />
            </div>

            {/* Why Choose Us */}
            <div className="hidden lg:block">
              <SkeletonBox className="w-full h-48 rounded-2xl" />
            </div>

            {/* About Us */}
            <SkeletonBox className="w-full h-48 rounded-2xl" />
          </div>
        </div>

        {/* Reservation */}
        <div className="w-full mt-12 lg:mt-16 hidden lg:block">
          <SkeletonBox className="w-full h-32 rounded-2xl" />
        </div>

        {/* Best Sellers */}
        <div className="w-full mt-16 lg:mt-24">
          <div className="flex justify-center mb-8">
            <SkeletonBox className="w-48 h-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden"
              >
                <SkeletonBox className="w-full h-28 sm:h-36 rounded-none" />

                <div className="p-2.5 sm:p-4">
                  <SkeletonBox className="w-20 h-3 mb-2" />
                  <SkeletonBox className="w-full h-3 mb-2" />
                  <SkeletonBox className="w-3/4 h-3 mb-4" />

                  <div className="flex justify-between">
                    <SkeletonBox className="w-16 h-4" />
                    <SkeletonBox className="w-7 h-7 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Reservation */}
        <div className="w-full mt-4 block lg:hidden">
          <SkeletonBox className="w-full h-32 rounded-2xl" />
        </div>

        {/* Combo Offers */}
        <div className="w-full mt-16">
          <div className="flex justify-center mb-8">
            <SkeletonBox className="w-48 h-6" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 overflow-hidden"
              >
                <SkeletonBox className="w-full h-32 sm:h-40 rounded-none" />

                <div className="p-3 sm:p-4">
                  <SkeletonBox className="w-24 h-3 mb-2" />
                  <SkeletonBox className="w-full h-3 mb-2" />
                  <SkeletonBox className="w-3/4 h-3 mb-4" />
                  <SkeletonBox className="w-16 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Why Choose Us */}
        <div className="w-full mt-6 block lg:hidden">
          <SkeletonBox className="w-full h-48 rounded-2xl" />
        </div>

        {/* Static sections */}
        <div className="mt-12">
          <SkeletonBox className="w-full h-32 rounded-2xl mb-6" />
          <SkeletonBox className="w-full h-48 rounded-2xl mb-6" />
          <SkeletonBox className="w-full h-48 rounded-2xl" />
        </div>
      </section>
    </div>
  );
}