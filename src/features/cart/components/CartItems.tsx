"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart as clearCartRedux,
  CartItem,
} from "@/redux/slices/cartSlice";

import useCartHook from "../hook/useCartHook";

const CartItems = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const {
    updateCart,
    deleteCart,
    clearCart,
    isUpdatingCart,
    isDeletingCart,
    isClearingCart,
  } = useCartHook();
  const [deletingItemId, setDeletingItemId] =
    useState<number | null>(null);

  const [showClearCartModal, setShowClearCartModal] =
    useState(false);

  const [clearCartError, setClearCartError] = useState("");
  const isUserLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  // Increase Quantity
  const handleIncrease = async (item: CartItem) => {
    if (item.quantity >= 20 || isUpdatingCart) {
      return;
    }

    /*
     * GUEST USER
     *
     * Do not call the backend.
     * Redux is the cart source.
     */
    if (!isUserLoggedIn()) {
      dispatch(
        increaseQuantity({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );

      return;
    }

    /*
     * LOGGED-IN USER
     *
     * Update backend first.
     * Update Redux only after API success.
     */
    const newQuantity = item.quantity + 1;

    const response = await updateCart({
      menu_item_id: item.cart_item_id,
      variant_id: item.variant?.id ?? null,
      quantity: newQuantity,
    });

    if (response) {
      dispatch(
        increaseQuantity({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );
    }
  };

  // Decrease Quantity
  const handleDecrease = async (item: CartItem) => {
    if (isUpdatingCart) {
      return;
    }

    const newQuantity = item.quantity - 1;

    if (newQuantity < 1) {
      return;
    }

    /*
     * GUEST USER
     *
     * Do not call the backend.
     * Update Redux only.
     */
    if (!isUserLoggedIn()) {
      dispatch(
        decreaseQuantity({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );

      return;
    }

    /*
     * LOGGED-IN USER
     *
     * Backend first.
     * Redux only after successful API response.
     */
    const response = await updateCart({
      menu_item_id: item.cart_item_id,
      variant_id: item.variant?.id ?? null,
      quantity: newQuantity,
    });

    if (response) {
      dispatch(
        decreaseQuantity({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );
    }
  };

  const handleRemove = async (item: CartItem) => {
    if (isDeletingCart) {
      return;
    }

    /*
     * GUEST USER
     *
     * No API call.
     * Remove directly from Redux.
     */
    if (!isUserLoggedIn()) {
      dispatch(
        removeFromCart({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );

      return;
    }

    /*
     * LOGGED-IN USER
     *
     * Backend first.
     * Redux only after successful API response.
     */
    setDeletingItemId(item.cart_item_id);

    try {
      const response = await deleteCart(
        item.cart_item_id
      );

      if (response) {
        dispatch(
          removeFromCart({
            id: item.id,
            variantId: item.variant?.id ?? null,
          })
        );
      }
    } finally {
      setDeletingItemId(null);
    }
  };

  // Open Clear Cart Modal
  const handleOpenClearCartModal = () => {
    if (isClearingCart || cartItems.length === 0) {
      return;
    }

    setClearCartError("");
    setShowClearCartModal(true);
  };

  // Close Clear Cart Modal
  const handleCloseClearCartModal = () => {
    if (isClearingCart) {
      return;
    }

    setClearCartError("");
    setShowClearCartModal(false);
  };

  // Clear Cart
  const handleClearCart = async () => {
    if (
      isClearingCart ||
      cartItems.length === 0
    ) {
      return;
    }
  
    setClearCartError("");
  
    /*
     * GUEST USER
     *
     * No backend API.
     * Clear Redux directly.
     */
    if (!isUserLoggedIn()) {
      dispatch(clearCartRedux());
      setShowClearCartModal(false);
      setClearCartError("");
    
      return;
    }
  
    /*
     * LOGGED-IN USER
     *
     * Clear backend first.
     * Clear Redux only after successful API response.
     */
    const response = await clearCart();
  
    if (response) {
      dispatch(clearCartRedux());
      setShowClearCartModal(false);
      setClearCartError("");
    } else {
      setClearCartError(
        "Unable to clear your cart. Please try again."
      );
    }
  };

  return (
    <section
      aria-labelledby="cart-items-heading"
      className="lg:col-span-8 space-y-6"
    >
      <h2 className="sr-only" id="cart-items-heading">
        Cart Items
      </h2>

      {/* Cart Line Items Card Container */}
      <div className="bg-white rounded-2xl shadow-warm-md border border-[#0F3D2E]/5 overflow-hidden">
        {/* Card Header Bar */}
        <div className="px-6 py-4 bg-[#FBF6EC]/50 border-b border-[#0F3D2E]/5 flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#0F3D2E]/80">
          <span>Dish Description</span>

          <div className="flex items-center space-x-4 sm:space-x-8">
            <span className="hidden sm:inline">Quantity</span>

            <span>Total Price</span>

            <button
              type="button"
              onClick={handleOpenClearCartModal}
              disabled={
                isClearingCart || cartItems.length === 0
              }
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-3xl mb-3">🛒</div>

            <h3 className="text-base font-serif font-bold text-[#0F3D2E]">
              Your cart is empty
            </h3>

            <p className="text-xs text-[#1E2A22]/55 mt-1">
              Add some delicious dishes to continue.
            </p>
          </div>
        ) : (
          /* Cart Items */
          cartItems.map((item) => (
            <article
              key={`${item.id}-${item.variant?.id ?? "default"}`}
              className="p-6 border-b border-[#0F3D2E]/5 hover:bg-[#FBF6EC]/20 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 last:border-b-0"
              data-purpose="cart-item"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                {/* Dish Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FBF6EC] shrink-0 border border-[#0F3D2E]/10 shadow-sm relative">
                  {item.image ? (
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover"
                      src={item.image}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#0F3D2E]/30 text-xs">
                      No Image
                    </div>
                  )}

                  <span className="absolute top-1 left-1 bg-[#0F3D2E] text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {item.dietary_preference || "Dish"}
                  </span>
                </div>

                {/* Item Info */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#0F3D2E] hover:text-[#D9A441] transition">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#1E2A22]/65 leading-relaxed max-w-sm">
                    {item.description}
                  </p>

                  {item.variant && (
                    <p className="text-[11px] text-[#0F3D2E]/60 font-medium">
                      Size: {item.variant.size_name}
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                      onClick={() => handleRemove(item)}
                      disabled={
                        isDeletingCart && deletingItemId === item.cart_item_id
                      }
                    >
                      {isDeletingCart && deletingItemId === item.cart_item_id ? (
                        <svg
                          className="w-3.5 h-3.5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      )}

                      {isDeletingCart && deletingItemId === item.cart_item_id
                        ? "Removing..."
                        : "Remove"}
                    </button>

                    <span className="text-xs text-[#1E2A22]/30">
                      •
                    </span>

                    <button
                      className="text-xs text-[#0F3D2E]/70 hover:text-[#D9A441] transition underline"
                      type="button"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>

              {/* Stepper and Price */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto sm:space-x-12">
                {/* Stepper */}
                <div className="flex items-center space-x-2 border border-[#0F3D2E]/15 rounded-full px-2 py-1 bg-[#FBF6EC]/30">
                  <button
                    aria-label="Decrease quantity"
                    className="stepper-btn w-6 h-6 rounded-full border border-[#0F3D2E]/20 flex items-center justify-center text-xs text-[#0F3D2E] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    onClick={() => handleDecrease(item)}
                    disabled={isUpdatingCart}
                  >
                    −
                  </button>

                  <span
                    aria-live="polite"
                    className="text-sm font-bold text-[#0F3D2E] w-5 text-center"
                  >
                    {item.quantity}
                  </span>

                  <button
                    aria-label="Increase quantity"
                    className="stepper-btn w-6 h-6 rounded-full border border-[#0F3D2E]/20 flex items-center justify-center text-xs text-[#0F3D2E] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    onClick={() => handleIncrease(item)}
                    disabled={
                      isUpdatingCart || item.quantity >= 20
                    }
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-[#D9A441] font-serif">
                    ₹{item.total_price.toFixed(2)}
                  </div>

                  {item.actual_price && (
                    <div className="text-[11px] text-[#1E2A22]/40 line-through">
                      ₹
                      {(
                        Number(item.actual_price) *
                        item.quantity
                      ).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearCartModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-cart-title"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#1E2A22]/40"
            onClick={handleCloseClearCartModal}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-warm-md border border-[#0F3D2E]/10 overflow-hidden">
            <div className="p-6 sm:p-7">
              {/* Icon */}
              <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h3
                id="clear-cart-title"
                className="text-lg sm:text-xl font-serif font-bold text-[#0F3D2E]"
              >
                Clear your cart?
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-[#1E2A22]/65 leading-relaxed">
                Are you sure you want to remove all items
                from your cart? This action cannot be undone.
              </p>

              {/* Error */}
              {clearCartError && (
                <p
                  className="mt-4 text-xs font-medium text-rose-600"
                  role="alert"
                >
                  {clearCartError}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCloseClearCartModal}
                  disabled={isClearingCart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#0F3D2E]/15 text-sm font-semibold text-[#0F3D2E] hover:bg-[#FBF6EC] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                {/* Clear Cart */}
                <button
                  type="button"
                  onClick={handleClearCart}
                  disabled={isClearingCart}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0F3D2E] text-white text-sm font-semibold hover:bg-[#0F3D2E]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClearingCart
                    ? "Clearing..."
                    : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartItems;