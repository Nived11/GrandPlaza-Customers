"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const timelineData = [
  {
    year: "1927",
    subtitle: "FAMILY ROOTS",
    title: "The Legacy Begins",
    exp: "A hospitality journey starts in Nashik.",
    desc: "Our connection with hospitality stems from a family legacy that began in 1927, when our grandfather started his restaurant business in Nashik, Maharashtra, laying the foundation for generations to come.",
    image: "/img1927.png" 
  },
  {
    year: "2000",
    subtitle: "NEW CHAPTER",
    title: "Entrepreneurial Vision",
    exp: "Guided by discipline and hard work.",
    desc: "Inspired by the dedication and perseverance of a farmer father, the independent entrepreneurial journey began. It was built on the core values of consistency, patience, and a strong desire to create lasting value.",
    image: "/img2000.png"
  },
  {
    year: "2026",
    subtitle: "PRESENT",
    title: "26+ Years of Experience",
    exp: "Leading a team of 220+ professionals.",
    desc: "Today, as leaders of Empire Plaza and HUYS Global Ventures, our journey spans hospitality, real estate, and construction. We focus on building strong teams, innovation, and continuous human development.",
    image: "/img2026.png"
  },
  {
    year: "FUTURE",
    subtitle: "GLOBAL VISION",
    title: "A Lasting Legacy",
    exp: "Taking authentic flavours to the world.",
    desc: "Our ambition is to establish a strong global presence, introducing diverse cuisines across continents. We aim to create ventures recognized for quality, purpose, and a positive impact on society.",
    image: "/future2000.png"
  }
];

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.5) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  const targetRotation = -(activeIndex * 30);

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[var(--brand-cream-soft)]">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* =========================================
            ⬅️ LEFT SIDE: STATIC INNER CIRCLE 
        ========================================== */}
        <div className="hidden lg:flex absolute left-[-280px] xl:left-[-350px] top-1/2 -translate-y-1/2 w-[600px] xl:w-[700px] h-[600px] xl:h-[700px] rounded-full z-0 pointer-events-none overflow-hidden">
          
          {/* 🌟 1. Updated with imgcorner.png */}
          <img 
            src="/imgcorner.png" 
            alt="Timeline Background" 
            className="absolute inset-0 w-full h-full object-contain opacity-30 left-[-280px] xl:left-[150px] "
          />
          
          {/* 🌟 2. Faded white on top */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-transparent" />
          
          {/* 🌟 3. Side fade to match background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--brand-cream-soft)]/60 to-[var(--brand-cream-soft)]" />
          
          {/* A Journey Of Goodness Badge */}
          <div className="absolute right-[12%] xl:right-[25%] top-1/2 -translate-y-1/2 w-[110px] xl:w-[130px] h-[110px] xl:h-[130px]   flex flex-col items-center justify-center ">
            <img src="/leaf.png" alt="Leaf" className="w-5 xl:w-12 mb-1 opacity-80" />
            <span className="text-[7px] xl:text-[10px] font-bold text-black/60 uppercase tracking-[0.3em] text-center leading-relaxed">
              A Journey<br/>Of Goodness
            </span>
          </div>

        </div>

        {/* =========================================
            ⬅️ LEFT SIDE: ROTATING TIMELINE BORDER & DOTS
        ========================================== */}
        <motion.div 
          animate={{ rotate: targetRotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="hidden lg:block absolute left-[-280px] xl:left-[-350px] top-1/2 -translate-y-1/2 w-[600px] xl:w-[700px] h-[600px] xl:h-[700px] rounded-full border-[1px] border-[var(--brand-green-dark)]/50 z-10 pointer-events-none"
        >
          {timelineData.map((item, i) => {
            const angle = i * 30; 
            const isActive = activeIndex === i;

            return (
              <div 
                key={i} 
                className="absolute inset-0 origin-center" 
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center w-6 h-6">
                  
                  {/* Dot */}
                  <div className={`rounded-full transition-all duration-500 ${isActive ? 'w-5 h-5 bg-[var(--brand-gold)] ring-[6px] ring-[var(--brand-gold)]/20 shadow-md' : 'w-3 h-3 bg-[var(--brand-gold)]/60'}`} />

                  {/* Text Container */}
                  <motion.div 
                    animate={{ rotate: (activeIndex - i) * 30 }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="absolute left-full ml-5 origin-left w-[200px]"
                  >
                    <div className="flex items-center gap-3">
                      <h4 className={`text-xl font-black tracking-widest transition-colors duration-500 ${isActive ? 'text-[var(--brand-green-dark)]' : 'text-gray-400'}`}>
                        {item.year}
                      </h4>
                      {/* Active line separator */}
                      <div className={`h-[1.5px] transition-all duration-500 ${isActive ? 'w-6 bg-[var(--brand-gold)]' : 'w-0 bg-transparent'}`} />
                    </div>
                    <p className={`text-[8px] uppercase tracking-[0.2em] font-bold mt-1 transition-colors duration-500 ${isActive ? 'text-[var(--brand-gold)]' : 'text-gray-400'}`}>
                      {item.subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>


        {/* =========================================
            📝 CENTER: DYNAMIC TEXT CONTENT 
        ========================================== */}
        <div className="relative z-20 flex-1 flex flex-col justify-center max-w-xl mx-auto px-6 lg:ml-[25%] xl:ml-[35%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em] mb-4 block">
                {timelineData[activeIndex].subtitle}
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-serif font-black text-[var(--brand-green-dark)] leading-[1.1] mb-5">
                {timelineData[activeIndex].title}
              </h2>
              
              <p className="text-[12px] sm:text-[13px] text-[var(--brand-gold)] font-semibold mb-4">
                {timelineData[activeIndex].exp}
              </p>
              
              <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed font-medium">
                {timelineData[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>


        {/* =========================================
            📸 RIGHT SIDE: DYNAMIC IMAGE
        ========================================== */}
        <div className="hidden lg:flex relative z-20 w-[320px] xl:w-[400px] h-[400px] xl:h-[400px] mr-[6%] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={timelineData[activeIndex].image}
              alt={timelineData[activeIndex].title}
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}