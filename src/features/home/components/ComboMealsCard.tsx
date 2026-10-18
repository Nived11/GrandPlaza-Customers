"use client";

import React from 'react';

export default function ComboMealsCard() {
  const scrollToCombos = () => {
    const element = document.getElementById("combo-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      onClick={scrollToCombos}
      className="bg-[var(--brand-green-dark)] rounded-xl p-5 lg:p-8 relative overflow-hidden shadow-lg border border-[var(--brand-gold)]/20 min-h-[150px] lg:min-h-[220px] flex flex-col justify-center w-full cursor-pointer hover:border-[var(--brand-gold)]/40 transition-all duration-300 group"
    >
      {/* 📝 Text Content */}
      <div className="relative z-10 w-[55%] lg:w-[60%]">
        <h4 className="text-[var(--brand-gold)] text-[11px] lg:text-[15px] font-serif font-black uppercase tracking-wide mb-1.5 lg:mb-2">
          Combo Meals
        </h4>
        <h3 className="text-white text-[15px] lg:text-[20px] font-bold leading-tight mb-3 lg:mb-5">
          Great Food.<br/>Better Together.
        </h3>
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            scrollToCombos();
          }}
          className="border border-[var(--brand-gold)] text-[var(--brand-gold)] group-hover:bg-[var(--brand-gold)] group-hover:text-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-green-dark)] px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-lg text-[8px] lg:text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
        >
          Explore Combos
        </button>
      </div>
      
      {/* 📸 Local Transparent PNG Image Section */}
      <div className="absolute right-[25px] lg:right-[-0px] top-[50%] lg:top-[60%] -translate-y-1/2 w-[45%] lg:w-[50%] h-[75%] lg:h-[55%] flex items-center lg:items-end justify-end pointer-events-none">
        <img 
          src="/combo.png" 
          alt="Combo Meal" 
          className="w-full h-full object-contain scale-[0.85] sm:scale-100 lg:scale-[1.15] origin-right drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-[0.9] sm:group-hover:scale-105 lg:group-hover:scale-[1.2] transition-transform duration-500" 
        />
      </div>
    </div>
  );
}