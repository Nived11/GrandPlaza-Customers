import React from "react";
import { ArrowRight } from "lucide-react";

export default function MenuMoodSection() {
  return (
    <section className="w-full bg-[#faf7ef] px-4 pb-8 pt-2 sm:px-6 lg:px-8 lg:pb-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative min-h-[145px] overflow-hidden rounded-[22px] bg-[var(--brand-green-dark)] shadow-sm sm:min-h-[160px] lg:min-h-[170px]">
          <img
            src="/images/menu/footer.png"
            alt="Empire Plaza dining"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Content */}
          <div className="relative z-10 flex h-full min-h-[145px] items-center px-6 py-6 sm:min-h-[160px] sm:px-9 lg:min-h-[170px] lg:px-12">
            <div className="max-w-[440px]">
              <h2 className="font-serif text-[25px] font-black leading-[1.05] text-white sm:text-[30px] lg:text-[34px]">
                Good Food.
                <br />
                Better Together.
              </h2>

              <p className="mt-2 max-w-[360px] text-[9px] leading-relaxed text-white/85 sm:text-[10px]">
                Reserve your table for a memorable dining experience
                with your loved ones.
              </p>
            </div>

            <button
              type="button"
              className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-lg border border-[var(--brand-gold)] bg-[var(--brand-green-dark)]/70 px-7 py-3 text-[10px] font-bold text-[var(--brand-gold)] backdrop-blur-sm transition-all hover:bg-[var(--brand-gold)] hover:text-[var(--brand-green-dark)] sm:flex lg:bottom-1/2 lg:flex lg:translate-y-1/2"
            >
              Reserve a Table
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}