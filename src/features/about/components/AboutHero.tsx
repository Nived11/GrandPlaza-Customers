import React from 'react';

export default function AboutHero() {
  return (
    // 🌟 padding പൂർണ്ണമായും കുറച്ചു 
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg py-2 lg:py-0 overflow-hidden border-b border-[var(--brand-gold)]/20">
      
      {/* Left Side Floating Decoration Image */}
      <div className="absolute top-2 left-26 h-full w-[120px] sm:w-[150px] lg:w-[200px] z-0 pointer-events-none opacity-90 rotate-15">
        <img 
          src="/ourstoryleft.png" 
          alt="Decoration" 
          className="w-full h-full object-contain object-left drop-shadow-sm"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
        {/* 🌟 1. ഗ്യാപ്പ് കുറച്ചു (gap-10 മാറ്റി gap-4 ആക്കി) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          
          {/* 📝 Left Side: Text Content */}
          <div className="flex flex-col justify-center max-w-lg lg:pl-12 py-4 lg:py-6">
            
            <div className="flex flex-col items-start gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.2em]">
                  About Us
                </span>
              </div>
            </div>

            {/* 🌟 2. Margin (mb) എല്ലാം കുറച്ചു */}
            <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-serif font-black text-white leading-tight mb-2 lg:mb-3">
              Our Story
            </h1>

            {/* Divider */}
            <div className="w-10 h-px bg-[var(--brand-gold)]/40 mb-2 lg:mb-3"></div>
    
            {/* Description */}
            <p className="text-[12px] sm:text-[13px] text-[#F4F1EA]/90 leading-relaxed font-medium">
              A journey built on family values, entrepreneurship, hospitality and a passion for creating lasting experiences.
            </p>
          </div>

          {/* 📸 Right Side: Local Image */}
          {/* 🌟 3. ഇമേജിന്റെ ഹൈറ്റ് നന്നായി കുറച്ചു: h-[120px] sm:h-[150px] lg:h-[180px] */}
          <div className="relative w-full h-[120px] sm:h-[150px] lg:h-[180px] mt-2 -right-50 lg:mt-0 flex justify-center lg:justify-end">
            <img 
              src="/ourstory.png" 
              alt="Our Story" 
              className="w-full h-full object-contain drop-shadow-2xl "
            />
          </div>

        </div>
      </div>
    </section>
  );
}