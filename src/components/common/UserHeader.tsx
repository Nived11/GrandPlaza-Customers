"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  User, MapPin, ChevronDown, ShoppingCart, HelpCircle, Package, CalendarDays, ConciergeBell, Search, X, ArrowRight
} from "lucide-react";
// Imported Remix Icons
import { 
  RiChatSmile3Line, RiChatSmile3Fill, 
  RiUserStarLine, RiUserStarFill,
  RiHome5Line, RiHome5Fill,
  RiRestaurantLine, RiRestaurantFill
} from "react-icons/ri";
import ReservationModal from "@/features/reservation/ReservationModal";

export default function UserHeader() {
  const pathname = usePathname();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // 🌟 NEW: SCROLL LOGIC FOR MOBILE SEARCH BAR
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect Scroll Direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return; // Only apply on mobile
      const currentScrollY = window.scrollY;
      
      // Hide search bar when scrolling down more than 50px
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Push main content (children) up smoothly when search bar hides
  useEffect(() => {
    const mainEl = document.querySelector("main");
    
    const handleResize = () => {
      if (window.innerWidth >= 768 && mainEl) {
        mainEl.style.transform = "translateY(0px)";
        setIsScrolled(false); // Reset on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    
    if (mainEl && window.innerWidth < 768) {
      mainEl.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      // Matches the height of the search box that hides
      mainEl.style.transform = isScrolled ? "translateY(-56px)" : "translateY(0px)";
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isScrolled]);

  // 📱 Mobile Navigation Links
  const mobileNavLinks = [
    { name: "Home", path: "/", icon: RiHome5Line, activeIcon: RiHome5Fill, isLucide: false },
    { name: "Menu", path: "/menu", icon: RiRestaurantLine, activeIcon: RiRestaurantFill, isLucide: false },
    { name: "About Us", path: "/about", icon: RiUserStarLine, activeIcon: RiUserStarFill, isLucide: false },
    { name: "Profile", path: "/profile", icon: User, activeIcon: User, isLucide: true },
  ];

  // 🖥️ Desktop Navigation Links
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
        <div className="bg-brand-green-dark empire-geometric-bg text-[#F4F1EA] h-12 px-8 flex items-center justify-between relative">
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

          <div 
            className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[1px] w-72 h-11 bg-brand-green-light flex items-center justify-center z-10"
            style={{
              clipPath: "path('M 0 44 L 20 44 Q 35 44 50 29 L 64 15 Q 79 0 94 0 L 194 0 Q 209 0 224 15 L 238 29 Q 253 44 268 44 L 288 44 Z')",
            }}
          >
            <Link href="/" className="relative w-32 h-30 flex items-center justify-center mt-1">
              <Image src="/empireplaza.png" alt="Empire Plaza Logo" fill className="object-contain p-1" priority />
            </Link>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            aria-haspopup="dialog"
            className="flex items-center gap-1.5 transition hover:text-[#D4AF37]"
          >
            <ConciergeBell size={16} className="text-[#D4AF37]" />
            Book a Table
          </button>
            <div className="h-4 w-[1px] bg-[#D4AF37]/30" />
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition">
              <HelpCircle size={16} className="text-[#D4AF37]" /> Help
            </Link>
          </div>
        </div>

        <div className="bg-brand-green-light h-16 px-4 lg:px-8 flex items-center justify-between shadow-sm overflow-hidden">
          <div className={`transition-all duration-500 ease-in-out hidden md:block ${isSearchOpen ? 'w-1 lg:w-[2%]' : 'w-[10%] lg:w-1/4'}`} />
          <nav className={`flex items-center gap-1 md:gap-2 xl:gap-4 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest justify-center transition-all duration-500 ${isSearchOpen ? 'flex-1' : 'w-2/4'}`}>
            {desktopNavLinks.map((item) => {
              const isActive = pathname === item.path;
              const Icon = isActive ? item.activeIcon : item.icon;
              const iconProps = item.isLucide ? { fill: isActive ? "currentColor" : "none" } : {};

              return (
                <Link 
                  key={item.path} href={item.path}
                  className={`relative isolate flex items-center gap-1 xl:gap-1.5 px-3 py-1 lg:px-4 lg:py-1.5 xl:px-5 xl:py-1.5 transition-all duration-300 ease-in-out whitespace-nowrap ${isActive ? 'scale-105' : 'text-brand-green-dark hover:scale-105 rounded-md'}`}
                >
                  {/* 🌟 REDUCED SHARPNESS FOR DESKTOP ACTIVE LINK */}
                  {isActive && (
                    <svg className="absolute inset-0 w-full h-full text-brand-green-dark drop-shadow-md -z-10" viewBox="0 0 100 40" fill="currentColor" preserveAspectRatio="none">
                      <path d="M 8 0 L 92 0 L 100 20 L 92 40 L 8 40 L 0 20 Z" />
                    </svg>
                  )}
                  <Icon className={`relative z-10 w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? "text-brand-gold" : "text-brand-green-dark"}`} {...iconProps} />
                  <span className={`relative z-10 ${isActive ? "text-brand-gold" : "text-brand-green-dark"}`}>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className={`flex items-center justify-end gap-2 lg:gap-4 transition-all duration-500 ${isSearchOpen ? 'w-auto' : 'w-[25%] lg:w-1/4'}`}>
            <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden ${isSearchOpen ? 'w-48 lg:w-56 xl:w-72 bg-gray-100 border border-brand-green-dark/20 rounded-full px-3 py-1.5 lg:py-2' : 'w-9 lg:w-10'}`}>
              {isSearchOpen ? (
                <>
                  <Search size={16} className="text-brand-green-dark min-w-[16px]" />
                  <input type="text" placeholder="Search food..." className="bg-transparent border-none outline-none text-xs w-full px-2 text-brand-green-dark placeholder:text-brand-green-dark" autoFocus />
                  <button onClick={() => setIsSearchOpen(false)} className="text-brand-green-dark transition"><X size={16} /></button>
                </>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="p-2 lg:p-2.5 rounded-full border border-gray-200 hover:border-[#D97706] transition text-gray-700 ml-auto">
                  <Search size={16} className="xl:w-[18px] xl:h-[18px]" />
                </button>
              )}
            </div>
            <Link href="/cart" className="relative p-2 lg:p-2.5 rounded-full border border-gray-200 hover:border-[#D97706] transition text-gray-700 shrink-0">
              <ShoppingCart size={16} className="xl:w-[18px] xl:h-[18px]" />
              <span className="absolute -top-1 -right-1 bg-[#D97706] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </Link>
            <div className="h-4 lg:h-5 w-[1px] bg-gray-300 mx-0.5 lg:mx-1 shrink-0" />
            <Link href="/profile" className="p-2 lg:p-2.5 rounded-full bg-brand-green-dark empire-geometric-bg border-2 border-brand-gold hover:scale-105 transition text-brand-gold shrink-0">
              <User size={16} className="xl:w-[18px] xl:h-[18px]" />
            </Link>
          </div>
        </div>
      </header>

      {/* 📱 MOBILE HEADER */}
      <header className="block md:hidden bg-white fixed top-0 left-0 right-0 z-50 shadow-sm">
        
        {/* 1. Mobile Top Green Bar */}
        <div className="bg-brand-green-dark empire-geometric-bg text-[#F4F1EA] h-[56px] px-3 flex items-center justify-between relative z-20">
          
          <div className="flex items-center gap-1.5 flex-1">
            <MapPin size={16} className="text-[var(--brand-gold)] shrink-0" />
            <div className="flex flex-col justify-center">
              <span className="text-gray-300 text-[8px] leading-tight uppercase tracking-wider">Location</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[var(--brand-gold)] text-[9px] truncate max-w-[75px]">Malappuram...</span>
                <ChevronDown size={12} className="text-[var(--brand-gold)]" />
              </div>
            </div>
          </div>

          <div 
            className="absolute left-1/2 -translate-x-1/2 bottom-[-1px] w-[220px] h-[36px] bg-white flex items-center justify-center z-30"
            style={{
              clipPath: "path('M 0 36 L 15 36 Q 30 36 40 24 L 50 12 Q 60 0 75 0 L 145 0 Q 160 0 170 12 L 180 24 Q 190 36 205 36 L 220 36 Z')",
            }}
          >
            <Link href="/" className="relative w-[110px] h-[26px] flex items-center justify-center mt-2">
              <Image src="/empireplaza.png" alt="Logo" fill className="object-contain" priority />
            </Link>
          </div>

          <div className="flex items-center justify-end flex-1 z-20">
            <Link href="/bookings" className="flex items-center gap-1 text-[var(--brand-gold)] hover:opacity-80 transition-opacity">
              <span className="text-[8px] font-black uppercase tracking-widest mt-0.5 whitespace-nowrap">Book a Table</span>
              <ConciergeBell size={16} className="shrink-0" />
            </Link>
          </div>
        </div>

        {/* 2. Mobile Bottom White Bar (Search) - 🌟 Reduced height to look slim without clipping */}
        <div className="bg-white w-full relative z-10 px-4 pt-[12px]">
          
          <div 
            className={`w-full transition-all duration-300 ease-in-out overflow-hidden flex items-start ${
              isScrolled ? "max-h-0 opacity-0 pointer-events-none mb-0" : "max-h-[50px] opacity-100 mb-3"
            }`}
          >
            <div style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.05))" }} className="w-full">
              {/* Green Border Wrapper */}
              <div 
                className="w-full bg-[var(--brand-green-dark)]/60 p-[1px]"
                style={{ clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%)" }}
              >
                <div 
                  className="w-full bg-white flex items-center pl-4 pr-1.5 py-1.5"
                  style={{ 
                    clipPath: "polygon(11px 0%, calc(100% - 11px) 0%, 100% 50%, calc(100% - 11px) 100%, 11px 100%, 0% 50%)" 
                  }}
                >
                  <Search size={14} className="text-[var(--brand-green-dark)] mr-2 shrink-0 opacity-80" />
                  <input 
                    type="text" 
                    placeholder="Search for delicious food..." 
                    className="bg-transparent border-none outline-none text-[11px] font-medium w-full text-gray-700 placeholder:text-gray-400"
                  />
                  {/* Slimmer Button */}
                  <button 
                    className="bg-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] transition-colors w-8 h-7 flex items-center justify-center shrink-0 ml-1"
                    style={{ clipPath: "polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%)" }}
                  >
                    <ArrowRight size={14} className="text-[#F4F1EA]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </header>

      {/* 📱 MOBILE BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-3 left-2 right-2 z-50 md:hidden" style={{ filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.15))" }}>
        <div 
          className="w-full bg-[var(--brand-green-dark)]/25 p-[1px]"
          style={{ clipPath: "polygon(16px 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0% 50%)" }}
        >
          <div 
            className="w-full bg-[#F4F1EA] flex items-center justify-between p-1"
            style={{ clipPath: "polygon(15px 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)" }}
          >
            {mobileNavLinks.map((item) => {
              const isActive = pathname === item.path;
              const Icon = isActive ? item.activeIcon : item.icon;
              const iconProps = item.isLucide ? { fill: isActive ? "currentColor" : "none" } : {};
              
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  style={isActive ? { clipPath: "polygon(15px 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)" } : {}}
                  className={`relative flex flex-col items-center justify-center w-[24%] py-1.5 transition-all duration-300 ${
                    isActive 
                      ? "bg-[var(--brand-green-dark)]" 
                      : "bg-transparent hover:bg-gray-200/50"
                  }`}
                >
                  <div className={`transition-transform duration-300 ${isActive ? "text-[var(--brand-gold)]" : "text-black"}`}>
                    <Icon size={20} {...iconProps} />
                  </div>
                  
                  <span className={`text-[8px] mt-0.5 tracking-wide font-black transition-colors uppercase ${
                    isActive ? "text-[#F4F1EA]" : "text-black"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  );
}
