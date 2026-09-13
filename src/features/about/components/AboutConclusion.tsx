import React from 'react';

export default function AboutClosing() {
  return (
    <section className="relative w-full bg-[var(--brand-cream-soft)] py-12 lg:py-12 overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND DECORATIONS (Section background) */}

      <div className="w-full max-w-[900px] lg:max-w-[1000px] mx-auto px-4 lg:px-6 relative z-10">
        
        {/* 🌟 MAIN CARD CONTAINER */}
        {/* കാർഡിനുള്ളിൽ relative ഉം overflow-hidden ഉം കൊടുത്തിട്ടുണ്ട്, അപ്പൊ ഇല പുറത്തേക്ക് പോകില്ല */}
        <div className="relative bg-[var(--brand-cream-soft)] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 sm:p-10 lg:p-14 text-center border border-[var(--brand-gold)]/10 overflow-hidden">
          
          {/* 🌟 INSIDE CARD DECORATION (leaf3.png) 🌟 */}
          <img 
            src="/leaf2.png" 
            alt="Card Leaf Decoration" 
            className="absolute top-80 lg:top-68  right-0 lg:right-2 w-[100px] sm:w-[150px] lg:w-[280px] opacity-40 pointer-events-none object-contain translate-x-4 -translate-y-4"
          />

          <img 
            src="/leaf3.png" 
            alt="Card Leaf Decoration" 
            className="absolute top-80 lg:top-0  left-0 lg:-left-15 w-[100px] sm:w-[150px] lg:w-[220px] opacity-50 pointer-events-none object-contain translate-x-4 -translate-y-4"
          />

          <span className="relative z-10 text-[8px] sm:text-[9px] font-black text-[var(--brand-green-dark)] uppercase tracking-[0.25em] block mb-2">
            The Final Destination
          </span>

          <h2 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-gray-900 mb-6">
            Where the Journey Leads
          </h2>

          {/* Keywords with Arrows */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[7px] sm:text-[8px] lg:text-[9px] font-bold text-[var(--brand-green-dark)] uppercase tracking-[0.2em] mb-8 bg-white/60 py-2.5 px-5 rounded-full inline-flex border border-[var(--brand-gold)]/20 shadow-sm">
            <span>Business</span>
            <span className="text-[var(--brand-gold)] opacity-70">→</span>
            <span>Hospitality</span>
            <span className="text-[var(--brand-gold)] opacity-70">→</span>
            <span>People</span>
            <span className="text-[var(--brand-gold)] opacity-70">→</span>
            <span>Innovation</span>
            <span className="text-[var(--brand-gold)] opacity-70">→</span>
            <span>Legacy</span>
          </div>

          {/* Quote Section */}
          <div className="relative z-10 border-t border-b border-[var(--brand-gold)]/30 py-6 lg:py-8 max-w-lg mx-auto mb-8">
            <p className="text-lg sm:text-xl lg:text-[18px] font-serif italic text-gray-700 leading-relaxed mb-4">
              "Building today with the values of yesterday, and the vision of tomorrow."
            </p>
            <span className="text-[8px] sm:text-[9px] font-black text-[var(--brand-green-dark)] uppercase tracking-[0.25em]">
              — EMPIREPLAZA
            </span>
          </div>

          {/* Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4">
            <button className="w-full sm:w-auto px-6 py-3 bg-[var(--brand-green-dark)] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded-sm shadow-md">
              Explore Our Dining Concepts
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-[var(--brand-green-dark)] border border-gray-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors rounded-sm shadow-sm">
              Reserve A Table
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}