"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import BannerSection from "./components/BannerSection";
import CravingSection from "./components/CravingSection";
import HotPicksSection from "./components/HotPicksSection";
import ReservationCard from "./components/ReservationCard";
import ComboMealsCard from "./components/ComboMealsCard";
import ExclusiveOffersCard from "./components/ExclusiveOffersCard";
import WhyChooseUsCard from "./components/WhyChooseUsCard";
import AboutUsCard from "./components/AboutUsCard";
import BestSellersSection from "./components/BestSellersSection";
import ComboOffersSection from "./components/ComboOffersSection";
import CallToActionSection from "./components/CallToActionSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";

import { useHomeHook } from "./hooks/useHomeHook";

import HomeSkeleton from "./components/HomeSkeleton";

import ProductQuickViewModal from "@/features/product/components/ProductQuickViewModal";

import type {
  HomeMenuItem,
} from "./hooks/useHomeHook";

const HomeMain = () => {
  const searchParams = useSearchParams();

  const searchQuery =
    searchParams.get("search") || "";

  const {
    homeData,
    loading,
    error,
  } = useHomeHook(searchQuery);

  const [selectedProduct, setSelectedProduct] =
    useState<HomeMenuItem | null>(null);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">

      <BannerSection
        data={homeData?.banners ?? []}
      />

      <section className="bg-white w-full max-w-[1400px] mx-auto px-4 lg:px-10 pt-4 lg:pt-0">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          <div className="lg:col-span-8 flex flex-col gap-10 lg:gap-15">

            <div className="block lg:hidden -mt-8 sm:-mt-12 relative z-10">
              <ExclusiveOffersCard />
            </div>

            <CravingSection
              data={
                homeData?.categories ?? []
              }
            />

            <HotPicksSection
              data={
                homeData?.todays_special ?? []
              }
              onProductClick={
                setSelectedProduct
              }
            />

          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 lg:-mt-[80px] relative z-20">

            <ComboMealsCard />

            <div className="hidden lg:block">
              <ExclusiveOffersCard />
            </div>

            <div className="hidden lg:block">
              <WhyChooseUsCard />
            </div>

            <AboutUsCard />

          </div>

        </div>

        <div className="w-full mt-12 lg:mt-16 hidden lg:block">
          <ReservationCard />
        </div>

        <BestSellersSection
          data={
            homeData?.best_sellers ?? []
          }
          onProductClick={
            setSelectedProduct
          }
        />

        <div className="w-full mt-4 block lg:hidden">
          <ReservationCard />
        </div>

        <ComboOffersSection
          data={
            homeData?.combo_menu ?? []
          }
          onProductClick={
            setSelectedProduct
          }
        />

        <div className="w-full mt-6 block lg:hidden">
          <WhyChooseUsCard />
        </div>

        <CallToActionSection />

        <TestimonialsSection />

        <FaqSection />

        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />

      </section>

    </div>
  );
};

export default HomeMain;