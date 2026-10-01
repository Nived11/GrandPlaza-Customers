"use client";

import React from "react";

const CategorySkeleton = ({
  all = false,
}: {
  all?: boolean;
}) => {
  return (
    <div className="flex w-[72px] shrink-0 flex-col items-center sm:w-[78px] lg:w-[76px]">
      {/* CATEGORY IMAGE */}
      <div
        className={`h-[58px] w-[58px] animate-pulse rounded-[13px] border bg-gray-200 sm:h-[62px] sm:w-[62px] lg:h-[60px] lg:w-[60px] ${
          all ? "border-gray-300" : "border-gray-200"
        }`}
      />

      {/* CATEGORY NAME */}
      <div className="mt-2 h-2.5 w-12 animate-pulse rounded-full bg-gray-200 sm:w-14" />

      {/* UNDERLINE */}
      <div className="mt-2 h-[2px] w-[68px] rounded-full bg-gray-200 sm:w-[74px]" />
    </div>
  );
};

const DietSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
      {/* ALL */}
      <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-200 sm:h-[40px] sm:w-[120px] sm:flex-none" />

      {/* VEG */}
      <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-200 sm:h-[40px] sm:w-[100px] sm:flex-none" />

      {/* NON-VEG */}
      <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-200 sm:h-[40px] sm:w-[115px] sm:flex-none" />
    </div>
  );
};

const MenuCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
      {/* =====================================================
          IMAGE
      ===================================================== */}
      <div className="relative aspect-[4/3] w-full animate-pulse bg-gray-200">
        {/* Discount badge placeholder */}
        <div className="absolute left-2.5 top-2.5 h-5 w-14 animate-pulse rounded-full bg-gray-300 sm:left-3 sm:top-3 sm:h-6 sm:w-16" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="p-3 sm:p-4">
        {/* CATEGORY */}
        <div className="mb-1 h-2 w-16 animate-pulse rounded-full bg-gray-200 sm:w-20" />

        {/* NAME */}
        <div className="space-y-2">
          <div className="h-3.5 w-4/5 animate-pulse rounded-full bg-gray-200 sm:h-4" />
          <div className="h-3.5 w-3/5 animate-pulse rounded-full bg-gray-200 sm:h-4" />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-2 space-y-2">
          <div className="h-2.5 w-full animate-pulse rounded-full bg-gray-100 sm:h-3" />
          <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-gray-100 sm:h-3" />
        </div>

        {/* PRICE + ADD BUTTON */}
        <div className="mt-3 flex items-end justify-between gap-2">
          {/* PRICE */}
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 w-14 animate-pulse rounded-full bg-gray-200 sm:h-4 sm:w-16" />
            <div className="h-2.5 w-10 animate-pulse rounded-full bg-gray-100 sm:h-3 sm:w-12" />
          </div>

          {/* ADD BUTTON */}
          <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-gray-200 sm:h-8 sm:w-8" />
        </div>
      </div>
    </div>
  );
};

const MenuSkeleton = () => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FCF8F0]">
      {/* =====================================================
          MENU HEADER
      ===================================================== */}
      <section className="w-full bg-transparent">
        <div className="mx-auto w-full max-w-[1600px] px-4 pt-6 sm:px-6 sm:pt-7 lg:px-8 lg:pt-7">
          <div className="flex flex-col items-center text-center">
            {/* EYEBROW */}
            <div className="mb-1.5 flex items-center justify-center gap-3 sm:mb-2">
              <div className="h-px w-6 animate-pulse bg-gray-200 sm:w-8" />

              <div className="h-2.5 w-32 animate-pulse rounded-full bg-gray-200 sm:h-3 sm:w-36" />

              <div className="h-px w-6 animate-pulse bg-gray-200 sm:w-8" />
            </div>

            {/* TITLE */}
            <div className="h-8 w-64 animate-pulse rounded-md bg-gray-200 sm:h-9 sm:w-80 lg:h-10 lg:w-[360px]" />
          </div>
        </div>

        {/* ===================================================
            CATEGORY SCROLLER
        =================================================== */}
        <div className="mx-auto mt-5 w-full max-w-[1600px] px-4 sm:mt-6 sm:px-6 lg:mt-5 lg:px-8">
          <div className="relative w-full">
            <div className="flex w-full items-start gap-3 overflow-hidden pb-3 sm:gap-4 lg:gap-[14px]">
              {/* ALL ITEMS — FIXED */}
              <CategorySkeleton all />

              {/* SCROLLABLE CATEGORY ITEMS */}
              <div className="flex min-w-0 flex-1 items-start gap-3 overflow-hidden sm:gap-4 lg:gap-[14px]">
                {Array.from({ length: 7 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))}
              </div>
            </div>

            {/* RIGHT FADE */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-[#FCF8F0]/80 via-[#FCF8F0]/25 to-transparent sm:w-5"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-1 h-px w-full bg-[#E8EBE9]" />

        {/* ===================================================
            DIET FILTERS
        =================================================== */}
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <DietSkeleton />
        </div>
      </section>

      {/* =====================================================
          PRODUCT GRID
      ===================================================== */}
      <section className="w-full bg-[#FCF8F0] py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <MenuCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuSkeleton;