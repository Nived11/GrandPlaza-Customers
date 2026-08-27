import React from 'react';
import { Calendar, Star, Gift } from 'lucide-react';

export default function ReservationCard() {
  return (
    <div className="relative w-full bg-[var(--brand-green-dark)] border border-[var(--brand-gold)]/40 rounded-xl overflow-hidden flex flex-col shadow-xl">

      {/* 📸 BACKGROUND IMAGE */}
      <div className="absolute right-0 top-0 w-full h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Restaurant Ambience" 
        />
        {/* 🌟 THEME UPDATE: Mobile uses Bottom-to-Top gradient. Desktop uses Left-to-Right gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-green-dark)] via-[var(--brand-green-dark)]/80 to-[var(--brand-green-dark)]/40 md:bg-gradient-to-r md:from-[var(--brand-green-dark)] md:via-[var(--brand-green-dark)]/20 md:to-transparent"></div>
      </div>

      {/* 📝 TOP CONTENT (Text & Button) */}
      {/* 🌟 Height reduced in mobile by decreasing padding (p-3.5) and margins */}
      <div className="relative z-10 flex-grow p-3.5 sm:p-5 lg:p-10 w-full md:w-[60%] flex flex-col justify-center items-start">
        <h3 className="text-white text-lg sm:text-2xl lg:text-[32px] font-serif font-black leading-tight drop-shadow-md">
          Reserve Your Table
        </h3>
        <h4 className="text-[var(--brand-gold)] text-[11px] sm:text-sm lg:text-[22px] font-bold mt-0.5 lg:mt-1.5 drop-shadow-md">
          For a Memorable Experience
        </h4>
        <p className="text-gray-200 text-[9px] sm:text-xs lg:text-sm mt-1 sm:mt-2 mb-2.5 sm:mb-5 font-medium max-w-[220px] sm:max-w-[250px] md:max-w-none drop-shadow-md leading-relaxed">
          Celebrate special moments with your loved ones.
        </p>
        <button className="bg-[var(--brand-gold)] hover:bg-white text-[var(--brand-green-dark)] px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-md sm:rounded-lg font-black uppercase text-[8px] sm:text-[10px] lg:text-xs tracking-widest transition-colors shadow-md active:scale-95">
          Reserve Now
        </button>
      </div>

      {/* ✨ BOTTOM FEATURE STRIP */}
      {/* 🌟 3 items in 1 row on mobile */}
      <div className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/5 px-2 py-2 sm:px-4 md:px-6 md:py-4 lg:px-10 flex flex-row items-center justify-between gap-1 sm:gap-2 md:gap-4 lg:gap-8 overflow-hidden">

        {/* Feature 1 */}
        <div className="flex items-center gap-1.5 md:gap-3 w-[32%] md:w-auto">
          <div className="text-[var(--brand-gold)] bg-black/50 p-1.5 md:p-2 lg:p-2.5 rounded-lg md:rounded-xl border border-[var(--brand-gold)]/20 shrink-0">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[22px] lg:h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h5 className="text-white text-[7px] sm:text-[8px] md:text-[11px] lg:text-xs font-bold uppercase tracking-wide truncate">Easy Booking</h5>
            <p className="text-gray-400 text-[5px] sm:text-[6px] md:text-[9px] lg:text-[10px] mt-0.5 truncate">Hassle-free reservation</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-1.5 md:gap-3 w-[32%] md:w-auto">
          <div className="text-[var(--brand-gold)] bg-black/50 p-1.5 md:p-2 lg:p-2.5 rounded-lg md:rounded-xl border border-[var(--brand-gold)]/20 shrink-0">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[22px] lg:h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h5 className="text-white text-[7px] sm:text-[8px] md:text-[11px] lg:text-xs font-bold uppercase tracking-wide truncate">Best Ambience</h5>
            <p className="text-gray-400 text-[5px] sm:text-[6px] md:text-[9px] lg:text-[10px] mt-0.5 truncate">Premium dining area</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-1.5 md:gap-3 w-[32%] md:w-auto">
          <div className="text-[var(--brand-gold)] bg-black/50 p-1.5 md:p-2 lg:p-2.5 rounded-lg md:rounded-xl border border-[var(--brand-gold)]/20 shrink-0">
            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-[22px] lg:h-[22px]" strokeWidth={2} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h5 className="text-white text-[7px] sm:text-[8px] md:text-[11px] lg:text-xs font-bold uppercase tracking-wide truncate">Special Events</h5>
            <p className="text-gray-400 text-[5px] sm:text-[6px] md:text-[9px] lg:text-[10px] mt-0.5 truncate">Birthdays & Anniv.</p>
          </div>
        </div>

      </div>

    </div>
  );
}