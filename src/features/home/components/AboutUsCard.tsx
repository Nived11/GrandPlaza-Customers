import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function AboutUsCard() {
  return (
    <div className="bg-[var(--brand-green-dark)] rounded-xl p-6 lg:p-7 relative overflow-hidden shadow-md border border-[var(--brand-gold)]/20 flex flex-col justify-center min-h-[200px] mt-2 group">
      
      {/* 📸 Background Image Overlay (Increased visibility) */}
      <div className="absolute inset-0 z-0 bg-[var(--brand-green-dark)]">
        <img 
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&fit=crop" 
          alt="Our Story" 
          /* Changed opacity to 40 and removed mix-blend for better visibility */
          className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient fade reduced to let the image pop more, while keeping text readable at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-green-dark)] via-[var(--brand-green-dark)]/50 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={14} className="text-[var(--brand-gold)]" />
          <h4 className="text-[var(--brand-gold)] text-[10px] font-black uppercase tracking-widest">
            Our Story
          </h4>
        </div>
        
        <h3 className="text-white text-[18px] lg:text-[22px] font-serif font-bold leading-tight mb-2 drop-shadow-md">
          A Legacy of <br/> Authentic Flavors
        </h3>
        
        <p className="text-gray-200 text-[10px] lg:text-[11px] font-medium mb-5 line-clamp-2 pr-4 drop-shadow-md">
          From a humble kitchen to the city's favorite dining destination. Discover the passion behind Empire Plaza.
        </p>
        
        <button className="flex items-center gap-2 border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-green-dark)] px-4 py-2.5 rounded-lg text-[9px] lg:text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm bg-black/20 hover:bg-[var(--brand-gold)] backdrop-blur-sm">
          Read Our Story <ArrowRight size={14} />
        </button>
      </div>
      
    </div>
  );
}