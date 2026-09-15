import React from 'react';

export default function MenuSkeleton() {
  return (
    <div className="w-full flex flex-col min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <section className="relative w-full bg-[var(--brand-green-dark)] py-10 lg:py-14 border-b border-[var(--brand-gold)]/20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="flex flex-col justify-center max-w-lg lg:pl-12 py-2 gap-3">
              <div className="h-2.5 w-20 bg-white/20 rounded-full" />
              <div className="h-8 w-64 max-w-full bg-white/20 rounded-md" />
              <div className="h-8 w-48 max-w-full bg-white/10 rounded-md" />
              <div className="h-3 w-full max-w-sm bg-white/10 rounded-full mt-2" />
              <div className="h-3 w-3/4 max-w-sm bg-white/10 rounded-full" />
              <div className="h-11 w-full max-w-sm bg-white/20 rounded-full mt-4" />
            </div>
            <div className="w-full h-[160px] sm:h-[200px] lg:h-[240px] bg-white/10 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Filters skeleton */}
      <div className="sticky top-[64px] lg:top-[72px] z-30 bg-[var(--brand-cream-soft)] border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-8 w-20 shrink-0 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="h-9 w-36 shrink-0 bg-gray-200 rounded-sm" />
          </div>
          <div className="h-2.5 w-40 bg-gray-200 rounded-full mt-3" />
        </div>
      </div>

      {/* Grid skeleton — same card shape as MenuItemCard */}
      <section className="w-full bg-[var(--brand-cream-soft)] py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100"
              >
                <div className="w-full aspect-[4/3] bg-gray-200" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-2 w-16 bg-gray-200 rounded-full" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                  <div className="h-3 w-full bg-gray-100 rounded-full" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
                  <div className="flex items-center justify-between mt-2">
                    <div className="h-4 w-12 bg-gray-200 rounded-md" />
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
