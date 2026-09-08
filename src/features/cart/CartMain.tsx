"use client";

import React from "react";
import CartBreadcrumb from "./components/CartBreadcrumb";
import CartItems from "./components/CartItems";
import CookingInstructions from "./components/CookingInstructions";
import AddMoreDishes from "./components/AddMoreDishes";
import OrderSummary from "./components/OrderSummary";
import PopularAddons from "./components/PopularAddons";

const CartMain = () => {
  return (
    <div className="bg-[#FBF6EC] text-[#1E2A22] min-h-screen flex flex-col antialiased">
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 sm:px-12 py-8 relative">
        {/* Decorative subtle botanical background elements */}
        <div className="absolute top-10 left-4 w-32 h-32 opacity-5 pointer-events-none text-[#0F3D2E]">
          <svg fill="currentColor" viewBox="0 0 100 100">
            <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0 Z" />
          </svg>
        </div>

        <CartBreadcrumb />

        {/* Header / Eyebrow Title Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D9A441] tracking-widest uppercase mb-1">
            <span>✦</span>
            <span>YOUR FEAST AWAITS</span>
            <span>✦</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#0F3D2E]/10 pb-4 gap-2">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3D2E] tracking-tight">
              Your Shopping{" "}
              <span className="text-[#D9A441] font-serif italic">
                Cart
              </span>
            </h1>

            <p className="text-sm text-[#1E2A22]/70 font-medium">
              3 freshly prepped items in your basket
            </p>
          </div>
        </div>

        {/* Main Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            <CartItems />
            <CookingInstructions />
            <AddMoreDishes />
          </div>

          {/* RIGHT COLUMN */}
          <OrderSummary />
        </div>

        {/* Popular Add-ons */}
        <PopularAddons />
      </main>
    </div>
  );
};

export default CartMain;