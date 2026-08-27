import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';

// 6 Combo Items Data
const comboOffers = [
  { 
    id: 1, 
    name: "Puttu & Kadala Curry", 
    desc: "Soft and fluffy steamed rice cake served with rich, spicy roasted coconut gravy of black chick...", 
    price: "89", 
    originalPrice: "110",
    save: "SAVE ₹21",
    img: "https://images.unsplash.com/photo-1604050228062-811c750b3f81?w=400&h=400&fit=crop" 
  },
  { 
    id: 2, 
    name: "Appam & Chicken Stew", 
    desc: "3 soft palappams served with mildly spiced chicken cooked in rich coconut milk gravy...", 
    price: "180", 
    originalPrice: "220",
    save: "SAVE ₹40",
    img: "https://images.unsplash.com/photo-1604908177525-455b91b9206f?w=400&h=400&fit=crop" 
  },
  { 
    id: 3, 
    name: "Ghee Rice & Beef Curry", 
    desc: "Aromatic Malabar ghee rice served with spicy, slow-cooked Kerala style beef curry...", 
    price: "199", 
    originalPrice: "229",
    save: "SAVE ₹30",
    img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=400&fit=crop" 
  },
  { 
    id: 4, 
    name: "Porotta & Chilli Chicken", 
    desc: "2 Flaky, layered Kerala porottas served with spicy and tangy Indo-Chinese chilli chicken...", 
    price: "150", 
    originalPrice: "175",
    save: "SAVE ₹25",
    img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop" 
  },
  { 
    id: 5, 
    name: "Meals & Fish Fry", 
    desc: "Traditional Kerala meals on a banana leaf served with fresh, crispy Ayala (Mackerel) fish fry...", 
    price: "160", 
    originalPrice: "195",
    save: "SAVE ₹35",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=400&fit=crop" 
  },
  { 
    id: 6, 
    name: "Alfaham & Kuboos", 
    desc: "Half portion of juicy Arabian grilled chicken served with 2 warm kuboos and garlic dip...", 
    price: "249", 
    originalPrice: "299",
    save: "SAVE ₹50",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop" 
  }
];

export default function ComboOffersSection() {
  return (
    <div className="w-full mt-16 lg:mt-24">
      
      {/* 📝 Header Section */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 z-10 bg-white px-4">
          <span className="text-[var(--brand-gold)] text-xs">✦</span>
          <h2 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest">
            Special Combos
          </h2>
          <span className="text-[var(--brand-gold)] text-xs">✦</span>
        </div>
        
        <button className="absolute right-0 hidden md:flex items-center gap-1 border border-gray-200 text-gray-500 hover:text-[var(--brand-gold)] hover:border-[var(--brand-gold)] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          View All <ChevronRight size={14} />
        </button>
      </div>

      {/* 🍔 Grid Section (3 Columns on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {comboOffers.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-[var(--brand-gold)]/20 shadow-sm hover:shadow-lg transition-all p-3 flex flex-row gap-4 h-full items-stretch">
            
            {/* 📸 Image Section (Left) */}
            <div className="relative w-[120px] lg:w-[130px] rounded-xl overflow-hidden bg-[var(--brand-cream-soft)] shrink-0">
              
              {/* SAVE Badge */}
              <div className="absolute top-2 left-2 bg-[var(--brand-gold)] text-[var(--brand-green-dark)] text-[9px] font-black uppercase px-2 py-0.5 rounded-md z-10 shadow-sm">
                {item.save}
              </div>
              
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* 📝 Details Section (Right) */}
            <div className="flex flex-col flex-grow py-1">
              
              <h3 className="text-[13px] font-black text-slate-900 leading-tight mb-1 uppercase tracking-tight line-clamp-2">
                {item.name}
              </h3>
              
              <p className="text-[9px] lg:text-[10px] text-gray-500 leading-snug line-clamp-2 mb-2">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[18px] font-black text-slate-900 leading-none">₹{item.price}</span>
                <span className="text-[12px] font-semibold text-gray-400 line-through">₹{item.originalPrice}</span>
              </div>
              
              {/* ORDER NOW Button */}
              <button className="w-full mt-auto bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white py-2.5 rounded-lg text-[10px] font-black flex items-center justify-center gap-1.5 uppercase tracking-widest transition-colors shadow-md active:scale-[0.98]">
                <Zap size={14} className="text-[var(--brand-gold)] fill-[var(--brand-gold)]" /> 
                Order Now
              </button>
              
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}