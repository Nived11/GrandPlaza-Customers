import React from 'react';

export default function AboutHero() {
  return (
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg py-2 lg:py-0 overflow-hidden border-b border-[var(--brand-gold)]/20">
      
      {/* Left Side Floating Decoration Image */}
      <div className="hidden sm:block absolute top-2 left-2 sm:left-25 h-full w-[80px] sm:w-[150px] lg:w-[200px] z-0 pointer-events-none opacity-90 rotate-12">
        <img 
          src="/ourstoryleft.png" 
          alt="Decoration" 
          className="w-full h-full object-contain object-left drop-shadow-sm"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-6 lg:items-center">
          
          {/* 📝 Left Side: Text Content */}
          <div className="flex flex-col justify-center w-full pr-8 sm:pr-0 sm:max-w-md lg:max-w-lg lg:pl-12 py-3 lg:py-6 relative z-10">
            
            <div className="flex flex-col items-start gap-1 mb-1 lg:mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.2em]">
                  About Us
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-black text-white leading-[1.2] mb-1 lg:mb-3">
              Our Story
            </h1>

            {/* Divider */}
            <div className="w-8 h-px bg-[var(--brand-gold)]/40 mb-2 lg:mb-3"></div>
    
            {/* Description */}
            <p className="text-[12px] lg:text-[15px] text-[#F4F1EA]/90 leading-relaxed font-medium">
              A journey built on family values, hospitality,<br className="block sm:hidden" /> and creating lasting experiences.
            </p>
          </div>

          {/* 📸 Right Side: Local Image (Updated to aboutbanner.png) */}
          {/* Adjusted height slightly for the landscape image */ }
          <div className="absolute -top-4 -right-4 w-[220px] h-[130px] sm:relative sm:w-full sm:h-[180px] lg:h-[220px] lg:w-[80%] sm:-right-50 lg:-right-70 mt-0 flex justify-end z-0">
            
            <img 
              src="/aboutbanner.png" 
              alt="About Banner" 
              className="w-full h-full object-cover object-center lg:object-right opacity-90"
            />
            
            {/* Smooth gradient fade effect to blend image edges with the dark green background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green-dark)]/90 via-[var(--brand-green-dark)]/10 to-transparent sm:from-[var(--brand-green-dark)]/70 sm:via-[var(--brand-green-dark)]/0 sm:to-transparent"></div>
          </div>

        </div>
      </div>
    </section>
  );
}