import React from 'react';

export default function ExclusiveOffersCard() {
  return (
    <div className="bg-[#fcf5e3] rounded-xl p-5 lg:p-8 relative overflow-hidden shadow-sm border border-[var(--brand-gold)]/20 min-h-[150px] lg:min-h-[220px] flex flex-col justify-center w-full">
      {/* 🌟 മൊബൈലിൽ min-h-[150px] ഉം പാഡിംഗ് p-5 ഉം ആക്കി */}
      
      {/* 📝 Text Content */}
      <div className="relative z-10 w-[55%] lg:w-[60%]">
        <h4 className="text-[var(--brand-gold)] text-[11px] lg:text-[14px] font-black uppercase tracking-widest mb-1 lg:mb-1.5">
          Exclusive Offers
        </h4>
        <h3 className="text-slate-800 text-[18px] lg:text-[28px] font-serif font-bold leading-tight mb-1 lg:mb-2">
          Up to 40% OFF
        </h3>
        <p className="text-slate-600 text-[9px] lg:text-[13px] font-medium mb-3 lg:mb-5">
          On selected items
        </p>
        <button className="border border-[var(--brand-gold)] text-slate-800 hover:bg-[var(--brand-gold)] hover:text-white px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-lg text-[8px] lg:text-[10px] font-bold uppercase tracking-widest transition-colors">
          View Offers
        </button>
      </div>

      {/* 🎁 Transparent PNG Image Section */}
      {/* 🌟 മൊബൈലിൽ ഇമേജ് കണ്ടെയ്നറിന്റെ വലിപ്പവും പൊസിഷനും അഡ്ജസ്റ്റ് ചെയ്തു */}
      <div className="absolute right-[10px] lg:right-[0px] top-1/2 -translate-y-1/2 w-[50%] lg:w-[50%] h-[100%] lg:h-[100%] flex items-center justify-end pointer-events-none">
        {/* 
          🚨 ശ്രദ്ധിക്കുക: നിന്റെ public ഫോൾഡറിൽ ആ ഗിഫ്റ്റ് ബോക്സ് ഇമേജിന് 'giftbox.png' 
          എന്ന് പേര് കൊടുത്തിട്ടുണ്ടെന്ന് ഉറപ്പുവരുത്തുക! 
        */}
        <img 
          src="/giftbox.png" 
          alt="Gift Box" 
          className="w-full h-full object-contain scale-[0.85] sm:scale-100 lg:scale-100 drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]" 
        />
      </div>

    </div>
  );
}