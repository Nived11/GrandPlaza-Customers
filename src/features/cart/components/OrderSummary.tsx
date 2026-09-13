"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import useCartHook from "../hook/useCartHook";

const GST_RATE = 0.18;

const OrderSummary = () => {
  const router = useRouter();

  const { addToCart, getCart } = useCartHook();

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.total_price,
    0
  );

  const gstAmount = itemsTotal * GST_RATE;

  const totalPayable = itemsTotal + gstAmount;

  const handleCheckout = async () => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.push("/login?redirect=/cart");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    try {
      setIsCheckoutLoading(true);

      /*
       * Send every Redux cart item to backend
       */
      for (const item of cartItems) {
        const response = await addToCart({
          menu_item_id: item.id,
          variant_id: item.variant?.id ?? null,
          quantity: item.quantity,
        });

        if (!response?.status) {
          throw new Error(
            response?.message || "Failed to add item to cart."
          );
        }
      }

      /*
       * Get the latest cart from backend
       * only after all items are successfully added.
       */
      const cartResponse = await getCart();

      if (!cartResponse?.status) {
        throw new Error(
          cartResponse?.message || "Failed to fetch cart."
        );
      }

      /*
       * Cart is successfully synchronized.
       * Address page will be implemented next.
       */
      router.push("/address");
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

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

        {/* Price Breakdown */}
        <div className="space-y-3 text-xs pt-2">

          {/* Items Total */}
          <div className="flex justify-between text-[#1E2A22]/75">
            <span>Items Total</span>

            <span className="font-medium text-[#0F3D2E]">
              ₹{itemsTotal.toFixed(2)}
            </span>
          </div>

          {/* GST */}
          <div className="flex justify-between text-[#1E2A22]/75">
            <span>GST (18%)</span>

            <span className="font-medium text-[#0F3D2E]">
              ₹{gstAmount.toFixed(2)}
            </span>
          </div>

          {/* Grand Total */}
          <div className="border-t-2 border-dashed border-[#0F3D2E]/10 pt-3 flex justify-between items-baseline">
            <div>
              <span className="text-sm font-serif font-bold text-[#0F3D2E]">
                Total Payable
              </span>

              <p className="text-[10px] text-[#1E2A22]/50">
                Includes 18% GST
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-serif font-bold text-[#0F3D2E] tracking-tight">
                ₹{totalPayable.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Primary Button */}
        <div className="pt-2">
          <button
            className="w-full py-3.5 px-6 rounded-full bg-[#0F3D2E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:bg-[#165742] hover:shadow-xl transition-all duration-200 transform active:scale-[0.99] group border border-[#D9A441]/30 disabled:opacity-70 disabled:cursor-not-allowed"
            type="button"
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
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

            <span>
              {isCheckoutLoading
                ? "PROCESSING..."
                : "PROCEED TO CHECKOUT"}
            </span>

            {!isCheckoutLoading && (
              <span className="text-[#D9A441] text-base leading-none group-hover:translate-x-1 transition">
                →
              </span>
            )}
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