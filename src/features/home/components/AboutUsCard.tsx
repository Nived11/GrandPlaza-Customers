import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function AboutUsCard() {
  return (
    <div className="bg-[var(--brand-green-dark)] rounded-xl p-5 lg:p-7 relative overflow-hidden shadow-md border border-[var(--brand-gold)]/20 flex flex-col justify-center min-h-[150px] lg:min-h-[200px] mt-2 group">
      {/* 🌟 മൊബൈലിൽ min-h-[150px] ഉം പാഡിംഗ് p-5 ഉം ആക്കി */}
      
      {/* 📸 Background Image Overlay (Increased visibility) */}
      <div className="absolute inset-0 z-0 bg-[var(--brand-green-dark)]">
        <img 
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&fit=crop" 
          alt="Our Story" 
          /* 🌟 Opacity കൂട്ടി, ഗ്രേഡിയൻ്റ് കുറച്ചു */
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        {/* 🌟 ഗ്രേഡിയൻ്റ് നന്നായി കുറച്ചു, ഇപ്പോൾ ഇമേജ് ക്ലിയർ ആയി കാണാം */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-green-dark)]/80 via-[var(--brand-green-dark)]/20 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-start w-full sm:w-[80%]">
        <div className="flex items-center gap-1.5 lg:gap-2 mb-1.5 lg:mb-2">
          <BookOpen size={12} className="text-[var(--brand-gold)] lg:w-3.5 lg:h-3.5" />
          <h4 className="text-[var(--brand-gold)] text-[9px] lg:text-[10px] font-black uppercase tracking-widest">
            Our Story
          </h4>
        </div>
        
        <h3 className="text-white text-[16px] sm:text-[18px] lg:text-[22px] font-serif font-bold leading-tight mb-1.5 lg:mb-2 drop-shadow-md">
          A Legacy of <br/> Authentic Flavors
        </h3>
        
        <p className="text-gray-200 text-[8px] sm:text-[10px] lg:text-[11px] font-medium mb-3 sm:mb-4 lg:mb-5 line-clamp-2 pr-4 drop-shadow-md leading-relaxed">
          From a humble kitchen to the city's favorite dining destination. Discover the passion behind Empire Plaza.
        </p>
        
        <button className="flex items-center gap-1.5 lg:gap-2 border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-green-dark)] px-3.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg text-[8px] sm:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm bg-black/20 hover:bg-[var(--brand-gold)] backdrop-blur-sm">
          Read Our Story <ArrowRight size={12} className="lg:w-3.5 lg:h-3.5" />
        </button>
      </div>
      
    </div>
  );
}