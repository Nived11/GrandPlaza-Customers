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
      
      {/* Banner */}
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse" />

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