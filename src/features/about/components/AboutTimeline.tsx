"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Mouse } from 'lucide-react';

const timelineData = [
  {
    year: "1927",
    subtitle: "THE BEGINNING",
    title: "Roots of Tradition",
    exp: "A humble start",
    desc: "It all started with a small family recipe and a big dream. The foundation of our hospitality journey began here, focusing on pure ingredients and authentic taste.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2000",
    subtitle: "EXPANSION",
    title: "Scaling New Heights",
    exp: "Entering new markets",
    desc: "Over the years, the journey expanded across hospitality, real estate, and strategic management, creating a strong footprint in the industry.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2026",
    subtitle: "GROWTH",
    title: "Building Through Experience",
    exp: "26+ Years of Business Experience",
    desc: "Today, we lead with purpose and innovation. Learning, adapting, and building businesses with a people-first approach.",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "FUTURE",
    subtitle: "BEYOND",
    title: "A Global Vision",
    exp: "Looking ahead",
    desc: "Our vision for the future spans continents. We aim to bring our unique blend of hospitality and culture to the global stage.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80"
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
            🌟 BACKGROUND DECORATIONS (Animated Leaf)
        ========================================== */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }} // 0.5 opacity for the blended look
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              src="/leaf1.png"
              alt="Leaf"
              className="absolute top-[30%] left-[40%] w-[120px] object-contain"
            />
          </AnimatePresence>
        </div>

        {/* =========================================
            ⬅️ LEFT SIDE: STATIC INNER CIRCLE (കറങ്ങില്ല)
        ========================================== */}
        <div className="hidden lg:flex absolute left-[-280px] xl:left-[-350px] top-1/2 -translate-y-1/2 w-[600px] xl:w-[700px] h-[600px] xl:h-[700px] rounded-full z-0 pointer-events-none overflow-hidden">
          
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
            alt="Timeline Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale"
          />
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
        {/* 🌟 Static റൗണ്ടിന്റെ കൃത്യം അതേ സൈസും പൊസിഷനും കൊടുത്തു */}
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
                {/* 🌟 ഈ റാപ്പർ (wrapper) ലൈനിന്റെ കൃത്യം നടുവിലായിരിക്കാൻ `right-0` ഉം `translate-x-1/2` ഉം കൊടുത്തു */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center w-6 h-6">
                  
                  {/* Dot (Active ആണെങ്കിൽ വലുതാവുകയും Glow വരുകയും ചെയ്യും) */}
                  <div className={`rounded-full transition-all duration-500 ${isActive ? 'w-5 h-5 bg-[var(--brand-gold)] ring-[6px] ring-[var(--brand-gold)]/20 shadow-md' : 'w-3 h-3 bg-[var(--brand-gold)]/60'}`} />

                  {/* Text Container (ഡോട്ടിൽ നിന്നും അല്പം വലത്തോട്ട് മാറ്റി വെച്ചു) */}
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
                The Journey
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-black text-[var(--brand-green-dark)] leading-[1.1] mb-5">
                {timelineData[activeIndex].title}
              </h2>
              
              <p className="text-[12px] sm:text-[13px] text-[var(--brand-gold)] font-bold mb-4">
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
        <div className="hidden lg:flex relative z-20 w-[280px] xl:w-[320px] h-[350px] xl:h-[300px] mr-[8%] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={timelineData[activeIndex].image}
              alt={timelineData[activeIndex].title}
              className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[var(--brand-gold)]/20"
            />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}