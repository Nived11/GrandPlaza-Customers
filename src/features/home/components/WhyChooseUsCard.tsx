import React from 'react';
import { Bike, ShieldCheck, Tag, Flame } from 'lucide-react';

export default function WhyChooseUsCard() {
  // 🌟 Icons changed to match the screenshot (Gold outline style)
  // Removed hardcoded size so we can control it via Tailwind classes for responsiveness
  const iconProps = { strokeWidth: 1.5, color: "var(--brand-gold)" };

  return (
    <div className="bg-[#fdfbf7] rounded-xl p-3 sm:p-6 shadow-sm border border-[var(--brand-gold)]/20">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        <span className="text-[var(--brand-gold)] text-[8px] sm:text-[10px]">✦</span>
        <h4 className="text-[10px] sm:text-[12px] font-black text-slate-800 uppercase tracking-widest text-center">
          Why Choose <span className="text-[var(--brand-gold)] font-serif">Empire Plaza?</span>
        </h4>
        <span className="text-[var(--brand-gold)] text-[8px] sm:text-[10px]">✦</span>
      </div>
      
      {/* 🌟 Changed to grid-cols-4 for all screen sizes with subtle dividers everywhere */}
      <div className="grid grid-cols-4 divide-x divide-[var(--brand-gold)]/20">
        
        <div className="flex flex-col items-center text-center px-0.5 sm:px-1">
          <div className="mb-1 sm:mb-2.5">
            <Bike className="w-5 h-5 sm:w-7 sm:h-7" {...iconProps} />
          </div>
          <h5 className="text-[6.5px] sm:text-[9px] font-black uppercase text-slate-800 leading-tight">Super Fast</h5>
          <p className="text-[4.5px] sm:text-[7px] font-bold text-gray-500 uppercase mt-0.5 sm:mt-1 tracking-wider sm:tracking-widest leading-tight">Delivery in 30 mins</p>
        </div>
        
        <div className="flex flex-col items-center text-center px-0.5 sm:px-1">
          <div className="mb-1 sm:mb-2.5">
            <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7" {...iconProps} />
          </div>
          <h5 className="text-[6.5px] sm:text-[9px] font-black uppercase text-slate-800 leading-tight">Safe & Hygienic</h5>
          <p className="text-[4.5px] sm:text-[7px] font-bold text-gray-500 uppercase mt-0.5 sm:mt-1 tracking-wider sm:tracking-widest leading-tight">100% Quality Assured</p>
        </div>
        
        <div className="flex flex-col items-center text-center px-0.5 sm:px-1">
          <div className="mb-1 sm:mb-2.5">
            <Tag className="w-5 h-5 sm:w-7 sm:h-7" {...iconProps} />
          </div>
          <h5 className="text-[6.5px] sm:text-[9px] font-black uppercase text-slate-800 leading-tight">Best Offers</h5>
          <p className="text-[4.5px] sm:text-[7px] font-bold text-gray-500 uppercase mt-0.5 sm:mt-1 tracking-wider sm:tracking-widest leading-tight">Save more every day</p>
        </div>
        
        <div className="flex flex-col items-center text-center px-0.5 sm:px-1">
          <div className="mb-1 sm:mb-2.5">
            <Flame className="w-5 h-5 sm:w-7 sm:h-7" {...iconProps} />
          </div>
          <h5 className="text-[6.5px] sm:text-[9px] font-black uppercase text-slate-800 leading-tight">Fresh & Hot</h5>
          <p className="text-[4.5px] sm:text-[7px] font-bold text-gray-500 uppercase mt-0.5 sm:mt-1 tracking-wider sm:tracking-widest leading-tight">Cooked to perfection</p>
        </div>

      </div>
    </div>
  );
}