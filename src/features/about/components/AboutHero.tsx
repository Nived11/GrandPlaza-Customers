import React from 'react';

export default function AboutHero() {
  return (
    // 🌟 1. ഇവിടെ py-6 lg:py-8 മാറ്റി py-4 lg:py-5 ആക്കി 
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg py-2 lg:py-0 overflow-hidden border-b border-[var(--brand-gold)]/20">
      
      {/* 🌟 Left Side Floating Decoration Image */}
      <div className="absolute top-0 left-12 h-full w-[120px] sm:w-[150px] lg:w-[300px] z-0 pointer-events-none opacity-90">
        <img 
          src="/ourstoryleft.png" 
          alt="Decoration" 
          className="w-full h-full object-contain object-left drop-shadow-sm"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* 📝 Left Side: Text Content */}
          <div className="flex flex-col justify-center max-w-lg lg:pl-12">
            
            <div className="flex flex-col items-start gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.2em]">
                  About Us
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-black text-white leading-tight mb-3 lg:mb-4">
              Our Story
            </h1>

            {/* Divider */}
            <div className="w-12 h-px bg-[var(--brand-gold)]/40 mb-3 lg:mb-4"></div>
    
            {/* Description */}
            <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-[#F4F1EA]/90 leading-relaxed font-medium">
              A journey built on family values, entrepreneurship, hospitality and a passion for creating lasting experiences.
            </p>
          </div>

          {/* 📸 Right Side: Local Image */}
          {/* 🌟 2. ഇവിടെ ഇമേജിന്റെ ഹൈറ്റ് കുറച്ച് h-[160px] sm:h-[200px] lg:h-[250px] ആക്കി */}
          <div className="relative w-full h-[160px] sm:h-[200px] lg:h-[250px] mt-4 lg:mt-0 flex justify-center lg:justify-end">
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