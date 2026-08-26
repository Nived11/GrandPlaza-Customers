import React from 'react';
import { ChevronRight } from 'lucide-react';

const categories = [
  { name: "BIRYANI", img: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=200&h=200&fit=crop" },
  { name: "BURGERS", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop" },
  { name: "PIZZA", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop" },
  { name: "INDIAN", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop" },
  { name: "CHINESE", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop" },
  { name: "DESSERTS", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop" },
  { name: "BEVERAGES", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=200&h=200&fit=crop" },
];

export default function CravingSection() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="text-[var(--brand-gold)] opacity-70">✦✧</span>
        <h2 className="text-lg lg:text-xl font-black text-slate-800 uppercase tracking-widest">
          What are you <span className="text-[var(--brand-gold)] font-serif">Craving?</span>
        </h2>
        <span className="text-[var(--brand-gold)] opacity-70">✧✦</span>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto no-scrollbar pb-4 justify-start sm:justify-center">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 cursor-pointer group min-w-[70px] lg:min-w-[85px]">
            <div className="w-[70px] h-[70px] lg:w-[85px] lg:h-[85px] rounded-full p-1 bg-white border border-gray-200 shadow-sm group-hover:border-[var(--brand-gold)] group-hover:shadow-md transition-all">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-[9px] lg:text-[10px] font-black text-slate-700 uppercase tracking-widest group-hover:text-[var(--brand-green-dark)]">{cat.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center gap-3 cursor-pointer group min-w-[70px] lg:min-w-[85px] h-[70px] lg:h-[85px]">
           <button className="w-full h-full rounded-full border border-gray-300 flex items-center justify-center text-[9px] font-black uppercase text-slate-600 group-hover:border-[var(--brand-gold)] group-hover:text-[var(--brand-gold)] transition-all bg-white">
             View All <ChevronRight size={12} className="ml-0.5" />
           </button>
        </div>
      </div>
    </div>
  );
}