import React from 'react';
import { Calendar, Star, Gift } from 'lucide-react';

export default function ReservationCard() {
  return (
    <div className="relative w-full bg-[var(--brand-green-dark)] border border-[var(--brand-gold)]/40 rounded-xl overflow-hidden flex flex-col shadow-xl">

      {/* 📸 BACKGROUND IMAGE - Right Side */}
      <div className="absolute right-0 top-0 w-full md:w-[65%] h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Restaurant Ambience" 
        />
        {/* Gradient to blend the image smoothly into the dark green background on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green-dark)] via-[var(--brand-green-dark)]/80 to-transparent"></div>
      </div>

      {/* 📝 TOP CONTENT (Text & Button) */}
      <div className="relative z-10 flex-grow p-6 lg:p-10 w-full md:w-[60%] flex flex-col justify-center items-start">
        <h3 className="text-white text-2xl lg:text-[32px] font-serif font-black leading-tight">
          Reserve Your Table
        </h3>
        <h4 className="text-[var(--brand-gold)] text-lg lg:text-[22px] font-bold mt-1.5">
          For a Memorable Experience
        </h4>
        <p className="text-gray-300 text-xs lg:text-sm mt-3 mb-6 font-medium">
          Celebrate special moments with your loved ones.
        </p>
        <button className="bg-[var(--brand-gold)] hover:bg-white text-[var(--brand-green-dark)] px-6 py-2.5 rounded-lg font-black uppercase text-[10px] lg:text-xs tracking-widest transition-colors shadow-md">
          Reserve Now
        </button>
      </div>

      {/* ✨ BOTTOM FEATURE STRIP */}
      <div className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/5 px-6 py-4 lg:px-10 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 lg:gap-8">
        
        {/* Feature 1 */}
        <div className="flex items-center gap-3">
          <div className="text-[var(--brand-gold)] bg-black/50 p-2 lg:p-2.5 rounded-xl border border-[var(--brand-gold)]/20">
            <Calendar size={22} strokeWidth={2} />
          </div>
          <div>
            <h5 className="text-white text-[11px] lg:text-xs font-bold uppercase tracking-wide">Easy Booking</h5>
            <p className="text-gray-400 text-[9px] lg:text-[10px] mt-0.5">Hassle-free reservation</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-3">
          <div className="text-[var(--brand-gold)] bg-black/50 p-2 lg:p-2.5 rounded-xl border border-[var(--brand-gold)]/20">
            <Star size={22} strokeWidth={2} />
          </div>
          <div>
            <h5 className="text-white text-[11px] lg:text-xs font-bold uppercase tracking-wide">Best Ambience</h5>
            <p className="text-gray-400 text-[9px] lg:text-[10px] mt-0.5">Premium dining area</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-3">
          <div className="text-[var(--brand-gold)] bg-black/50 p-2 lg:p-2.5 rounded-xl border border-[var(--brand-gold)]/20">
            <Gift size={22} strokeWidth={2} />
          </div>
          <div>
            <h5 className="text-white text-[11px] lg:text-xs font-bold uppercase tracking-wide">Special Occasions</h5>
            <p className="text-gray-400 text-[9px] lg:text-[10px] mt-0.5">Birthdays, Anniversaries & More</p>
          </div>
        </div>

      </div>

    </div>
  );
}