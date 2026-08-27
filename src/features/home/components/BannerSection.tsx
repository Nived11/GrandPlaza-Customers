"use client";

import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiChevronRight as ArrowRight } from "react-icons/fi";
import { Bike, ShieldCheck, Tag, ConciergeBell } from "lucide-react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface BannerItem {
  id: number | string;
  category?: string;
  title: string;
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
    category: "FLAVORS THAT DELIGHT",
    title: "Good Food, Great Moments.",
    description: "From our kitchen to your doorstep – crafted with passion, delivered with care.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "AUTHENTIC RECIPES",
    title: "Taste the Authentic, Royal Biryani.",
    description: "Cooked with premium spices and long-grain basmati rice. A royal treat for your taste buds.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "HOT & CRISPY",
    title: "Craving Something Crispy & Spicy?",
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
  ];

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full bg-white pb-24 lg:pb-12 pt-0 overflow-visible group font-sans">
      
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

      <Slider ref={sliderRef} {...settings}>
        {banners.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div key={item.id || index} className="outline-none">
              
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[460px] bg-[var(--brand-cream-soft)] overflow-visible flex flex-row items-center">
                
                <div className="hidden lg:block absolute inset-0 w-[55%] z-0 pointer-events-none overflow-hidden">
                  <div className="absolute -left-[10%] top-[-20%] w-[600px] h-[600px] bg-[var(--brand-gold)] opacity-[0.07] rounded-full blur-[100px]" />
                  <div className="absolute left-[20%] bottom-[-20%] w-[400px] h-[400px] bg-[var(--brand-green-dark)] opacity-[0.04] rounded-full blur-[80px]" />
                </div>

                <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center z-20 pointer-events-none">
                  <div className="pointer-events-auto text-left mt-0 lg:mt-[-60px] z-10 w-[55%] lg:w-[55%]">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <h4 className="text-[var(--brand-gold)] text-[7px] sm:text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] lg:tracking-[0.2em] mb-1.5 lg:mb-3 drop-shadow-sm">
                            {item.category}
                          </h4>

                          <h1 className="text-[17px] sm:text-[24px] lg:text-[38px] font-serif font-black leading-[1.15] text-[var(--brand-green-dark)] mb-2 lg:mb-4">
                            {item.title}
                          </h1>
                          
                          <p className="text-[9px] sm:text-[12px] md:text-[15px] font-medium mb-4 lg:mb-8 max-w-[180px] sm:max-w-[220px] lg:max-w-md leading-relaxed text-gray-700 line-clamp-3 lg:line-clamp-none pr-1 lg:pr-0">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-start">
                            <button 
                              onClick={() => onBannerClick?.(item)}
                              className="flex items-center gap-1.5 lg:gap-2 bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 lg:px-10 lg:py-4 rounded-full font-bold uppercase tracking-widest text-[8px] lg:text-[11px] transition-all shadow-[0_4px_10px_rgba(1,90,65,0.2)] lg:shadow-[0_8px_20px_rgba(1,90,65,0.25)] active:scale-95 border border-[var(--brand-gold)]/20"
                            >
                              Order Now <ArrowRight size={14} className="text-[var(--brand-gold)] w-2.5 h-2.5 lg:w-3.5 lg:h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="absolute right-0 top-0 w-[45%] sm:w-[50%] h-full lg:h-[400px] z-10 overflow-visible pointer-events-none lg:pointer-events-auto">
                  <div className="w-full h-full relative overflow-hidden">
                    <div 
                      className="absolute right-0 top-0 w-full h-full bg-[var(--brand-green-dark)] overflow-hidden"
                      style={{ 
                        borderTopLeftRadius: "500px",
                        borderBottomLeftRadius: "500px", 
                        borderLeft: isMobile ? "3px solid var(--brand-gold)" : "6px solid var(--brand-gold)" 
                      }}
                    >
                      <img src={item.image || item.banner_image} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <img 
                    src="/leaves.png" 
                    alt="Leaves decoration" 
                    className="absolute top-[-130%] -left-[65px] h-[800px] sm:h-[80px] lg:top-[54%] lg:-translate-y-1/2 lg:-left-[160px] lg:h-[150%] w-auto object-contain z-20 pointer-events-none drop-shadow-md lg:drop-shadow-xl" 
                  />
                </div>

              </div>
            </div>
          );
        })}
      </Slider>

      <div className="absolute -bottom-[-40px] lg:bottom-10 left-[0px] lg:left-[-200px] w-full pointer-events-none z-30">
        <div className="max-w-[1000px] mx-auto px-2 lg:px-10 w-full flex justify-center lg:justify-start">
          
          <div className="w-full lg:w-[90%] bg-white rounded-lg sm:rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-[var(--brand-gold)]/10 py-0.5 lg:py-1 pointer-events-auto">
            <div className="grid grid-cols-4 divide-x divide-gray-100 items-center">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-0.5 lg:gap-3 py-1.5 px-0.5 lg:py-3.5 lg:px-4 hover:bg-[var(--brand-cream-soft)]/50 transition-colors ${idx === 0 ? 'rounded-l-xl' : ''} ${idx === features.length - 1 ? 'rounded-r-xl' : ''}`}
                >
                  <div className="shrink-0 drop-shadow-sm scale-[0.65] -my-1 lg:my-0 lg:scale-100">{feature.icon}</div>
                  
                  <div className="flex flex-col text-center lg:text-left overflow-hidden w-full mt-0.5 lg:mt-0">
                    <h4 className="text-[7px] sm:text-[9px] lg:text-[13px] font-bold text-slate-900 tracking-tight leading-tight truncate">{feature.title}</h4>
                    <p className="text-[5px] sm:text-[7px] lg:text-[10px] font-medium text-gray-500 mt-0.5 truncate">{feature.sub}</p>
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