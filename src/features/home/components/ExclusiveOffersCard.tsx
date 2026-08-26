import React from 'react';

export default function ExclusiveOffersCard() {
  return (
    <div className="bg-[#fcf5e3] rounded-xl p-6 lg:p-8 relative overflow-hidden shadow-sm border border-[var(--brand-gold)]/20 min-h-[220px] flex flex-col justify-center w-full">
      
      {/* 📝 Text Content */}
      <div className="relative z-10 w-[60%]">
        <h4 className="text-[var(--brand-gold)] text-[12px] lg:text-[14px] font-black uppercase tracking-widest mb-1.5">
          Exclusive Offers
        </h4>
        <h3 className="text-slate-800 text-[22px] lg:text-[28px] font-serif font-bold leading-tight mb-2">
          Up to 40% OFF
        </h3>
        <p className="text-slate-600 text-[11px] lg:text-[13px] font-medium mb-5">
          On selected items
        </p>
        <button className="border border-[var(--brand-gold)] text-slate-800 hover:bg-[var(--brand-gold)] hover:text-white px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
          View Offers
        </button>
      </div>

      {/* 🎁 Transparent PNG Image Section */}
      <div className="absolute right-[0px] top-1/2 -translate-y-1/2 w-[50%] h-[100%] pointer-events-none">
        {/* 
          🚨 ശ്രദ്ധിക്കുക: നിന്റെ public ഫോൾഡറിൽ ആ ഗിഫ്റ്റ് ബോക്സ് ഇമേജിന് 'giftbox.png' 
          എന്ന് പേര് കൊടുത്തിട്ടുണ്ടെന്ന് ഉറപ്പുവരുത്തുക! 
        */}
        <img 
          src="/giftbox.png" 
          alt="Gift Box" 
          className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]" 
        />
      </div>

    </div>
  );
}