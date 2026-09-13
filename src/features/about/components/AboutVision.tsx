import React from 'react';
import { Users, UtensilsCrossed, Target } from 'lucide-react';

export default function AboutVision() {
  return (
    <section className="relative w-full bg-[#FCFBFA] py-16 lg:py-24 overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* =====================================
            🌟 HEADER SECTION
        ====================================== */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 sm:w-10 h-px bg-[var(--brand-gold)]/60"></div>
            <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em]">
              Our Journey
            </span>
            <div className="w-6 sm:w-10 h-px bg-[var(--brand-gold)]/60"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-black text-[var(--brand-green-dark)] mb-4 leading-tight">
            Built on People, Flavours & Possibilities
          </h2>
          
          <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium max-w-2xl mx-auto">
            From our roots to our vision — every step is about people, experiences, and a brighter tomorrow.
          </p>
        </div>

        {/* =====================================
            🌟 3-COLUMN CARDS GRID
        ====================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6 lg:gap-8">
          
          {/* 🟢 CARD 1: TODAY / TEAM */}
          <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center">
            
            {/* Top Overlapping Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-[var(--brand-gold)]/20 p-1.5">
              <div className="w-full h-full rounded-full bg-[#EAEFEA] flex items-center justify-center text-[var(--brand-green-dark)]">
                <Users size={22} strokeWidth={2.5} />
              </div>
            </div>
            
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[var(--brand-gold)] mt-5 mb-3">
              Today
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-[var(--brand-green-dark)] mb-4 leading-snug">
              A Growing Family
            </h3>
            <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed font-medium mb-8">
              Today, with a team of 220+ professionals, the journey continues. We believe a successful business is not simply about financial performance; it is about developing people and creating opportunities.
            </p>
            <p className="text-[8px] sm:text-[9px] font-bold text-[var(--brand-gold)] uppercase tracking-[0.15em] mt-auto">
              Building people, businesses,<br className="hidden lg:block"/> and opportunities.
            </p>
          </div>

          {/* 🟢 CARD 2: HOSPITALITY */}
          <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center">
            
            {/* Top Overlapping Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-[var(--brand-gold)]/20 p-1.5">
              <div className="w-full h-full rounded-full bg-[#EAEFEA] flex items-center justify-center text-[var(--brand-green-dark)]">
                <UtensilsCrossed size={22} strokeWidth={2.5} />
              </div>
            </div>
            
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[var(--brand-gold)] mt-5 mb-3">
              Hospitality
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-[var(--brand-green-dark)] mb-4 leading-snug">
              Local Roots to <br className="hidden lg:block"/> Global Experiences
            </h3>
            <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed font-medium mb-8">
              Hospitality remains at the heart of our vision. We aspire to take authentic flavours across the world, creating memorable dining experiences inspired by diverse cuisines and cultures.
            </p>
            <p className="text-[8px] sm:text-[9px] font-bold text-[var(--brand-gold)] uppercase tracking-[0.15em] mt-auto">
              Authentic flavours, <br className="hidden lg:block"/> Meaningful experiences.
            </p>
          </div>

          {/* 🟢 CARD 3: LEGACY */}
          <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center">
            
            {/* Top Overlapping Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-[var(--brand-gold)]/20 p-1.5">
              <div className="w-full h-full rounded-full bg-[#EAEFEA] flex items-center justify-center text-[var(--brand-green-dark)]">
                <Target size={22} strokeWidth={2.5} />
              </div>
            </div>
            
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[var(--brand-gold)] mt-5 mb-3">
              The Vision
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-[var(--brand-green-dark)] mb-4 leading-snug">
              Building a Lasting <br className="hidden lg:block"/> Legacy
            </h3>
            <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed font-medium mb-8">
              The vision goes beyond business. It is about creating ventures that represent quality, authenticity, and long-term value, while empowering talent and contributing positively to society.
            </p>
            <p className="text-[8px] sm:text-[9px] font-bold text-[var(--brand-gold)] uppercase tracking-[0.15em] mt-auto">
              Creating meaning for <br className="hidden lg:block"/> generations to come.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}