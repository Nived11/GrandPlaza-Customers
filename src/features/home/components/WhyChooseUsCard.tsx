import React from 'react';
import { Bike, ShieldCheck, Tag, Flame } from 'lucide-react';

export default function WhyChooseUsCard() {
  // 🌟 Icons changed to match the screenshot (Gold outline style)
  const iconProps = { size: 28, strokeWidth: 1.5, color: "var(--brand-gold)" };

  return (
    <div className="bg-[#fdfbf7] rounded-xl p-6 shadow-sm border border-[var(--brand-gold)]/20">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-[var(--brand-gold)] text-[10px]">✦</span>
        <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">
          Why Choose <span className="text-[var(--brand-gold)] font-serif">Empire Plaza?</span>
        </h4>
        <span className="text-[var(--brand-gold)] text-[10px]">✦</span>
      </div>
      
      {/* 🌟 Changed to 4 columns in a single row with subtle dividers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 divide-x-0 md:divide-x divide-[var(--brand-gold)]/20">
        
        <div className="flex flex-col items-center text-center px-1">
          <div className="mb-2.5"><Bike {...iconProps} /></div>
          <h5 className="text-[9px] font-black uppercase text-slate-800">Super Fast</h5>
          <p className="text-[7px] font-bold text-gray-500 uppercase mt-0.5 tracking-widest">Delivery in 30 mins</p>
        </div>
        
        <div className="flex flex-col items-center text-center px-1">
          <div className="mb-2.5"><ShieldCheck {...iconProps} /></div>
          <h5 className="text-[9px] font-black uppercase text-slate-800">Safe & Hygienic</h5>
          <p className="text-[7px] font-bold text-gray-500 uppercase mt-0.5 tracking-widest">100% Quality Assured</p>
        </div>
        
        <div className="flex flex-col items-center text-center px-1">
          <div className="mb-2.5"><Tag {...iconProps} /></div>
          <h5 className="text-[9px] font-black uppercase text-slate-800">Best Offers</h5>
          <p className="text-[7px] font-bold text-gray-500 uppercase mt-0.5 tracking-widest">Save more every day</p>
        </div>
        
        <div className="flex flex-col items-center text-center px-1">
          <div className="mb-2.5"><Flame {...iconProps} /></div>
          <h5 className="text-[9px] font-black uppercase text-slate-800">Fresh & Hot</h5>
          <p className="text-[7px] font-bold text-gray-500 uppercase mt-0.5 tracking-widest">Cooked to perfection</p>
        </div>

      </div>
    </div>
  );
}