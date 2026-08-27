import React from 'react';
import BannerSection from './components/BannerSection';
import CravingSection from './components/CravingSection';
import HotPicksSection from './components/HotPicksSection';
import ReservationCard from './components/ReservationCard';
import ComboMealsCard from './components/ComboMealsCard';
import ExclusiveOffersCard from './components/ExclusiveOffersCard';
import WhyChooseUsCard from './components/WhyChooseUsCard';
import AboutUsCard from './components/AboutUsCard';
import BestSellersSection from './components/BestSellersSection';
import ComboOffersSection from './components/ComboOffersSection';
import CallToActionSection from './components/CallToActionSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';

const HomeMain = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--brand-cream-soft)] overflow-x-hidden">
      
      {/* 1. HERO / BANNER SECTION */}
      <BannerSection />

      {/* 2. MAIN CONTENT AREA */}
      <section className="bg-white w-full max-w-[1400px] mx-auto px-4 lg:px-10 pt-4 lg:pt-0 ">
        
        {/* --- TOP GRID: Left (8) & Right (4) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* 🟢 LEFT COLUMN (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-10 lg:gap-15">
            
            {/* 🌟 MOBILE ONLY: Exclusive Offers Card placed above Craving Section */}
            <div className="block lg:hidden -mt-8 sm:-mt-12 relative z-10">
              <ExclusiveOffersCard />
            </div>

            <CravingSection />
            <HotPicksSection />
          </div>

          {/* 🟠 RIGHT COLUMN (4 Columns) - Negative margin pushes it up! */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:-mt-[80px] relative z-20">
            <ComboMealsCard />
            
            {/* 🌟 DESKTOP ONLY: Exclusive Offers Card remains here for Laptop view */}
            <div className="hidden lg:block">
              <ExclusiveOffersCard />
            </div>

            {/* 🌟 DESKTOP ONLY: Why Choose Us remains here for Laptop view */}
            <div className="hidden lg:block">
              <WhyChooseUsCard />
            </div>

            <AboutUsCard />
          </div>

        </div>

        {/* 🌟 DESKTOP ONLY: Reservation Card before Best Sellers */}
        <div className="w-full mt-12 lg:mt-16 hidden lg:block">
          <ReservationCard />
        </div>

        {/* 🔵 NEW SECTION: BEST SELLERS (Full Width, 12 Items) */}
        <BestSellersSection />

        {/* 🌟 MOBILE ONLY: Reservation Card placed AFTER Best Sellers */}
        <div className="w-full mt-4 block lg:hidden">
          <ReservationCard />
        </div>

        {/* 🔵 NEW SECTION: COMBO OFFERS (3 items per row, Total 6) */}
        <ComboOffersSection />

        {/* 🌟 MOBILE ONLY: Why Choose Us placed AFTER Combo Offers */}
        <div className="w-full mt-6 block lg:hidden">
          <WhyChooseUsCard />
        </div>

        {/* 🔵 NEW SECTION: CALL TO ACTION */}
        <CallToActionSection />

        {/* 🔵 NEW SECTION: TESTIMONIALS */}
        <TestimonialsSection />
        
        {/* 🔵 NEW SECTION: FAQ */}
        <FaqSection />

      </section>

    </div>
  );
}

export default HomeMain;