import React from 'react';

export default function AboutHero() {
  return (
    <section className="relative w-full bg-[var(--brand-green-dark)] empire-geometric-bg py-2 lg:py-0 overflow-hidden border-b border-[var(--brand-gold)]/20">
      
      {/* Left Side Floating Decoration Image */}
      <div className="absolute top-2 left-4 sm:left-25 h-full w-[120px] sm:w-[150px] lg:w-[200px] z-0 pointer-events-none opacity-90 rotate-12">
        <img 
          src="/ourstoryleft.png" 
          alt="Decoration" 
          className="w-full h-full object-contain object-left drop-shadow-sm"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 relative z-10">
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

          {/* 📸 Right Side: Local Image (Updated to aboutbanner.png) */}
          {/* 🌟 ലാൻഡ്സ്കേപ്പ് ഇമേജ് ആയതുകൊണ്ട് ഹൈറ്റ് ചെറുതായി അഡ്ജസ്റ്റ് ചെയ്തു */}
          <div className="relative w-full h-[150px] sm:h-[180px] lg:h-[220px] -right-10 sm:-right-50 mt-2 lg:mt-0 flex justify-end">
            
            {/* ഇമേജ് ഫുൾ വിഡ്ത്തിൽ വെച്ചു */}
            <img 
              src="/aboutbanner.png" 
              alt="About Banner" 
              className="w-full  object-cover object-center lg:object-right opacity-90"
            />
            
            {/* 🌟 മാജിക്: ഇമേജിന്റെ സൈഡുകൾ ബാക്ക്ഗ്രൗണ്ടുമായി (Dark Green) സ്മൂത്ത് ആയി ബ്ലെൻഡ് ചെയ്യാൻ ഒരു ഫേഡ് എഫക്റ്റ്! */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-green-dark)]/70 via-[var(--brand-green-dark)]/0 to-transparent"></div>
          </div>

        </div>
      </div>
    </section>
  );
}