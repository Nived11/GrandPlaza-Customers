"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";

import {
  addToCartApi,
  getCartApi,
  updateCartApi,
  deleteCartApi,
  clearCartApi,
  checkoutApi,
} from "../api/cartApi";

interface AddToCartData {
  menu_item_id: number;
  variant_id: number | null;
  quantity: number;
}

interface UpdateCartData {
  menu_item_id: number;
  variant_id: number | null;
  quantity: number;
}

interface CheckoutData {
  address_id: number;
}

interface CartMenuItem {
  id: number;
  name: string;
  image: string | null;
  dietary_preference: string;
  has_variants: boolean;
  actual_price: string;
  offer_price: string | null;
  is_available: boolean;
}

interface CartVariant {
  id: number;
  size_name: string;
  actual_price: string;
  offer_price: string;
  is_available: boolean;
}

interface BackendCartItem {
  id: number;
  menu_item: CartMenuItem;
  variant: CartVariant | null;
  quantity: number;
  unit_price: string;
  line_total: string;
  added_at: string;
  updated_at: string;
}

interface BackendCart {
  id: number;
  items: BackendCartItem[];
  total_items: number;
  total_price: string;
  created_at: string;
  updated_at: string;
}

interface CartResponse {
  status: boolean;
  data: BackendCart;
}

const useCartHook = () => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFetchingCart, setIsFetchingCart] = useState(false);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [isDeletingCart, setIsDeletingCart] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (data: AddToCartData) => {
    try {
      setIsAddingToCart(true);

      const response = await addToCartApi(data);

      console.log("ADD TO CART API DATA:", response);

      return response;
    } catch (error: any) {
      console.error("ADD TO CART ERROR:", error);

      const message = extractErrorMessages(error);
      toast.error(message);

      return null;
    } finally {
      setIsAddingToCart(false);
    }
  };

  // =========================
  // GET CART
  // =========================
  const getCart = async (): Promise<CartResponse | null> => {
    try {
      setIsFetchingCart(true);

      const response: CartResponse = await getCartApi();

      console.log("GET CART API DATA:", response);

      return response;
    } catch (error: any) {
      console.error("GET CART ERROR:", error);

      const message = extractErrorMessages(error);
      toast.error(message);

      return null;
    } finally {
      setIsFetchingCart(false);
    }
  };

  // =========================
  // UPDATE CART
  // =========================
  const updateCart = async (data: UpdateCartData) => {
    try {
      setIsUpdatingCart(true);

      const response = await updateCartApi(data);

      console.log("UPDATE CART API DATA:", response);

      return response;
    } catch (error: any) {
      console.error("UPDATE CART ERROR:", error);

      const message = extractErrorMessages(error);
      toast.error(message);

      return null;
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // =========================
  // DELETE CART ITEM
  // =========================
  const deleteCart = async (menuItemId: number) => {
    try {
      setIsDeletingCart(true);

      const response = await deleteCartApi(menuItemId);

      console.log("DELETE CART API DATA:", response);

      return response;
    } catch (error: any) {
      console.error("DELETE CART ERROR:", error);

      const message = extractErrorMessages(error);
      toast.error(message);

      return null;
    } finally {
      setIsDeletingCart(false);
    }
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = async () => {
    try {
      setIsClearingCart(true);

      const response = await clearCartApi();

      console.log("CLEAR CART API DATA:", response);

      return response;
    } catch (error: any) {
      console.error("CLEAR CART ERROR:", error);

      const message = extractErrorMessages(error);
      toast.error(message);

      return null;
    } finally {
      setIsClearingCart(false);
    }
  };

  // =========================
  // CHECKOUT
  // =========================
  const checkout = async (data: CheckoutData) => {
    try {
      setIsCheckingOut(true);

      const response = await checkoutApi(data);

      console.log("CHECKOUT API DATA:", response);

      return response;
    } catch (error: any) {
      console.error("CHECKOUT ERROR:", error);

      const message = extractErrorMessages(error);
      toast.error(message);

      return null;
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    addToCart,
    getCart,
    updateCart,
    deleteCart,
    clearCart,
    checkout,

    isAddingToCart,
    isFetchingCart,
    isUpdatingCart,
    isDeletingCart,
    isClearingCart,
    isCheckingOut,
  };
};

export default useCartHook;