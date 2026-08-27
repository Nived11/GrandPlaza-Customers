import React from 'react';
import { Plus } from 'lucide-react';

// 🌟 Added discount and category to the data
const hotPicks = [
  { id: 1, category: "BIRYANI", discount: "20% OFF", name: "Hyderabadi Chicken Biryani", desc: "Fragrant basmati rice cooked with spices & tender chicken.", price: "249", img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop" },
  { id: 2, category: "CHICKEN", discount: "15% OFF", name: "Grilled Peri Peri Chicken", desc: "Juicy grilled chicken with peri peri spices.", price: "199", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=300&fit=crop" },
  { id: 3, category: "BURGERS", discount: "10% OFF", name: "Cheesy Chicken Burger", desc: "Loaded with grilled chicken, cheese & our special sauce.", price: "159", img: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=400&h=300&fit=crop" },
  { id: 4, category: "DESSERTS", discount: "5% OFF", name: "Chocolate Lava Cake", desc: "Warm chocolate cake with molten lava inside.", price: "129", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop" },
  { id: 5, category: "INDIAN", discount: "15% OFF", name: "Paneer Butter Masala", desc: "Rich and creamy curry made with paneer, spices, and butter.", price: "189", img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=400&h=300&fit=crop" },
  { id: 6, category: "MUTTON", discount: "25% OFF", name: "Mutton Rogan Josh", desc: "Classic tender mutton curry with aromatic spices.", price: "349", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" },
  { id: 7, category: "TANDOORI", discount: "10% OFF", name: "Tandoori Chicken", desc: "Roasted chicken marinated in yogurt and generously spiced.", price: "229", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop" },
  { id: 8, category: "BEVERAGES", discount: "10% OFF", name: "Mango Lassi", desc: "Refreshing yogurt-based drink with sweet mango pulp.", price: "89", img: "https://images.unsplash.com/photo-1626082895617-2c6ad366795f?w=400&h=300&fit=crop" },
];

export default function HotPicksSection() {
  return (
    <div className="w-full">
      
      {/* 📝 Header Section - Matched with previous section style */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 lg:mb-8 px-4 mt-4">
        <span className="text-[var(--brand-gold)] opacity-70 text-xs md:text-sm">✦✧</span>
                <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">

          Today's <span className="text-[var(--brand-gold)] font-serif">Hot Picks</span>
        </h2>
        <span className="text-[var(--brand-gold)] opacity-70 text-xs md:text-sm">✧✦</span>
      </div>

      {/* 🍔 Cards Grid (grid-cols-2 for Mobile to show 2 items per row) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5  lg:px-0">
        {hotPicks.map((item) => (
          <div key={item.id} className="bg-white rounded-xl lg:rounded-[1.25rem] border border-gray-100 shadow-[0_4px_15px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full">
            
            {/* Image Container */}
            <div className="relative h-28 sm:h-36 w-full overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
              {/* 🌟 Discount Badge (Top Left) */}
              <span className="absolute top-2 left-2 bg-[#dc2626] text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm">
                {item.discount}
              </span>

              {/* 🌟 Category Badge (Bottom Left) */}
              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                {item.category}
              </span>
            </div>

            {/* Card Content - Sizes adjusted for 2-column mobile layout */}
            <div className="p-2.5 sm:p-4 flex flex-col flex-grow bg-white">
              <h3 className="text-[10px] sm:text-[12px] font-black text-slate-900 leading-tight mb-1 sm:mb-1.5 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-[8px] sm:text-[9px] font-medium text-gray-500 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                {item.desc}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[12px] sm:text-[15px] font-black text-[var(--brand-gold)]">
                  ₹{item.price}
                </span>
                <button className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-all">
                  <Plus size={12} strokeWidth={3} className="sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}