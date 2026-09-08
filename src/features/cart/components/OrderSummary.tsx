"use client";

import React, { useState } from "react";

const OrderSummary = () => {
  const [promoCode, setPromoCode] = useState("EMPIRE50");

  return (
    <section
      aria-labelledby="order-summary-heading"
      className="lg:col-span-4 lg:sticky lg:top-28 space-y-6"
    >
      <h2 className="sr-only" id="order-summary-heading">
        Order Bill Summary
      </h2>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-warm-lg border border-amber-100/70 p-6 space-y-5">
        {/* Summary Card Header */}
        <div className="flex items-center justify-between border-b border-[#0F3D2E]/10 pb-3">
          <h3 className="font-serif font-bold text-xl text-[#0F3D2E] flex items-center gap-2">
            <span className="text-[#D9A441]">✦</span>
            Order Summary
          </h3>

          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FBF6EC] text-[#0F3D2E] border border-[#0F3D2E]/10">
            Malappuram Store
          </span>
        </div>

        {/* Promo Code Input Field */}
        <div className="space-y-1.5" data-purpose="promo-section">
          <label
            className="text-xs font-semibold text-[#0F3D2E]"
            htmlFor="promo-input"
          >
            Have a Promo Coupon?
          </label>

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <svg
                className="w-4 h-4 text-[#D9A441] absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>

              <input
                className="w-full bg-[#FBF6EC]/50 border border-[#0F3D2E]/15 rounded-full pl-9 pr-3 py-2 text-xs font-medium text-[#0F3D2E] uppercase tracking-wider focus:ring-1 focus:ring-[#D9A441] focus:border-[#D9A441]"
                id="promo-input"
                placeholder="Enter coupon code"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>

            <button
              className="px-4 py-2 bg-[#0F3D2E] text-white rounded-full text-xs font-bold hover:bg-[#165742] hover:text-[#D9A441] transition shrink-0 shadow-sm"
              type="button"
            >
              Apply
            </button>
          </div>

          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium pt-0.5">
            <svg
              className="w-3.5 h-3.5 text-emerald-600 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                fillRule="evenodd"
              />
            </svg>

            <span>
              Coupon <strong>EMPIRE50</strong> applied successfully!
            </span>
          </div>
        </div>

        {/* Price Breakdown Table */}
        <div className="space-y-3 text-xs pt-2 border-t border-[#0F3D2E]/5">
          <div className="flex justify-between text-[#1E2A22]/75">
            <span>Items Subtotal</span>
            <span className="font-medium text-[#0F3D2E]">
              ₹670.00
            </span>
          </div>

          <div className="flex justify-between items-center text-[#1E2A22]/75">
            <span className="flex items-center gap-1.5">
              Delivery Fee (4.2 km)
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                Save ₹15
              </span>
            </span>

            <span className="font-medium text-[#0F3D2E]">
              ₹30.00
            </span>
          </div>

          <div className="flex justify-between text-[#1E2A22]/75">
            <span className="flex items-center gap-1">
              Taxes &amp; Eco Packaging

              <svg
                className="w-3 h-3 text-[#1E2A22]/40 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>

            <span className="font-medium text-[#0F3D2E]">
              ₹35.00
            </span>
          </div>

          <div className="flex justify-between text-[#D9A441] font-semibold">
            <span className="flex items-center gap-1">
              <span>✦</span>
              Promo Discount (EMPIRE50)
            </span>

            <span>-₹50.00</span>
          </div>

          {/* Grand Total */}
          <div className="border-t-2 border-dashed border-[#0F3D2E]/10 pt-3 flex justify-between items-baseline">
            <div>
              <span className="text-sm font-serif font-bold text-[#0F3D2E]">
                Total Payable
              </span>

              <p className="text-[10px] text-[#1E2A22]/50">
                Includes all GST &amp; charges
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-serif font-bold text-[#0F3D2E] tracking-tight">
                ₹685.00
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Primary Button */}
        <div className="pt-2">
          <button
            className="w-full py-3.5 px-6 rounded-full bg-[#0F3D2E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:bg-[#165742] hover:shadow-xl transition-all duration-200 transform active:scale-[0.99] group border border-[#D9A441]/30"
            type="button"
          >
            <svg
              className="w-4 h-4 text-[#D9A441] group-hover:scale-110 transition shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>

            <span>PROCEED TO CHECKOUT</span>

            <span className="text-[#D9A441] text-base leading-none group-hover:translate-x-1 transition">
              →
            </span>
          </button>
        </div>

        {/* Trust & Quality Badges */}
        <div className="border-t border-[#0F3D2E]/5 pt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-[#FBF6EC]/40">
            <span className="text-sm block mb-0.5">🛡️</span>
            <span className="text-[10px] font-semibold text-[#0F3D2E] leading-tight block">
              100% Hygienic
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#FBF6EC]/40">
            <span className="text-sm block mb-0.5">⚡</span>
            <span className="text-[10px] font-semibold text-[#0F3D2E] leading-tight block">
              30 Min Delivery
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#FBF6EC]/40">
            <span className="text-sm block mb-0.5">🔥</span>
            <span className="text-[10px] font-semibold text-[#0F3D2E] leading-tight block">
              Hot Thermal Pack
            </span>
          </div>
        </div>
      </div>

      {/* Safe Checkout Reassurance */}
      <div className="text-center text-xs text-[#1E2A22]/60 flex items-center justify-center space-x-2">
        <svg
          className="w-4 h-4 text-[#0F3D2E]/70"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            fillRule="evenodd"
          />
        </svg>

        <span>Guaranteed Safe &amp; Secure Checkout</span>
      </div>
    </section>
  );
};

export default OrderSummary;