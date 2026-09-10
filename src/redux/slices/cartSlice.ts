import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartVariant {
  id: number;
  size_name: string;
  actual_price: string;
  offer_price: string;
  is_available: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string | null;
  dietary_preference: string;

  has_variants: boolean;

  actual_price: string | null;
  offer_price: string | null;

  variant: CartVariant | null;

  quantity: number;

  // Calculated numeric values used by cart totals
  unit_price: number;
  total_price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.variant?.id === newItem.variant?.id
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + newItem.quantity,
          20
        );

        existingItem.total_price =
          existingItem.unit_price *
          existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: Math.min(newItem.quantity, 20),
          total_price:
            newItem.unit_price *
            Math.min(newItem.quantity, 20),
        });
      }
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        variantId?: number | null;
      }>
    ) => {
      const { id, variantId } = action.payload;

      const item = state.items.find(
        (cartItem) =>
          cartItem.id === id &&
          cartItem.variant?.id === variantId
      );

      if (!item) return;

      if (item.quantity < 20) {
        item.quantity += 1;

        item.total_price =
          item.unit_price * item.quantity;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        variantId?: number | null;
      }>
    ) => {
      const { id, variantId } = action.payload;

      const itemIndex = state.items.findIndex(
        (cartItem) =>
          cartItem.id === id &&
          cartItem.variant?.id === variantId
      );

      if (itemIndex === -1) return;

      const item = state.items[itemIndex];

      if (item.quantity > 1) {
        item.quantity -= 1;

        item.total_price =
          item.unit_price * item.quantity;
      } else {
        state.items.splice(itemIndex, 1);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        id: number;
        variantId?: number | null;
      }>
    ) => {
      const { id, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === id &&
            item.variant?.id === variantId
          )
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;