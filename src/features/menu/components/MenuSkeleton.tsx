"use client";

import React from "react";

const MenuSkeleton = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FCF8F0]">
      {/* FILTER SKELETON */}
      <section className="w-full bg-[#FCF8F0]">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6 lg:px-8">
          <div className="rounded-[20px] border border-gray-100 bg-white px-3 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.06)] sm:px-4 sm:py-4">
            
            {/* DIET FILTERS */}
            <div className="mb-3 flex items-center gap-2 overflow-hidden sm:justify-center sm:gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-9 w-[72px] shrink-0 animate-pulse rounded-full bg-gray-200"
                />
              ))}
            </div>

            <div className="mb-3 h-px w-full bg-gray-100" />

            {/* CATEGORY FILTERS */}
            <div className="flex items-center gap-2 overflow-hidden sm:justify-center sm:gap-3">
              {[1, 2, 3, 4, 5, 6, 7].map(
                (item) => (
                  <div
                    key={item}
                    className="flex h-[68px] w-[70px] shrink-0 animate-pulse flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 sm:h-[74px] sm:w-[76px]"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200" />

                    <div className="h-2 w-10 rounded-full bg-gray-200" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="w-full bg-[#FCF8F0] py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {Array.from({ length: 10 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
                >
                  {/* IMAGE */}
                  <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />

                  {/* CONTENT */}
                  <div className="p-3 sm:p-4">
                    {/* CATEGORY */}
                    <div className="mb-2 h-2 w-16 animate-pulse rounded-full bg-gray-200" />

                    {/* TITLE */}
                    <div className="space-y-2">
                      <div className="h-3 w-4/5 animate-pulse rounded-full bg-gray-200" />
                      <div className="h-3 w-3/5 animate-pulse rounded-full bg-gray-200" />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full animate-pulse rounded-full bg-gray-100" />
                      <div className="h-2 w-4/5 animate-pulse rounded-full bg-gray-100" />
                    </div>

                    {/* PRICE */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-4 w-14 animate-pulse rounded-full bg-gray-200" />
                      <div className="h-3 w-10 animate-pulse rounded-full bg-gray-100" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION SKELETON */}
      <section className="w-full bg-[#FCF8F0] px-4 pb-10 sm:px-6 lg:px-10">
        <div className="mx-auto h-[180px] w-full max-w-[1400px] animate-pulse rounded-[24px] bg-gray-200 sm:h-[220px]" />
      </section>
    </div>
  );
};

export default MenuSkeleton;