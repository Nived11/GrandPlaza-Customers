import React from 'react';
import { Heart, Plus } from 'lucide-react';

const hotPicks = [
  { id: 1, name: "Hyderabadi Chicken Biryani", desc: "Fragrant basmati rice cooked with spices & tender chicken.", price: "249", img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop" },
  { id: 2, name: "Grilled Peri Peri Chicken", desc: "Juicy grilled chicken with peri peri spices.", price: "199", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 3, name: "Cheesy Chicken Burger", desc: "Loaded with grilled chicken, cheese & our special sauce.", price: "159", img: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=400&h=300&fit=crop" },
  { id: 4, name: "Chocolate Lava Cake", desc: "Warm chocolate cake with molten lava inside.", price: "129", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
  // 🟢 താഴെയുള്ള 4 എണ്ണം പുതിയതായി ചേർത്തതാണ് (2nd Row കിട്ടാൻ വേണ്ടി)
  { id: 5, name: "Paneer Butter Masala", desc: "Rich and creamy curry made with paneer, spices, and butter.", price: "189", img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=400&h=300&fit=crop" },
  { id: 6, name: "Mutton Rogan Josh", desc: "Classic tender mutton curry with aromatic spices.", price: "349", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
  { id: 7, name: "Tandoori Chicken", desc: "Roasted chicken marinated in yogurt and generously spiced.", price: "229", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
  { id: 8, name: "Mango Lassi", desc: "Refreshing yogurt-based drink with sweet mango pulp.", price: "89", img: "https://images.unsplash.com/photo-1626082895617-2c6ad366795f?w=400&h=300&fit=crop" },
];

export default function HotPicksSection() {
  return (
    <div className="w-full">
      
      {/* 📝 Header Section (Removed View All & Arrows) */}
      <div className="mb-6">
        <h2 className="text-lg lg:text-xl font-black text-slate-800 uppercase tracking-tight">
          Today's <span className="text-[var(--brand-gold)] font-serif">Hot Picks</span>
        </h2>
      </div>

      {/* 🍔 Cards Grid (8 Items will automatically form 2 rows of 4 on Large Screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {hotPicks.map((item) => (
          <div key={item.id} className="bg-white rounded-[1.25rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full">
            <div className="relative h-36 w-full overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-2 left-2 bg-[#d97706] text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">Hot</span>
              <button className="absolute top-2 right-2 p-1.5 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                <Heart size={14} />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-grow bg-white">
              <h3 className="text-[12px] font-black text-slate-900 leading-tight mb-1.5 line-clamp-1">{item.name}</h3>
              <p className="text-[9px] font-medium text-gray-500 leading-relaxed mb-4 line-clamp-2">{item.desc}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[15px] font-black text-[var(--brand-gold)]">₹{item.price}</span>
                <button className="w-6 h-6 rounded-full bg-[var(--brand-gold)] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}