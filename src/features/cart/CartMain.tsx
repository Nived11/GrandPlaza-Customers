"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import type { RootState, AppDispatch } from "@/redux/store";
import { setCart } from "@/redux/slices/cartSlice";

import CartItems from "./components/CartItems";
import OrderSummary from "./components/OrderSummary";
import useCartHook from "./hook/useCartHook";

const CartMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { mergeCart, getCart } = useCartHook();

  useEffect(() => {
    const syncCart = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn) {
        return;
      }

      const guestItems = cartItems.filter((item) => item.cart_item_id === 0);

      try {
        let response = null;

        if (guestItems.length > 0) {
          const itemsPayload = guestItems.map((item) => ({
            menu_item_id: item.id,
            variant_id: item.variant?.id ?? null,
            quantity: item.quantity,
          }));

          response = await mergeCart(itemsPayload);
        } else {
          response = await getCart();
        }

        if (response?.status === true && response?.data) {
          const backendItems = response.data.items ?? [];

          const syncedCartItems = backendItems.map((item) => {
            const unitPrice = Number(item.unit_price);

            return {
              cart_item_id: item.id,
              id: item.menu_item.id,
              name: item.menu_item.name,
              description: "",
              image: item.menu_item.image ?? null,
              dietary_preference: item.menu_item.dietary_preference,
              has_variants: item.menu_item.has_variants,
              actual_price: item.menu_item.actual_price ?? null,
              offer_price: item.menu_item.offer_price ?? null,
              variant: item.variant
                ? {
                    id: item.variant.id,
                    size_name: item.variant.size_name,
                    actual_price: item.variant.actual_price,
                    offer_price: item.variant.offer_price,
                    is_available: item.variant.is_available,
                  }
                : null,
              quantity: item.quantity,
              unit_price: unitPrice,
              total_price: unitPrice * item.quantity,
            };
          });

          dispatch(setCart(syncedCartItems));
        }
      } catch (error) {
        console.error("CART SYNC ERROR:", error);
      }
    };

    syncCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1E2A22] antialiased relative overflow-hidden pb-24 md:pb-16">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-5 sm:py-8 relative z-10">
        
        {/* DESKTOP BREADCRUMB (Hidden on mobile) */}
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center text-xs font-medium text-gray-500 mb-5 space-x-2">
          <Link href="/" className="hover:text-[#0F3D2E] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#0F3D2E] font-semibold">Cart</span>
        </nav>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-5 gap-4 border-b border-gray-200/60">
          {/* Left: Title & Subtitle */}
          <div>
            {/* Mobile Back Button + Title */}
            <div className="flex items-center gap-3 md:block">
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="md:hidden p-1.5 -ml-1 text-slate-800 hover:text-[#0F3D2E] transition active:scale-95"
              >
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3D2E] tracking-tight">
                <span className="md:hidden">My Cart</span>
                <span className="hidden md:inline">Your Cart</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1 ml-9 md:ml-0">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>

        {/* MAIN CART LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-8">
            <CartItems />
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartMain;