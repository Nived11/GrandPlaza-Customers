"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Minus, ArrowLeft, Loader2, ShoppingBag } from "lucide-react";

import type { RootState, AppDispatch } from "@/redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  CartItem,
} from "@/redux/slices/cartSlice";

import useCartHook from "../hook/useCartHook";

const CartItems = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { updateCart, deleteCart, isUpdatingCart, isDeletingCart } = useCartHook();

  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

  const isUserLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  // Increase Quantity
  const handleIncrease = async (item: CartItem) => {
    if (item.quantity >= 20 || isUpdatingCart) {
      return;
    }

    if (!isUserLoggedIn()) {
      dispatch(
        increaseQuantity({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );
      return;
    }

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

    if (!isUserLoggedIn()) {
      dispatch(
        decreaseQuantity({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );
      return;
    }

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

  // Remove Item
  const handleRemove = async (item: CartItem) => {
    if (isDeletingCart) {
      return;
    }

    if (!isUserLoggedIn()) {
      dispatch(
        removeFromCart({
          id: item.id,
          variantId: item.variant?.id ?? null,
        })
      );
      return;
    }

    setDeletingItemId(item.cart_item_id);

    try {
      const response = await deleteCart(item.cart_item_id);
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

  // EMPTY CART STATE
  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-gray-100/90">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0F3D2E]">
          <ShoppingBag size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Your cart is empty</h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          Explore our menu and add your favorite dishes to get started!
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0F3D2E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#165742] transition shadow-sm"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 📱 MOBILE VIEW: Clean Individual Cards (matches mobile screenshot) */}
      <div className="md:hidden space-y-3">
        {cartItems.map((item) => {
          const isItemDeleting = isDeletingCart && deletingItemId === item.cart_item_id;

          return (
            <div
              key={`${item.id}-${item.variant?.id ?? "default"}`}
              className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100/90 flex items-center justify-between gap-3"
            >
              {/* Thumbnail + Name & Price */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                      No img
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 truncate">
                    {item.name}
                  </h3>
                  {item.variant && (
                    <p className="text-[11px] text-gray-400 font-medium">
                      Size: {item.variant.size_name}
                    </p>
                  )}
                  <p className="text-sm font-bold text-[#0F3D2E] mt-0.5">
                    ₹{item.unit_price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Stepper & Trash Icon */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Stepper Pill */}
                <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity <= 1 || isUpdatingCart}
                    aria-label="Decrease quantity"
                    className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-slate-900 disabled:opacity-30 active:scale-90"
                  >
                    <Minus size={13} strokeWidth={2.5} />
                  </button>

                  <span className="w-6 text-center text-xs font-bold text-slate-800 select-none">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleIncrease(item)}
                    disabled={item.quantity >= 20 || isUpdatingCart}
                    aria-label="Increase quantity"
                    className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-slate-900 disabled:opacity-30 active:scale-90"
                  >
                    <Plus size={13} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Trash Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  disabled={isItemDeleting}
                  aria-label="Remove item"
                  className="p-1 text-gray-400 hover:text-red-500 transition active:scale-90 disabled:opacity-40"
                >
                  {isItemDeleting ? (
                    <Loader2 size={16} className="animate-spin text-red-500" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🖥️ DESKTOP VIEW: Unified Table Card (matches desktop screenshot) */}
      <div className="hidden md:block bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100/90">
        {/* Table Header */}
        <div className="grid grid-cols-12 pb-4 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* Item Rows */}
        <div className="divide-y divide-gray-100">
          {cartItems.map((item) => {
            const isItemDeleting = isDeletingCart && deletingItemId === item.cart_item_id;

            return (
              <div
                key={`${item.id}-${item.variant?.id ?? "default"}`}
                className="grid grid-cols-12 items-center py-5 gap-4"
              >
                {/* Item Details */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-base leading-snug">
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p className="text-xs text-gray-400 font-medium">
                        Size: {item.variant.size_name}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      disabled={isItemDeleting}
                      className="mt-1 text-xs text-gray-400 hover:text-red-600 transition flex items-center gap-1 font-medium disabled:opacity-40"
                    >
                      {isItemDeleting ? (
                        <Loader2 size={13} className="animate-spin text-red-500" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                      <span>{isItemDeleting ? "Removing..." : "Remove"}</span>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center font-semibold text-slate-800 text-sm">
                  ₹{item.unit_price.toFixed(2)}
                </div>

                {/* Quantity Stepper */}
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleDecrease(item)}
                      disabled={item.quantity <= 1 || isUpdatingCart}
                      aria-label="Decrease quantity"
                      className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-slate-900 disabled:opacity-30 active:scale-90"
                    >
                      <Minus size={13} strokeWidth={2.5} />
                    </button>

                    <span className="w-7 text-center text-xs font-bold text-slate-800 select-none">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleIncrease(item)}
                      disabled={item.quantity >= 20 || isUpdatingCart}
                      aria-label="Increase quantity"
                      className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-slate-900 disabled:opacity-30 active:scale-90"
                    >
                      <Plus size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right font-bold text-slate-800 text-base">
                  ₹{item.total_price.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping Link at bottom of card */}
        <div className="pt-5 border-t border-gray-100 mt-2">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F3D2E] hover:text-[#165742] transition"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;