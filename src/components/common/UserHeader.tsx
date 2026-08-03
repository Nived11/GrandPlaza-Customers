"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, UtensilsCrossed, Info, PhoneCall, 
  User, MapPin, ChevronDown, ShoppingBag, ShoppingCart, HelpCircle, Package, CalendarDays ,ConciergeBell
} from "lucide-react";

export default function UserHeader() {
  const pathname = usePathname();

  const mobileNavLinks = [
    { name: "Home", path: "/", icon: <Home size={22} /> },
    { name: "Menu", path: "/menu", icon: <UtensilsCrossed size={22} /> },
    { name: "Reservations", path: "/bookings", icon: <CalendarDays size={22} /> },
    { name: "Orders", path: "/orders", icon: <Package size={22} /> },
    { name: "Profile", path: "/profile", icon: <User size={22} /> },
  ];

  return (
    <>
      {/* 🖥️ DESKTOP HEADER */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50">
        
        {/* 1. TOP GREEN BAR */}
       <div className="bg-brand-green-dark empire-geometric-bg text-[#F4F1EA] h-12 px-8 flex items-center justify-between relative">
          
          {/* Left: Location Selector */}
          <div className="flex items-center gap-2 cursor-pointer">
            <MapPin size={20} className="text-[#D4AF37]" />
            <div className="flex flex-col justify-center">
              <span className="text-gray-300 text-[10px] leading-tight">Delivering to</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#D4AF37] text-xs">Malappuram, Kerala</span>
                <ChevronDown size={14} className="text-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* 🌟 CENTER LOGO CONTAINER WITH MATHEMATICALLY PERFECT STRAIGHT SLANTED LINES */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[1px] w-72 h-11 bg-brand-green-light flex items-center justify-center z-10"
            style={{
              clipPath: "path('M 0 44 L 20 44 Q 35 44 50 29 L 64 15 Q 79 0 94 0 L 194 0 Q 209 0 224 15 L 238 29 Q 253 44 268 44 L 288 44 Z')",
            }}
          >
            <Link href="/" className="relative w-32 h-30 flex items-center justify-center mt-1">
              <Image 
                src="/empireplaza.png" 
                alt="Empire Plaza Logo" 
                fill 
                className="object-contain p-1"
                priority
              />
            </Link>
          </div>

          {/* Right: Track Order & Help */}
          <div className="flex items-center gap-6 text-xs font-semibold">
           <Link href="/reserve-table" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition">
  <ConciergeBell size={16} className="text-[#D4AF37]" /> Book a Table
</Link>
            <div className="h-4 w-[1px] bg-[#D4AF37]/30" />
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition">
              <HelpCircle size={16} className="text-[#D4AF37]" /> Help
            </Link>
          </div>
        </div>

        {/* 2. BOTTOM WHITE BAR (Nav Links & Right Icons) */}
        <div className="bg-brand-green-light h-16 px-4 md:px-8 flex items-center justify-between shadow-sm">
          
          {/* Left spacing */}
          <div className="w-1/4" />

          {/* Centered Navigation Links (Updated with responsive gaps) */}
          <nav className="flex items-center gap-10 lg:gap-10 xl:gap-16 text-[10px] font-bold uppercase tracking-widest text-gray-600 w-2/4 justify-center">
            {/* Added whitespace-nowrap to prevent two-line wrapping */}
            <Link href="/" className={`flex items-center gap-1.5 transition pb-1 whitespace-nowrap ${pathname === '/' ? 'text-[#D97706] border-b-2 border-[#D97706]' : 'hover:text-[#D97706]'}`}>
              <Home size={16} className={pathname === '/' ? 'text-[#D97706]' : 'text-gray-900'} /> Home
            </Link>
            <Link href="/menu" className={`flex items-center gap-1.5 transition pb-1 whitespace-nowrap ${pathname === '/menu' ? 'text-[#D97706] border-b-2 border-[#D97706]' : 'hover:text-[#D97706]'}`}>
              <UtensilsCrossed size={16} className={pathname === '/menu' ? 'text-[#D97706]' : 'text-gray-900'} /> Menu
            </Link>
            <Link href="/about" className={`flex items-center gap-1.5 transition pb-1 whitespace-nowrap ${pathname === '/about' ? 'text-[#D97706] border-b-2 border-[#D97706]' : 'hover:text-[#D97706]'}`}>
              <Info size={16} className={pathname === '/about' ? 'text-[#D97706]' : 'text-gray-900'} /> About Us
            </Link>
            <Link href="/contact" className={`flex items-center gap-1.5 transition pb-1 whitespace-nowrap ${pathname === '/contact' ? 'text-[#D97706] border-b-2 border-[#D97706]' : 'hover:text-[#D97706]'}`}>
              <PhoneCall size={16} className={pathname === '/contact' ? 'text-[#D97706]' : 'text-gray-900'} /> Contact Us
            </Link>
          </nav>

          {/* Right Icons (Cart & Profile) */}
          <div className="flex items-center justify-end gap-4 w-1/4">
            <Link href="/cart" className="relative p-2.5 rounded-full border border-gray-200 hover:border-[#D97706] transition text-gray-700">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-[#D97706] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            
            <Link href="/profile" className="p-2.5 rounded-full border border-gray-200 hover:border-[#D97706] transition text-gray-700">
              <User size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* 📱 MOBILE TOP HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 h-16 px-4 flex items-center justify-between z-50 md:hidden shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/empireplaza.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="font-serif font-black text-sm tracking-widest text-[#072216]">EMPIRE PLAZA</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 rounded-full bg-gray-100 text-gray-700">
            <User size={18} />
          </Link>
        </div>
      </header>

      {/* 📱 MOBILE BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] py-2 px-3 z-50 md:hidden flex items-center justify-around">
        {mobileNavLinks.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                isActive 
                  ? "bg-[#FEF3C7] text-[#D97706] font-bold shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <div className={`${isActive ? "text-[#D97706]" : "text-gray-600"}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}