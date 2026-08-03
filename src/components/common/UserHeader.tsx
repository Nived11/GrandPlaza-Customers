"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  User, MapPin, ChevronDown, ShoppingBag, ShoppingCart, HelpCircle, Package, CalendarDays, ConciergeBell, Search, X
} from "lucide-react";
// Imported beautiful Remix Icons for all Nav Links
import { 
  RiChatSmile3Line, RiChatSmile3Fill, 
  RiUserStarLine, RiUserStarFill,
  RiHome5Line, RiHome5Fill,
  RiRestaurantLine, RiRestaurantFill
} from "react-icons/ri";

export default function UserHeader() {
  const pathname = usePathname();
  
  // State for Expandable Search Bar
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile Navigation Links
  const mobileNavLinks = [
    { name: "Home", path: "/", icon: RiHome5Line, activeIcon: RiHome5Fill, isLucide: false },
    { name: "Menu", path: "/menu", icon: RiRestaurantLine, activeIcon: RiRestaurantFill, isLucide: false },
    { name: "Reservations", path: "/bookings", icon: CalendarDays, activeIcon: CalendarDays, isLucide: true },
    { name: "Orders", path: "/orders", icon: Package, activeIcon: Package, isLucide: true },
    { name: "Profile", path: "/profile", icon: User, activeIcon: User, isLucide: true },
  ];

  // Desktop Navigation Links
  const desktopNavLinks = [
    { name: "Home", path: "/", icon: RiHome5Line, activeIcon: RiHome5Fill, isLucide: false },
    { name: "Menu", path: "/menu", icon: RiRestaurantLine, activeIcon: RiRestaurantFill, isLucide: false },
    { name: "About Us", path: "/about", icon: RiUserStarLine, activeIcon: RiUserStarFill, isLucide: false },
    { name: "Contact Us", path: "/contact", icon: RiChatSmile3Line, activeIcon: RiChatSmile3Fill, isLucide: false },
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

          {/* 🌟 CENTER LOGO CONTAINER */}
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
        <div className="bg-brand-green-light h-16 px-4 lg:px-8 flex items-center justify-between shadow-sm overflow-hidden">
          
          {/* Left spacing - Dynamically shrinks even more when search is open */}
          <div className={`transition-all duration-500 ease-in-out hidden md:block ${isSearchOpen ? 'w-1 lg:w-[2%]' : 'w-[10%] lg:w-1/4'}`} />

          {/* Centered Navigation Links with REDUCED SVG BADGE SIZE */}
          <nav className={`flex items-center gap-1 md:gap-2 xl:gap-4 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest justify-center transition-all duration-500 ${isSearchOpen ? 'flex-1' : 'w-2/4'}`}>
            {desktopNavLinks.map((item) => {
              const isActive = pathname === item.path;
              const Icon = isActive ? item.activeIcon : item.icon;
              
              const iconProps = item.isLucide ? { fill: isActive ? "currentColor" : "none" } : {};

              return (
                <Link 
                  key={item.path}
                  href={item.path}
                  // REDUCED PADDING HERE: px-3 py-1 for normal, xl:px-5 xl:py-1.5 for large screens
                  className={`relative isolate flex items-center gap-1 xl:gap-1.5 px-3 py-1 lg:px-4 lg:py-1.5 xl:px-5 xl:py-1.5 transition-all duration-300 ease-in-out whitespace-nowrap ${
                    isActive 
                      ? 'scale-105' 
                      : 'text-brand-green-dark  hover:scale-105 rounded-md'
                  }`}
                >
                  {/* The User-Requested SVG Background for Active State */}
                  {isActive && (
                    <svg 
                      className="absolute inset-0 w-full h-full text-brand-green-dark  drop-shadow-md -z-10" 
                      viewBox="0 0 100 40" 
                      fill="currentColor"
                      preserveAspectRatio="none"
                    >
                      <path d="M 15 0 L 85 0 Q 90 0 93 4.5 L 98.5 16.5 Q 100 20 98.5 23.5 L 93 35.5 Q 90 40 85 40 L 15 40 Q 10 40 7 35.5 L 1.5 23.5 Q 0 20 1.5 16.5 L 7 4.5 Q 10 0 15 0 Z" />
                    </svg>
                  )}

                  <Icon 
                    className={`relative z-10 w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? "text-brand-gold" : "text-brand-green-dark"}`} 
                    {...iconProps}
                  />
                  <span className={`relative z-10 ${isActive ? "text-brand-gold" : "text-brand-green-dark"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Icons (Search, Cart & Profile) */}
          <div className={`flex items-center justify-end gap-2 lg:gap-4 transition-all duration-500 ${isSearchOpen ? 'w-auto' : 'w-[25%] lg:w-1/4'}`}>
            
            {/* Expandable Search Bar */}
            <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden ${isSearchOpen ? 'w-48 lg:w-56 xl:w-72 bg-gray-100 border border-brand-green-dark/20 rounded-full px-3 py-1.5 lg:py-2' : 'w-9 lg:w-10'}`}>
              {isSearchOpen ? (
                <>
                  <Search size={16} className="text-brand-green-dark min-w-[16px]" />
                  <input 
                    type="text" 
                    placeholder="Search food..." 
                    className="bg-transparent border-none outline-none text-xs w-full px-2 text-brand-green-dark placeholder:text-brand-green-dark"
                    autoFocus
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="text-brand-green-dark hover:text-brand-green-dark transition">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="cursor-pointer  p-2 lg:p-2.5 rounded-full border border-gray-200 hover:border-[#D97706] transition text-gray-700 ml-auto">
                  <Search size={16} className="xl:w-[18px] xl:h-[18px]" />
                </button>
              )}
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 lg:p-2.5 rounded-full border border-gray-200 hover:border-[#D97706] transition text-gray-700 shrink-0">
              <ShoppingCart size={16} className="xl:w-[18px] xl:h-[18px]" />
              <span className="absolute -top-1 -right-1 bg-[#D97706] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Vertical Divider Line */}
            <div className="h-4 lg:h-5 w-[1px] bg-gray-300 mx-0.5 lg:mx-1 shrink-0" />
            
            {/* Profile Icon with Custom Green Background and Gold Border */}
            <Link href="/profile" className="p-2 lg:p-2.5 rounded-full bg-brand-green-dark empire-geometric-bg border-2 border-brand-gold hover:scale-105 transition text-brand-gold shrink-0">
              <User size={16} className="xl:w-[18px] xl:h-[18px]" />
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
          const Icon = isActive ? item.activeIcon : item.icon;
          const iconProps = item.isLucide ? { fill: isActive ? "currentColor" : "none" } : {};
          
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
                <Icon size={22} {...iconProps} />
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