"use client";

import React from 'react';
import Slider from "react-slick";
import { Star, ChevronRight, User, Heart } from 'lucide-react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Dummy Reviews Data
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
  }
];

export default function TestimonialsSection() {
  
  // 🌟 Carousel Settings (Pause on Hover included)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true, // 👈 മൗസ് വെക്കുമ്പോൾ നിൽക്കാൻ
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full mt-10 sm:mt-16 lg:mt-24 pb-6 sm:pb-10">
      
      {/* 📝 Header Section */}
      <div className="relative flex items-center justify-center mb-6 sm:mb-10 px-4">
        <div className="flex items-center gap-1.5 sm:gap-2 z-10 bg-white px-2 sm:px-4">
          <span className="text-[var(--brand-gold)] text-[10px] sm:text-xs">✦</span>
          {/* 🌟 Mobile Heading size reduced */}
          <h2 className="text-[18px] sm:text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
            What Our Customers Say
          </h2>
          <span className="text-[var(--brand-gold)] text-[10px] sm:text-xs">✦</span>
        </div>
        
        <button className="absolute right-4 lg:right-0 hidden md:flex items-center gap-1 border border-[var(--brand-gold)]/30 text-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
          View All <ChevronRight size={14} />
        </button>
      </div>

      {/* 🍔 Carousel Slider */}
      <div className="max-w-[1400px] mx-auto px-2 lg:px-0 pb-6 sm:pb-0">
        <Slider {...settings} className="testimonial-slider">
          {reviews.map((review) => (
            <div key={review.id} className="px-2 sm:px-3 outline-none py-2">
              {/* 🌟 Reduced padding (p-4) for mobile to decrease height */}
              <div className="bg-[#fdfbf7] rounded-[1.25rem] sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[var(--brand-gold)]/10 h-full flex flex-col transition-transform hover:-translate-y-1 duration-300">
                
                {/* 🌟 Stars - slightly smaller on mobile */}
                <div className="flex items-center gap-1 mb-2.5 sm:mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="sm:w-[14px] sm:h-[14px] fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                  ))}
                </div>
                
                {/* 📝 Review Text - smaller size on mobile */}
                <p className="text-slate-700 text-[10px] sm:text-[12px] lg:text-[14px] font-medium leading-relaxed mb-4 sm:mb-8 flex-grow">
                  {review.text}
                </p>
                
                {/* 👤 User Info with Custom Icon */}
                <div className="flex items-center gap-2.5 sm:gap-3 mt-auto pt-1 sm:pt-2">
                  
                  {/* Custom Icon - Scaled down for mobile */}
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center text-[var(--brand-gold)] shrink-0">
                    <User size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                    <div className="absolute bottom-0 right-0 bg-[#fdfbf7] rounded-full p-[1px] sm:p-0.5">
                      <Heart size={10} className="sm:w-3 sm:h-3 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h4 className="text-[9px] sm:text-[11px] lg:text-[12px] font-black text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[7.5px] sm:text-[9px] lg:text-[10px] text-gray-400 font-medium">
                      {review.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      {/* 🛠 Custom CSS for Dots */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 🌟 Adjusted dot position for mobile */
        @media (max-width: 640px) {
          .testimonial-slider .slick-dots { bottom: -15px !important; }
        }
        .testimonial-slider .slick-dots { bottom: -30px; }
        .testimonial-slider .slick-dots li button:before { color: var(--brand-gold); opacity: 0.3; font-size: 10px; }
        .testimonial-slider .slick-dots li.slick-active button:before { color: var(--brand-gold); opacity: 1; font-size: 12px; }
      `}} />

    </div>
  );
}