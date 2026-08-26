"use client";

import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiChevronRight as ArrowRight } from "react-icons/fi";
import { Bike, ShieldCheck, Tag, ConciergeBell, MapPin } from "lucide-react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface BannerItem {
  id: number | string;
  subTitle?: string;
  title1: string;
  title2: string;
  title3?: string;
  description: string;
  banner_image?: string;
  image?: string;
}

interface BannerSectionProps {
  data?: BannerItem[];
  onBannerClick?: (item: BannerItem) => void;
}

const dummyBanners: BannerItem[] = [
  {
    id: 1,
    subTitle: "FLAVORS THAT DELIGHT",
    title1: "Good Food,",
    title2: "Great Moments.",
    // title3: "Delivered Fast.",
    description: "From our kitchen to your doorstep – crafted with passion, delivered with care.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    subTitle: "AUTHENTIC RECIPES",
    title1: "Taste the Authentic,",
    title2: "Royal Biryani.",
    // title3: "Every Single Time.",
    description: "Cooked with premium spices and long-grain basmati rice. A royal treat for your taste buds.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    subTitle: "HOT & CRISPY",
    title1: "Craving Something",
    title2: "Crispy & Spicy?",
    // title3: "Order Now.",
    description: "Try our signature broasted chicken and fiery wings. Perfectly crispy on the outside.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop",
  }
];

const BannerSection = ({ data, onBannerClick }: BannerSectionProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const banners = data && data.length > 0 ? data : dummyBanners;

  const settings = {
    infinite: banners.length > 1,
    slidesToShow: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    fade: true, 
    beforeChange: (current: number, next: number) => setActiveIndex(next),
  };

  const iconProps = { size: 28, fill: "var(--brand-gold)", stroke: "#015a41", strokeWidth: 1.5 };
  
  const features = [
    { icon: <Bike {...iconProps} />, title: "30 MIN", sub: "FAST DELIVERY" },
    { icon: <ShieldCheck {...iconProps} />, title: "100%", sub: "HYGIENIC FOOD" },
    { icon: <Tag {...iconProps} />, title: "BEST OFFERS", sub: "EVERYDAY" },
    { icon: <ConciergeBell {...iconProps} />, title: "FRESH & HOT", sub: "PERFECTION" },
    { icon: <MapPin {...iconProps} />, title: "LIVE ORDER", sub: "TRACKING" },
  ];

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full bg-white pb-24 lg:pb-12 pt-0 overflow-visible group font-sans">
      
      {/* 🟢 CUSTOM ARROWS */}
      {banners.length > 1 && (
        <>
          <button 
            onClick={() => sliderRef.current?.slickPrev()} 
            className="hidden lg:flex absolute left-4 xl:left-8 top-[35%] z-40 bg-white/60 backdrop-blur-md rounded-full p-3 hover:bg-[var(--brand-green-dark)] text-[var(--brand-green-dark)] hover:text-[var(--brand-gold)] transition-all active:scale-90 shadow-sm"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={() => sliderRef.current?.slickNext()} 
            className="hidden lg:flex absolute right-4 xl:right-8 top-[35%] z-40 bg-white/60 backdrop-blur-md rounded-full p-3 hover:bg-[var(--brand-green-dark)] text-[var(--brand-green-dark)] hover:text-[var(--brand-gold)] transition-all active:scale-90 shadow-sm"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* 🟢 CAROUSEL SLIDER */}
      <Slider ref={sliderRef} {...settings}>
        {banners.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div key={item.id || index} className="outline-none">
              
              {/* 🌟 HEIGHT INCREASED (h-[460px]) 🌟 */}
              <div className="relative w-full h-[400px] lg:h-[460px] bg-[var(--brand-cream-soft)] overflow-visible flex flex-col lg:flex-row">
                
                <div className="hidden lg:block absolute inset-0 w-[55%] z-0 pointer-events-none overflow-hidden">
                  <div className="absolute -left-[10%] top-[-20%] w-[600px] h-[600px] bg-[var(--brand-gold)] opacity-[0.07] rounded-full blur-[100px]" />
                  <div className="absolute left-[20%] bottom-[-20%] w-[400px] h-[400px] bg-[var(--brand-green-dark)] opacity-[0.04] rounded-full blur-[80px]" />
                </div>

                {/* 🌟 LEFT TEXT CONTENT (Moved further left with max-w-[1400px] & px-8) */}
                <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center z-20 pointer-events-none">
                  
                  {isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-cream-soft)] via-[var(--brand-cream-soft)]/90 to-transparent -z-10" />
                  )}

                  <div className="pointer-events-auto text-center lg:text-left mt-32 lg:mt-[-60px] z-10 w-full lg:w-[55%]">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <h4 className="text-[var(--brand-gold)] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 drop-shadow-sm">
                            {item.subTitle}
                          </h4>

                          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif font-black leading-[1.1] text-[var(--brand-green-dark)] mb-4">
                            {item.title1} <br />
                            <span className="text-[var(--brand-gold)]">{item.title2}</span> <br className="hidden lg:block"/>
                            {item.title3}
                          </h1>
                          
                          <p className="text-[11px] md:text-[15px] font-medium mb-6 lg:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed text-gray-600">
                            {item.description}
                          </p>
                          
                          {/* 🎯 Order Now Button ONLY */}
                          <div className="flex items-center justify-center lg:justify-start">
                            <button 
                              onClick={() => onBannerClick?.(item)}
                              className="flex items-center gap-2 bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-[11px] transition-all shadow-[0_8px_20px_rgba(1,90,65,0.25)] active:scale-95 border border-[var(--brand-gold)]/20"
                            >
                              Order Now <ArrowRight size={14} className="text-[var(--brand-gold)]" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 🍛 RIGHT CURVED IMAGE */}
                <div className="absolute right-0 top-0 w-full lg:w-[50%] h-[280px] lg:h-[400px] z-0 overflow-visible pointer-events-none lg:pointer-events-auto">
                  <div className="w-full h-full relative overflow-hidden">
                    <div 
                      className="absolute right-0 top-0 w-full h-full bg-[var(--brand-green-dark)] overflow-hidden"
                      style={!isMobile ? { 
                        borderTopLeftRadius: "500px",
                        borderBottomLeftRadius: "500px", 
                        borderLeft: "6px solid var(--brand-gold)" 
                      } : {
                        borderBottomLeftRadius: "40px",
                        borderBottomRightRadius: "40px",
                        borderBottom: "4px solid var(--brand-gold)"
                      }}
                    >
                      <img src={item.image || item.banner_image} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* 🍃 LEAVES OVERLAY */}
                  {!isMobile && (
                    <img 
                      src="/leaves.png" 
                      alt="Leaves decoration" 
                      className="absolute top-[54%] -translate-y-1/2 -left-[160px] h-[150%] w-auto object-contain z-20 pointer-events-none drop-shadow-xl" 
                    />
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </Slider>

      {/* 🚀 BOTTOM FLOATING FEATURE CARD */}
      <div className="absolute -bottom-6 lg:bottom-10 left-[0px] lg:left-[-200px]  w-full pointer-events-none z-30">
        <div className="max-w-[1000px] mx-auto px-4 lg:px-10 w-full flex justify-center lg:justify-start">
          
          {/* Changed w-[78%] to w-[95%] to fit 5 items comfortably, added grid-cols-5 */}
          <div className="w-full lg:w-[95%] bg-white rounded-xl lg:rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-[var(--brand-gold)]/10 py-1 pointer-events-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x-0 lg:divide-x divide-y lg:divide-y-0 divide-gray-100 items-center">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  /* Reduced padding here (py-3 px-2 lg:py-3.5 lg:px-4) to decrease the height */
                  className={`flex flex-row items-center justify-start lg:justify-center gap-2 sm:gap-3 py-3 px-2 lg:py-3.5 lg:px-4 hover:bg-[var(--brand-cream-soft)]/50 transition-colors 
                    ${idx === 0 ? 'lg:rounded-l-[1.5rem] first:rounded-t-xl lg:first:rounded-tr-none' : ''} 
                    ${idx === features.length - 1 ? 'lg:rounded-r-[1.5rem] last:rounded-b-xl lg:last:rounded-bl-none' : ''}`
                  }
                >
                  <div className="shrink-0 drop-shadow-sm">{feature.icon}</div>
                  <div className="flex flex-col text-left overflow-hidden">
                    <h4 className="text-[11px] sm:text-[13px] font-bold text-slate-900 tracking-tight leading-tight truncate">{feature.title}</h4>
                    <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 mt-0.5 truncate">{feature.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BannerSection;