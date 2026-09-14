"use client";

import React from "react";

const SkeletonBox = ({ className }: { className: string }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
};

const AddressSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
      {/* Address List Skeleton */}
      <section className="min-w-0 lg:col-span-1 space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADBCA]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0 w-full">
                <SkeletonBox className="w-12 h-12 rounded-2xl shrink-0" />

                <div className="space-y-2 min-w-0 flex-1">
                  <SkeletonBox className="w-24 h-4" />
                  <SkeletonBox className="w-full max-w-md h-4" />
                  <SkeletonBox className="w-3/4 max-w-sm h-3" />
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-20 shrink-0">
                <SkeletonBox className="w-8 h-8 rounded-full" />
                <SkeletonBox className="w-6 h-6 rounded-full" />
              </div>
            </div>
          </div>
        ))}

        <SkeletonBox className="w-full h-[58px] rounded-2xl" />
      </section>

      {/* Summary Skeleton */}
      <aside className="min-w-0">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADBCA]">
          <SkeletonBox className="w-40 h-5 mb-6" />

          <div className="space-y-4">
            <SkeletonBox className="w-28 h-3" />
            <SkeletonBox className="w-full h-4" />
            <SkeletonBox className="w-3/4 h-4" />
          </div>

          <SkeletonBox className="w-full h-12 rounded-xl mt-6" />
        </div>
      </aside>
    </div>
  );
};

export default AddressSkeleton;