import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--brand-cream-soft)] animate-pulse">
      {/* Header skeleton */}
      <section className="relative w-full bg-[var(--brand-green-dark)] overflow-hidden border-b border-[var(--brand-gold)]/20">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 pt-8 pb-6 lg:pt-12 lg:pb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/15 shrink-0" />
              <div className="flex flex-col gap-2.5">
                <div className="h-2.5 w-20 rounded-full bg-white/15" />
                <div className="h-5 w-36 sm:w-44 rounded-full bg-white/20" />
                <div className="h-2.5 w-28 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="h-9 w-20 sm:w-24 rounded-lg bg-white/10 shrink-0" />
          </div>

          <div className="mt-6 lg:mt-8 flex items-center gap-2 bg-white/10 rounded-full p-1.5 w-full sm:w-fit">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 flex-1 sm:flex-none sm:w-28 rounded-full bg-white/10"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-2.5">
              <div className="h-2.5 w-24 rounded-full bg-gray-100" />
              <div className="h-6 w-44 sm:w-52 rounded-full bg-gray-200" />
            </div>
            <div className="h-9 w-16 sm:w-20 rounded-lg bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 ${i === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="h-2.5 w-24 rounded-full bg-gray-100" />
                <div className="h-11 w-full rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
