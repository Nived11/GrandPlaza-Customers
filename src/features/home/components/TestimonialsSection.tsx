"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronRight, User, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reviews Data
const reviews = [
  {
    id: 1,
    name: "Arjun M",
    location: "Malappuram",
    text: "The biryani was absolutely delicious! Best flavors and super fast delivery.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fathima R",
    location: "Malappuram",
    text: "Great packaging and excellent taste. Empire Plaza never disappoints!",
    rating: 5,
  },
  {
    id: 3,
    name: "Noufal K",
    location: "Malappuram",
    text: "Our go-to place for family dinners. Love the combos and offers!",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha P",
    location: "Kochi",
    text: "Authentic taste and perfectly cooked. The customer service is also top-notch.",
    rating: 5,
  },
  {
    id: 5,
    name: "Rahul V",
    location: "Calicut",
    text: "I tried their alfaham and it was the best I've had in recent times. Highly recommended.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-slide every 3.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      // Mobile: 1 slide at a time (0 to 4)
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      // Desktop: 3 visible, max scroll index is reviews.length - 3
      setDesktopIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped Left -> Next
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    } else if (diff < -45) {
      // Swiped Right -> Prev
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentReview = reviews[currentIndex];

  return (
    <div className="w-full mt-10 sm:mt-16 lg:mt-24 pb-12 sm:pb-10 overflow-hidden">
      {/* 📝 Header Section */}
      <div className="relative flex items-center justify-center mb-6 sm:mb-10 px-4">
        <div className="flex items-center gap-1.5 sm:gap-2 z-10 bg-white px-2 sm:px-4">
          <span className="text-[var(--brand-gold)] text-[10px] sm:text-xs">✦</span>
          <h2 className="text-[14px] sm:text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
            What Our Customers Say
          </h2>
          <span className="text-[var(--brand-gold)] text-[10px] sm:text-xs">✦</span>
        </div>

        <button className="absolute right-4 lg:right-0 hidden md:flex items-center gap-1 border border-[var(--brand-gold)]/30 text-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-3 sm:px-4">
        {/* 📱 MOBILE VIEW: Strictly renders EXACTLY 1 CARD at a time */}
        <div
          className="block md:hidden w-full relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative min-h-[190px] w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentReview.id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 60 : -60,
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -60 : 60,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full px-1"
              >
                <div className="bg-[#fdfbf7] rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[var(--brand-gold)]/20 flex flex-col min-h-[175px]">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-xs font-medium leading-relaxed mb-5 flex-grow">
                    "{currentReview.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[var(--brand-gold)]/10">
                    <div className="relative w-9 h-9 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center text-[var(--brand-gold)] shrink-0">
                      <User size={18} strokeWidth={2.5} />
                      <div className="absolute bottom-0 right-0 bg-[#fdfbf7] rounded-full p-[1px]">
                        <Heart
                          size={10}
                          className="fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        {currentReview.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {currentReview.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-6 bg-[var(--brand-gold)]"
                    : "w-2 bg-[var(--brand-gold)]/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🖥️ DESKTOP VIEW: 3 Cards simultaneously with clean sliding */}
        <div
          className="hidden md:block overflow-hidden w-full relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${(reviews.length / 3) * 100}%`,
              transform: `translateX(-${(desktopIndex * 100) / reviews.length}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{ width: `${100 / reviews.length}%` }}
                className="shrink-0 px-3 py-2"
              >
                <div className="bg-[#fdfbf7] rounded-3xl p-6 lg:p-8 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[var(--brand-gold)]/20 flex flex-col hover:-translate-y-1 transition-transform duration-300 min-h-[190px]">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3 lg:mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-xs sm:text-sm lg:text-[14px] font-medium leading-relaxed mb-5 lg:mb-6 flex-grow">
                    "{review.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--brand-gold)]/10">
                    <div className="relative w-10 h-10 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center text-[var(--brand-gold)] shrink-0">
                      <User size={20} strokeWidth={2.5} />
                      <div className="absolute bottom-0 right-0 bg-[#fdfbf7] rounded-full p-0.5">
                        <Heart
                          size={11}
                          className="fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: reviews.length - 2 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setDesktopIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  desktopIndex === idx
                    ? "w-8 bg-[var(--brand-gold)]"
                    : "w-2.5 bg-[var(--brand-gold)]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}