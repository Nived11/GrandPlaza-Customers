import React from 'react';
import { ArrowRight, ChefHat } from 'lucide-react';

export default function CallToActionSection() {
  return (
    <div className="w-full mt-8 lg:mt-12 mb-10 relative overflow-hidden flex flex-col items-center justify-center py-8 lg:py-10">

      {/* 🎨 Watermark Icon (Only ChefHat, removed Sparkles) */}
      <div className="absolute right-4 lg:right-20 top-0 text-[var(--brand-gold)] opacity-[0.04] transform rotate-12 pointer-events-none">
        <ChefHat size={180} strokeWidth={1} />
      </div>

      {/* 📝 Typography Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-6">
        
        {/* Subtitle with small lines */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[var(--brand-gold)]/50 hidden sm:block"></span>
          <p className="text-[var(--brand-gold)] font-black tracking-[0.25em] uppercase text-[9px] md:text-[10px]">
            A Culinary Journey Awaits
          </p>
          <span className="w-8 h-[1px] bg-[var(--brand-gold)]/50 hidden sm:block"></span>
        </div>
        
        {/* Main Bold Heading */}
        <h2 className="text-[var(--brand-green-dark)] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-3 leading-[1.1]">
          Discover Our <br className="sm:hidden" />
          <span className="text-[var(--brand-gold)]">Full Menu</span>
        </h2>
        
        {/* Description */}
        <p className="text-gray-500 text-[10px] lg:text-[12px] font-medium mb-7 leading-relaxed max-w-lg">
          From traditional Kerala delicacies to exquisite Arabian flavors, explore over 100+ handcrafted dishes curated just for your cravings.
        </p>
        
        {/* CTA Button */}
        <button className="bg-[var(--brand-green-dark)] hover:bg-[#024532] text-[var(--brand-gold)] px-7 py-3 md:py-3.5 md:px-8 rounded-full font-black uppercase tracking-[0.15em] text-[9px] md:text-[10px] transition-all inline-flex items-center gap-2 shadow-[0_10px_30px_rgba(1,90,65,0.15)] hover:shadow-[0_10px_30px_rgba(1,90,65,0.25)] active:scale-95 border border-[var(--brand-gold)]/20">
          Explore Everything <ArrowRight size={14} className="text-[var(--brand-gold)]" />
        </button>
        
      </div>
      
    </div>
  );
}