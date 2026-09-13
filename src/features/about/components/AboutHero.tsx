import React from 'react';
import { Leaf } from 'lucide-react';

export default function AboutHero() {
  return (
    // 🌟 py-16, py-24 ഒക്കെ മാറ്റി ചെറിയ പാഡിങ് (py-10 lg:py-12) ആക്കി
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg py-10 lg:py-12 overflow-hidden border-b border-[var(--brand-gold)]/20">
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* 📝 Left Side: Text Content */}
          <div className="flex flex-col justify-center max-w-lg">
            
            {/* Icon & Subtitle */}
            <div className="flex flex-col items-start gap-3 mb-3">
              <Leaf strokeWidth={1} className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--brand-gold)] opacity-80" />
              <div className="flex items-center gap-3">
                <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.2em]">
                  About Us
                </span>
              </div>
            </div>

            {/* Main Title - 🌟 Font size കുറച്ച് ഒതുക്കി */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif font-black text-white leading-tight mb-4 lg:mb-5">
              Our Story
            </h1>

            {/* Divider */}
            <div className="w-12 h-px bg-[var(--brand-gold)]/40 mb-4 lg:mb-5"></div>

            {/* Description */}
            <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#F4F1EA]/90 leading-relaxed font-medium">
              A journey built on family values, entrepreneurship, hospitality and a passion for creating lasting experiences.
            </p>
          </div>

          {/* 📸 Right Side: Curved Image */}
          {/* 🌟 Fixed & smaller height (lg:h-[360px]) കൊടുത്തു */}
          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] mt-6 lg:mt-0">
            <div className="absolute inset-0 rounded-tl-[80px] rounded-bl-[80px] lg:rounded-tl-[160px] lg:rounded-bl-[160px] overflow-hidden border-l-[3px] border-t-[3px] border-b-[3px] border-[var(--brand-gold)]/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
                alt="Empire Plaza Restaurant Interior" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-[var(--brand-green-dark)]/10 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}