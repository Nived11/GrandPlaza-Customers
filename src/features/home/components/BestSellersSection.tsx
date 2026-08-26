import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';

const bestSellers = [
  { 
    id: 1, 
    name: "Traditional Chicken Pothichoru", 
    category: "NAADAN POTHICHORU",
    desc: "Banana leaf wrapped Matta rice with chicken fry, omelette, chammanthi, thoran and moru.", 
    price: "155", 
    originalPrice: "180",
    discount: "14% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop" 
  },
  { 
    id: 2, 
    name: "Spicy Chicken Alfaham", 
    category: "ARABIAN",
    desc: "Juicy grilled chicken marinated in authentic Arabian spices. Served with mint chutney.", 
    price: "249", 
    originalPrice: "299",
    discount: "16% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop" 
  },
  { 
    id: 3, 
    name: "Paneer Butter Masala", 
    category: "NORTH INDIAN",
    desc: "Rich and creamy curry made with paneer, spices, and a generous amount of butter.", 
    price: "189", 
    originalPrice: "220",
    discount: "14% OFF",
    type: "VEG",
    img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=400&h=300&fit=crop" 
  },
  { 
    id: 4, 
    name: "Beef Roast Naadan", 
    category: "KERALA SPECIAL",
    desc: "Slow-roasted beef with coconut slices and strong Kerala spices.", 
    price: "199", 
    originalPrice: "240",
    discount: "17% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" 
  },
  { 
    id: 5, 
    name: "Mango Smoothie", 
    category: "BEVERAGES",
    desc: "Thick and refreshing mango smoothie made with fresh Alphonso mangoes.", 
    price: "119", 
    originalPrice: "149",
    discount: "20% OFF",
    type: "VEG",
    img: "https://images.unsplash.com/photo-1626082895617-2c6ad366795f?w=400&h=300&fit=crop" 
  },
  { 
    id: 6, 
    name: "Veg Hakka Noodles", 
    category: "CHINESE",
    desc: "Stir-fried noodles with crunchy vegetables and mild soy sauce.", 
    price: "129", 
    originalPrice: "160",
    discount: "19% OFF",
    type: "VEG",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" 
  },
  { 
    id: 7, 
    name: "Mutton Biryani", 
    category: "BIRYANI",
    desc: "Fragrant basmati rice cooked with tender mutton pieces and special spices.", 
    price: "289", 
    originalPrice: "349",
    discount: "17% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=400&h=300&fit=crop" 
  },
  { 
    id: 8, 
    name: "Chicken Shawarma Plate", 
    category: "ARABIAN",
    desc: "Shredded chicken served with fries, pickles, khubz and garlic mayo.", 
    price: "179", 
    originalPrice: "200",
    discount: "10% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" 
  },
  { 
    id: 9, 
    name: "Ghee Roast Dosa", 
    category: "SOUTH INDIAN",
    desc: "Crispy dosa roasted in pure ghee, served with sambar and 3 types of chutney.", 
    price: "99", 
    originalPrice: "120",
    discount: "17% OFF",
    type: "VEG",
    img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=400&h=300&fit=crop" 
  },
  { 
    id: 10, 
    name: "Prawns Fry", 
    category: "SEAFOOD",
    desc: "Fresh tiger prawns marinated in spicy masala and shallow fried.", 
    price: "299", 
    originalPrice: "350",
    discount: "14% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1625944230945-1b7dd12ce240?w=400&h=300&fit=crop" 
  },
  { 
    id: 11, 
    name: "Sweet Falooda", 
    category: "DESSERTS",
    desc: "Rich layered dessert with vermicelli, sweet basil seeds, jelly, and ice cream.", 
    price: "159", 
    originalPrice: "190",
    discount: "16% OFF",
    type: "VEG",
    img: "https://images.unsplash.com/photo-1563805042-7684c8a9e1cb?w=400&h=300&fit=crop" 
  },
  { 
    id: 12, 
    name: "Butter Chicken", 
    category: "NORTH INDIAN",
    desc: "Tender chicken cooked in a smooth tomato and butter gravy.", 
    price: "249", 
    originalPrice: "299",
    discount: "16% OFF",
    type: "NON-VEG",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop" 
  }
];

export default function BestSellersSection() {
  return (
    <div className="w-full mt-16 lg:mt-24">
      
      {/* 📝 Header Section */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 z-10 bg-white px-4">
          <span className="text-[var(--brand-gold)] text-xs">✦</span>
          <h2 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest">
            Best Sellers
          </h2>
          <span className="text-[var(--brand-gold)] text-xs">✦</span>
        </div>
        
        <button className="absolute right-0 hidden md:flex items-center gap-1 border border-gray-200 text-gray-500 hover:text-[var(--brand-gold)] hover:border-[var(--brand-gold)] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          View All <ChevronRight size={14} />
        </button>
      </div>

      {/* 🍔 Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-5">
        {bestSellers.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:border-[var(--brand-gold)]/60 hover:shadow-lg transition-all group flex flex-col overflow-hidden h-full">
            
            {/* 📸 Image Wrapper */}
            <div className="relative w-full h-[150px] overflow-hidden bg-[var(--brand-cream-soft)]">
              
              {/* 🌟 THEME UPDATE: Discount Badge (Brand Gold & Dark Green) */}
              <div className="absolute top-3 left-3 bg-[var(--brand-gold)] text-[var(--brand-green-dark)] text-[9px] font-black uppercase px-2 py-1 rounded-md z-10 shadow-sm">
                {item.discount}
              </div>
              
              {/* Image */}
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* 🌟 THEME UPDATE: Category Badge (Dark Green & Gold) */}
              <div className="absolute bottom-2 left-2 bg-[var(--brand-green-dark)]/90 backdrop-blur-sm text-[var(--brand-gold)] text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-md z-10 shadow-sm border border-[var(--brand-gold)]/20">
                {item.category}
              </div>
            </div>
            
            {/* 📝 Content Details */}
            <div className="p-4 flex flex-col flex-grow bg-white">
              
              {/* Veg/Non-Veg Indicator (Standard colors kept for clarity) */}
              <div className="flex items-center gap-1.5 mb-2">
                <div className={`w-2 h-2 rounded-full ${item.type === 'NON-VEG' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className={`text-[8px] font-black tracking-widest ${item.type === 'NON-VEG' ? 'text-red-600' : 'text-green-600'}`}>
                  {item.type}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-[13px] font-black text-slate-900 leading-tight mb-1.5 line-clamp-1">
                {item.name}
              </h3>
              
              {/* Description */}
              <p className="text-[9px] lg:text-[10px] text-gray-500 line-clamp-2 leading-relaxed mb-4">
                {item.desc}
              </p>
              
              {/* Price & Add Button */}
              <div className="mt-auto flex items-end justify-between">
                <div className="flex flex-col">
                  {/* 🌟 THEME UPDATE: Price in Brand Dark Green */}
                  <span className="text-[16px] font-black text-[var(--brand-green-dark)] leading-none mb-0.5">₹{item.price}</span>
                  <span className="text-[11px] font-semibold text-gray-400 line-through">₹{item.originalPrice}</span>
                </div>
                
                {/* 🌟 THEME UPDATE: Add Button (Dark Green & Gold) */}
                <button className="w-8 h-8 rounded-full bg-[var(--brand-green-dark)] hover:bg-[#024532] text-[var(--brand-gold)] flex items-center justify-center shadow-md transition-colors active:scale-95 border border-[var(--brand-gold)]/30">
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
              
            </div>

          </div>
        ))}
      </div>
      
      {/* Mobile View All Button */}
      <div className="flex justify-center mt-6 md:hidden">
        <button className="flex items-center gap-1 border border-[var(--brand-gold)]/50 text-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-green-dark)] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          View All <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}