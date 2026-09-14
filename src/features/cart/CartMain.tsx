"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/redux/store";
import { setCart } from "@/redux/slices/cartSlice";

import CartBreadcrumb from "./components/CartBreadcrumb";
import CartItems from "./components/CartItems";
import CookingInstructions from "./components/CookingInstructions";
import AddMoreDishes from "./components/AddMoreDishes";
import OrderSummary from "./components/OrderSummary";
import PopularAddons from "./components/PopularAddons";

import useCartHook from "./hook/useCartHook";

const CartMain = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const {
    addToCart,
    getCart,
    isFetchingCart,
  } = useCartHook();

  useEffect(() => {
    const syncCart = async () => {
      /*
       * Check whether the user is logged in.
       */
      const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

      /*
       * GUEST USER
       *
       * Do not call GET /orders/cart because
       * the API requires authentication.
       *
       * Redux Persist will keep the guest cart.
       */
      if (!isLoggedIn) {
        return;
      }

      /*
       * LOGGED-IN USER
       *
       * Find products that were added while
       * the user was logged out.
       *
       * Guest cart items have:
       * cart_item_id = 0
       */
      const guestItems = cartItems.filter(
        (item) => item.cart_item_id === 0
      );

      try {
        /*
         * SYNC GUEST CART TO BACKEND
         *
         * Send every guest item to the backend.
         * This supports multiple products.
         */
        for (const item of guestItems) {
          const response = await addToCart({
            menu_item_id: item.id,
            variant_id: item.variant?.id ?? null,
            quantity: item.quantity,
          });

          /*
           * If an item fails to synchronize,
           * stop the synchronization.
           */
          if (!response?.status) {
            console.error(
              "Failed to sync cart item:",
              item.name
            );

            return;
          }
        }

        /*
         * GET THE REAL BACKEND CART
         *
         * After syncing guest items, fetch the
         * authenticated user's complete cart.
         */
        const response = await getCart();

        if (
          response?.status === true &&
          response?.data
        ) {
          const backendItems =
            response.data.items ?? [];

          /*
           * Convert backend cart data into
           * the Redux CartItem structure.
           */
          const syncedCartItems = backendItems.map(
            (item) => {
              const unitPrice = Number(
                item.unit_price
              );

              return {
                /*
                 * Backend CartItem ID.
                 *
                 * PATCH and DELETE use this ID.
                 */
                cart_item_id: item.id,

                /*
                 * Menu item ID.
                 */
                id: item.menu_item.id,

                name: item.menu_item.name,

                description: "",

                image:
                  item.menu_item.image ?? null,

                dietary_preference:
                  item.menu_item.dietary_preference,

                has_variants:
                  item.menu_item.has_variants,

                actual_price:
                  item.menu_item.actual_price ?? null,

                offer_price:
                  item.menu_item.offer_price ?? null,

                variant: item.variant
                  ? {
                      id: item.variant.id,
                      size_name:
                        item.variant.size_name,
                      actual_price:
                        item.variant.actual_price,
                      offer_price:
                        item.variant.offer_price,
                      is_available:
                        item.variant.is_available,
                    }
                  : null,

                quantity: item.quantity,

                unit_price: unitPrice,

                total_price:
                  unitPrice * item.quantity,
              };
            }
          );

          /*
           * Replace the temporary guest Redux cart
           * with the real backend cart.
           */
          dispatch(
            setCart(syncedCartItems)
          );
        }
      } catch (error) {
        console.error(
          "CART SYNC ERROR:",
          error
        );
      }
    };

    syncCart();

    /*
     * Run only when CartMain mounts.
     *
     * This prevents the synchronization from
     * running repeatedly.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#FBF6EC] text-[#1E2A22] min-h-screen flex flex-col antialiased">
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 sm:px-12 py-8 relative">

        {/* Decorative subtle botanical background elements */}
        <div className="absolute top-10 left-4 w-32 h-32 opacity-5 pointer-events-none text-[#0F3D2E]">
          <svg
            fill="currentColor"
            viewBox="0 0 100 100"
          >
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
              {isFetchingCart
                ? "Loading your cart..."
                : "Your freshly prepped items in your basket"}
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