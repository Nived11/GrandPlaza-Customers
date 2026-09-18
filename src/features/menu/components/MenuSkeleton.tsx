import React from "react";

export default function MenuSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#FBF7EE] animate-pulse">
      <div className="max-w-[1340px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[420px]">
          <div className="space-y-4">
            <div className="w-32 h-4 bg-[#E8DEC8] rounded-full" />
            <div className="w-3/4 h-12 bg-[#E8DEC8] rounded-xl" />
            <div className="w-1/2 h-12 bg-[#E8DEC8] rounded-xl" />
            <div className="w-full max-w-sm h-10 bg-[#E8DEC8] rounded-full mt-4" />
          </div>
          <div className="w-full h-80 bg-[#E8DEC8] rounded-[60px]" />
        </div>

        <div className="mt-10 bg-white/70 h-24 rounded-[28px]" />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[20px] overflow-hidden p-3 border border-stone-200">
              <div className="aspect-[4/3] bg-stone-200 rounded-xl mb-3" />
              <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-stone-100 rounded w-full mb-4" />
              <div className="flex justify-between items-center">
                <div className="h-4 bg-stone-200 rounded w-1/4" />
                <div className="w-8 h-8 bg-stone-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}