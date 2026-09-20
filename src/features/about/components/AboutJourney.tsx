"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🌟 കറൗസലിൽ വരാനുള്ള ഫോട്ടോകൾ 
const carouselImages = [
  "/family.png",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
];

export default function AboutHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🌟 Auto Carousel Logic (ഓരോ 3 സെക്കൻഡിലും ഇമേജ് മാറും)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const leftImg = carouselImages[(currentIndex - 1 + carouselImages.length) % carouselImages.length];
  const centerImg = carouselImages[currentIndex];
  const rightImg = carouselImages[(currentIndex + 1) % carouselImages.length];

  return (
    <section className="relative w-full bg-[var(--brand-cream-soft)] py-8 lg:py-10 overflow-hidden">
      
      {/* 🌟 BACKGROUND DECORATIONS (യാതൊരു മാറ്റവും വരുത്താതെ) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/shefcap.png" 
          alt="Chef Cap" 
          className="absolute top-[5%] lg:top-[10%] -left-[10%] lg:left-[5%] w-[120px] sm:w-[180px] lg:w-[250px] opacity-20 object-contain"
        />
        <img 
          src="/plateimage.png" 
          alt="Plate" 
          className="hidden sm:block absolute top-[5%] lg:top-[8%] -right-[15%] lg:right-[5%] w-[150px] sm:w-[200px] lg:w-[250px] opacity-20 object-contain"
        />
        <img 
          src="/leaf2.png" 
          alt="Leaf Decoration" 
          className="absolute top-[76%] lg:top-[62%] left-[0%] lg:left-[21%] w-[80px] sm:w-[120px] lg:w-[150px] opacity-70 object-contain"
        />
        <img 
          src="/leaf1.png" 
          alt="Leaf Decoration" 
          className="hidden sm:block absolute top-[35%] lg:top-[70%] right-[6%] lg:right-[26%] w-[80px] sm:w-[120px] lg:w-[150px] opacity-70 object-contain"
        />
        <img 
          src="/leaf.png" 
          alt="Small Leaf" 
          className="absolute top-[36%] lg:top-[33%] left-[50%] w-[25px] sm:w-[35px] opacity-50 object-contain"
        />
      </div>

      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* 📝 TOP TEXT SECTION */}
        <div className="text-center w-full px-4 mb-6 lg:mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 sm:w-12 h-px bg-[var(--brand-gold)]/50"></div>
            <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em]">
              The Journey
            </span>
            <div className="w-8 sm:w-12 h-px bg-[var(--brand-gold)]/50"></div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[var(--brand-green-dark)] leading-tight mb-3">
            From Family Roots to a<br />Global Vision
          </h1>
          
          <p className="text-[11px] sm:text-[13px] lg:text-[14px] text-gray-500 leading-relaxed font-medium max-w-xl mx-auto px-4">
            What began as a family tradition has grown into a diverse, people-first enterprise with a global outlook.
          </p>
        </div>

        {/* 📸 3D IMAGE GALLERY SECTION */}
        <div className="relative w-full h-[180px] sm:h-[240px] lg:h-[320px] flex items-center justify-center mb-8">
          
          {/* ⬅️ Left Tilted Image (മൊബൈലിൽ ചെറുതാക്കി ഒതുക്കി വെച്ചു, ലാപ്ടോപ്പ് സെയിം) */}
          <div 
            className="absolute left-[-10%] sm:left-[-5%] lg:left-[-2%] top-[15%] bottom-[15%] lg:top-[10%] lg:bottom-[10%] w-[25%] sm:w-[28%] lg:w-[26%] z-10 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl"
            style={{ 
              transform: "perspective(1000px) rotateY(30deg)", 
              transformOrigin: "right center" 
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={leftImg}
                src={leftImg}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.8 }}
                alt="Restaurant Ambience" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/10"></div> 
          </div>

          {/* 🟢 Center Main Image (മൊബൈലിൽ വിഡ്ത്ത് കൂട്ടി, ലാപ്ടോപ്പ് സെയിം) */}
          <div className="relative z-20 w-[70%] sm:w-[60%] lg:w-[38%] h-[85%] lg:h-full rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--brand-gold)] ring-4 ring-[var(--brand-cream-soft)] bg-white">
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={centerImg}
                src={centerImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                alt="Family Dining" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* ➡️ Right Tilted Image (മൊബൈലിൽ ചെറുതാക്കി ഒതുക്കി വെച്ചു, ലാപ്ടോപ്പ് സെയിം) */}
          <div 
            className="absolute right-[-10%] sm:right-[-5%] lg:right-[-2%] top-[15%] bottom-[15%] lg:top-[10%] lg:bottom-[10%] w-[25%] sm:w-[28%] lg:w-[26%] z-10 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl"
            style={{ 
              transform: "perspective(1000px) rotateY(-30deg)", 
              transformOrigin: "left center" 
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={rightImg}
                src={rightImg}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.8 }}
                alt="Delicious Food" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

        </div>

        {/* 📝 BOTTOM TEXT & DOTS */}
        <div className="flex flex-col items-center justify-center w-full px-4 mt-2">
          {/* Animated 3 Dots corresponding to carousel */}
          <div className="flex items-center gap-1.5 mb-3">
            {carouselImages.map((_, idx) => (
              <span 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? 'w-4 bg-[var(--brand-gold)]' : 'w-1.5 bg-[var(--brand-gold)]/40'
                }`}
              ></span>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-3 w-full max-w-[400px]">
            <div className="flex-1 h-[0.5px] bg-gray-300"></div>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400 whitespace-nowrap">
              Good Food Brings People Together
            </span>
            <div className="flex-1 h-[0.5px] bg-gray-300"></div>
          </div>
        </div>

      </div>
    </section>
  );
}