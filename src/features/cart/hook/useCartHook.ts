"use client";

import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { addToCartApi, getCartApi } from "../api/cartApi";

interface AddToCartData {
  menu_item_id: number;
  variant_id: number | null;
  quantity: number;
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

  return {
    addToCart,
    getCart,
    isAddingToCart,
    isFetchingCart,
  };
};

export default useCartHook;