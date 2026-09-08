"use client";

import React, { useState } from "react";

const ProductInfo = () => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedSpice, setSelectedSpice] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const basePrice = 270;
  const price = basePrice + selectedSize;

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <section
      aria-label="Product Options and Purchase Form"
      className="lg:col-span-5 flex flex-col space-y-6"
    >
      {/* Heading & Category Header */}
      <div className="border-b border-[#E6E0D2] pb-5">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-[#D9A441] text-xs font-bold uppercase tracking-widest">
            ✦ BURGERS ✦
          </span>

          <span className="text-[#E6E0D2]">•</span>

          <span className="text-xs font-medium text-[#0F3D2E]/80 bg-[#0F3D2E]/10 px-2 py-0.5 rounded">
            Gourmet Series
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E2A22] leading-tight mb-2.5">
          Updated{" "}
          <span className="text-[#D9A441] italic">
            Chicken Burger
          </span>
        </h1>

        <div className="flex items-center space-x-4 mb-3 text-sm">
          {/* Rating */}
          <div className="flex items-center text-[#D9A441] space-x-1">
            <span className="flex text-[#D9A441] text-base">
              ★★★★★
            </span>

            <span className="font-bold text-[#1E2A22] ml-1">
              4.8
            </span>

            <span className="text-[#8C968F] text-xs">
              (240+ reviews)
            </span>
          </div>

          <span className="text-[#E6E0D2]">•</span>

          <a
            className="text-xs text-[#0F3D2E] font-medium hover:underline underline-offset-2"
            href="#reviews"
          >
            Read all reviews
          </a>
        </div>

        <p className="text-[#1E2A22]/80 text-sm leading-relaxed">
          Succulent, 24-hour herb-marinated grilled chicken breast
          tucked inside a toasted artisan brioche bun, crowned with
          aged smoked cheddar cheese melt, caramelized onions, crisp
          butterhead lettuce, and house-smoked chili herb aioli.
        </p>
      </div>

      {/* Dynamic Live Urgency / Social Proof Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-[#D9A441]/30 rounded-xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E65100]"></span>
          </span>

          <p className="text-xs text-[#1E2A22] font-medium">
            <span className="font-bold text-[#E65100]">
              🔥 18 people
            </span>{" "}
            ordered this in the last 1 hour
          </p>
        </div>

        <span className="text-[10px] font-bold text-[#0F3D2E] bg-[#D9A441]/20 px-2 py-0.5 rounded-full border border-[#D9A441]/30 uppercase tracking-wide shrink-0">
          Selling Fast
        </span>
      </div>

      {/* Pricing Block */}
      <div className="flex items-baseline space-x-3">
        <div className="overflow-hidden inline-block">
          <span
            className="text-3xl font-extrabold text-[#1E2A22] tracking-tight transition-transform duration-200 inline-block"
          >
            ₹{price.toFixed(2)}
          </span>
        </div>

        <span className="text-lg text-[#8C968F] line-through">
          ₹300.00
        </span>

        <span className="bg-[#D9A441]/20 text-[#B88224] text-xs font-bold px-2.5 py-1 rounded-full uppercase">
          Includes Add-ons
        </span>
      </div>

      {/* Interactive Customization Form */}
      <form
        className="space-y-6"
        id="order-form"
        onSubmit={(event) => event.preventDefault()}
      >
        {/* Size Variant Picker */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E2A22] flex items-center gap-1.5">
              <span>Choose Burger Size</span>

              <span className="text-red-500 text-xs">*</span>
            </label>

            <span className="text-[11px] text-[#8C968F] font-medium">
              Required
            </span>
          </div>

          <div
            aria-label="Burger Size"
            className="grid grid-cols-3 gap-2.5"
            role="radiogroup"
          >
            {/* Regular */}
            <label className="cursor-pointer group">
              <input
                checked={selectedSize === 0}
                className="peer sr-only"
                name="burger-size"
                type="radio"
                value="0"
                onChange={() => setSelectedSize(0)}
              />

              <div className="p-3 text-center rounded-xl border border-[#E6E0D2] peer-checked:border-[#0F3D2E] peer-checked:bg-[#0F3D2E] peer-checked:text-white transition-all duration-200 bg-white hover:border-[#0F3D2E]/40 transform active:scale-95 peer-checked:shadow-sm">
                <p className="text-xs font-bold">Regular</p>

                <p className="text-[11px] text-[#8C968F] peer-checked:text-white/80 mt-0.5">
                  Standard Patty
                </p>
              </div>
            </label>

            {/* Large */}
            <label className="cursor-pointer group">
              <input
                checked={selectedSize === 40}
                className="peer sr-only"
                name="burger-size"
                type="radio"
                value="40"
                onChange={() => setSelectedSize(40)}
              />

              <div className="p-3 text-center rounded-xl border border-[#E6E0D2] peer-checked:border-[#0F3D2E] peer-checked:bg-[#0F3D2E] peer-checked:text-white transition-all duration-200 bg-white hover:border-[#0F3D2E]/40 transform active:scale-95 peer-checked:shadow-sm">
                <p className="text-xs font-bold">Large</p>

                <p className="text-[11px] text-[#D9A441] peer-checked:text-[#D9A441] mt-0.5 font-medium">
                  +₹40.00
                </p>
              </div>
            </label>

            {/* Monster Double */}
            <label className="cursor-pointer group">
              <input
                checked={selectedSize === 90}
                className="peer sr-only"
                name="burger-size"
                type="radio"
                value="90"
                onChange={() => setSelectedSize(90)}
              />

              <div className="p-3 text-center rounded-xl border border-[#E6E0D2] peer-checked:border-[#0F3D2E] peer-checked:bg-[#0F3D2E] peer-checked:text-white transition-all duration-200 bg-white hover:border-[#0F3D2E]/40 transform active:scale-95 peer-checked:shadow-sm">
                <p className="text-xs font-bold">Monster Double</p>

                <p className="text-[11px] text-[#D9A441] peer-checked:text-[#D9A441] mt-0.5 font-medium">
                  +₹90.00
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Spice Level Selector */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1E2A22] flex items-center justify-between">
            <span>Spice Level</span>

            <span className="text-[#D9A441] text-xs font-normal italic">
              Flame Crafted
            </span>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["mild", "🌿 Mild"],
              ["medium", "🌶️ Medium"],
              ["hot", "🔥 Extra Hot"],
            ].map(([value, label]) => (
              <label className="cursor-pointer" key={value}>
                <input
                  checked={selectedSpice === value}
                  className="peer sr-only"
                  name="spice-level"
                  type="radio"
                  value={value}
                  onChange={() => setSelectedSpice(value)}
                />

                <div className="py-2 px-3 rounded-lg border border-[#E6E0D2] text-center text-xs font-medium peer-checked:bg-[#0F3D2E]/10 peer-checked:border-[#0F3D2E] peer-checked:text-[#0F3D2E] bg-white transition-all active:scale-95">
                  {label}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Add-ons & Customization Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E6E0D2] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E6E0D2]/60 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E2A22]">
              Customize Your Burger
            </span>

            <span className="text-[11px] text-[#8C968F]">
              Optional Add-ons
            </span>
          </div>

          <div className="space-y-2.5 text-sm pt-1">
            {/* Extra Cheddar */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FBF6EC]/60 cursor-pointer transition-colors group">
              <div className="flex items-center space-x-3">
                <input
                  defaultChecked
                  className="w-4 h-4 rounded text-[#0F3D2E] focus:ring-[#0F3D2E] border-[#E6E0D2] transition-transform active:scale-125"
                  type="checkbox"
                  value="30"
                />

                <span className="text-xs sm:text-sm font-medium text-[#1E2A22] transition-colors">
                  Extra Smoked Cheddar Cheese
                </span>
              </div>

              <span className="text-xs font-bold text-[#B88224]">
                +₹30.00
              </span>
            </label>

            {/* Turkey Bacon */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FBF6EC]/60 cursor-pointer transition-colors group">
              <div className="flex items-center space-x-3">
                <input
                  className="w-4 h-4 rounded text-[#0F3D2E] focus:ring-[#0F3D2E] border-[#E6E0D2] transition-transform active:scale-125"
                  type="checkbox"
                  value="45"
                />

                <span className="text-xs sm:text-sm font-medium text-[#1E2A22] transition-colors">
                  Crisp Turkey Bacon Strips
                </span>
              </div>

              <span className="text-xs font-bold text-[#B88224]">
                +₹45.00
              </span>
            </label>

            {/* Special Aioli Dip */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FBF6EC]/60 cursor-pointer transition-colors group">
              <div className="flex items-center space-x-3">
                <input
                  defaultChecked
                  className="w-4 h-4 rounded text-[#0F3D2E] focus:ring-[#0F3D2E] border-[#E6E0D2] transition-transform active:scale-125"
                  type="checkbox"
                  value="20"
                />

                <span className="text-xs sm:text-sm font-medium text-[#1E2A22] transition-colors">
                  House Special Herb Aioli Dip
                </span>
              </div>

              <span className="text-xs font-bold text-[#B88224]">
                +₹20.00
              </span>
            </label>

            {/* Extra Pickles & Jalapenos */}
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FBF6EC]/60 cursor-pointer transition-colors group">
              <div className="flex items-center space-x-3">
                <input
                  className="w-4 h-4 rounded text-[#0F3D2E] focus:ring-[#0F3D2E] border-[#E6E0D2] transition-transform active:scale-125"
                  type="checkbox"
                  value="15"
                />

                <span className="text-xs sm:text-sm font-medium text-[#1E2A22] transition-colors">
                  Extra Jalapeños & Dill Pickles
                </span>
              </div>

              <span className="text-xs font-bold text-[#B88224]">
                +₹15.00
              </span>
            </label>
          </div>
        </div>

        {/* Quantity + CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative">
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between bg-white border-2 border-[#E6E0D2] rounded-full px-3 py-2 w-full sm:w-36 shadow-sm">
            <button
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E2A22] hover:bg-[#FBF6EC] active:scale-90 transition-all focus:outline-none"
              type="button"
              onClick={handleQuantityDecrease}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 12H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </button>

            <span className="font-bold text-base text-[#1E2A22] select-none px-2 transition-transform duration-150 inline-block">
              {quantity}
            </span>

            <button
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E2A22] hover:bg-[#FBF6EC] active:scale-90 transition-all focus:outline-none"
              type="button"
              onClick={handleQuantityIncrease}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </button>
          </div>

          {/* Add To Cart */}
          <button
            className="relative overflow-hidden flex-1 bg-[#0F3D2E] hover:bg-[#144635] active:bg-[#0A291F] text-white font-semibold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.97] group"
            type="button"
            onClick={handleAddToCart}
          >
            {!isAdded ? (
              <>
                <span className="relative z-10 flex items-center gap-2">
                  <span className="tracking-wide">ADD TO CART</span>

                  <span className="text-[#D9A441]">•</span>

                  <span>₹{price.toFixed(2)}</span>
                </span>

                <svg
                  className="relative z-10 w-4 h-4 text-[#D9A441] transform group-hover:translate-x-1.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </>
            ) : (
              <svg
                className="relative z-10 w-5 h-5 text-[#D9A441]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Instant reassurance microcopy */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#8C968F] text-center pt-1">
          <svg
            className="w-4 h-4 text-[#0F3D2E]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>

          <span>
            Freshly assembled immediately upon kitchen confirmation.
          </span>
        </div>
      </form>
    </section>
  );
};

export default ProductInfo;