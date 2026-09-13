import React from 'react';

export default function AboutFounder() {
  return (
    <section className="relative w-full bg-[var(--brand-cream-soft)] py-10 lg:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* 🌟 ഗ്യാപ്പ് കുറച്ചുകൂടി കൂട്ടി നല്ല സ്പേസ് കിട്ടാൻ (gap-10 lg:gap-16) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* 📸 LEFT SIDE: FOUNDER IMAGE */}
          <div className="flex justify-center lg:justify-start">
            {/* 🌟 മാജിക് ഇവിടെയാണ്: aspect-square കൊടുത്തു, അപ്പൊ കൃത്യം 1:1 ആകും */}
            <div className="relative w-full max-w-[400px] lg:max-w-[400px] aspect-square ">
              <img 
                src="./Founder.png" 
                alt="Founder" 
                className="w-full h-full object-contain"
              />
              {/* <div className="absolute inset-0 border border-[var(--brand-gold)]/20 rounded-2xl pointer-events-none"></div> */}
            </div>
          </div>

          {/* 📝 RIGHT SIDE: TEXT CONTENT */}
          {/* 🌟 max-w-lg എടുത്തുകളഞ്ഞു, പകരം w-full കൊടുത്തു. ഇനി നടുവിലേക്ക് ഒതുങ്ങില്ല! */}
          <div className="flex flex-col justify-center w-full">
            
            <div className="flex flex-col items-start gap-2 mb-4">
              <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em]">
                The Founder
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-black text-[var(--brand-green-dark)] leading-[1.2]">
                Driven by Vision & Values
              </h2>
            </div>

            <div className="w-12 h-px bg-[var(--brand-gold)]/50 mb-5"></div>

            <div className="space-y-4 text-[13px] sm:text-[14px] text-gray-600 leading-relaxed font-medium">
              
              <p>
                While our history spans decades, the core of our success lies in the values passed down through generations. Inspired by the dedication, discipline, and patience of my father—a hardworking farmer—I learned that true success comes from consistency and the willingness to keep moving forward, regardless of challenges.
              </p>

              <p>
                Today, my approach goes beyond financial performance. Inspired by visionary leaders like Ajit Doval and Dr. A.P.J. Abdul Kalam, our focus is on building strong teams, developing people, and contributing positively to society.
              </p>

              <p>
                Every venture we create is an expression of this vision: authentic experiences, thoughtful service, and a legacy created together. Outside of business, driving remains a personal passion—a time to explore, reflect, and recharge for the journey ahead.
              </p>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-serif font-black text-[var(--brand-green-dark)]">
                [Founder Name]
              </h3>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[var(--brand-gold)] mt-1.5 leading-relaxed">
                Managing Director, Empire Plaza <br/>
                Founder & MD, HUYS Global Ventures
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}