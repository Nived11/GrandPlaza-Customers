"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import type {
  AppDispatch,
  RootState,
} from "@/redux/store";

import {
  addToCart,
  setCart,
} from "@/redux/slices/cartSlice";

import useCartHook from "@/features/cart/hook/useCartHook";

import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

import {
  getDisplayPrice,
  isOrderable,
} from "../utils/menuUtils";

interface MenuItemCardProps {
  item: HomeMenuItem;
  onOpen: (item: HomeMenuItem) => void;
}

const MenuItemCard = ({
  item,
  onOpen,
}: MenuItemCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const {
    addToCart: addToCartApi,
    getCart,
  } = useCartHook();

  /*
   * =====================================================
   * DISPLAY PRICE
   * =====================================================
   */

  const {
    price,
    original: displayOriginal,
  } = getDisplayPrice(item);

  /*
   * =====================================================
   * DISCOUNT CALCULATION
   * =====================================================
   */

  const actualPrice =
    item.actual_price !== null
      ? Number(item.actual_price)
      : null;

  const offerPrice =
    item.offer_price !== null
      ? Number(item.offer_price)
      : null;

  const hasDiscount =
    actualPrice !== null &&
    offerPrice !== null &&
    Number.isFinite(actualPrice) &&
    Number.isFinite(offerPrice) &&
    actualPrice > 0 &&
    offerPrice > 0 &&
    offerPrice < actualPrice;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((actualPrice - offerPrice) /
          actualPrice) *
          100
      )
    : 0;

  /*
   * =====================================================
   * ORDERABLE
   * =====================================================
   */

  const orderable = isOrderable(item);

  /*
   * =====================================================
   * ADD TO CART
   *
   * SAME LOGIC AS HOME PAGE
   * =====================================================
   */

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    /*
     * Prevent the card click from opening
     * the product modal.
     */
    e.stopPropagation();

    /*
     * Do not add unavailable products.
     */
    if (!orderable) {
      toast.error(
        `${item.name} is currently unavailable`
      );
      return;
    }

    /*
     * =================================================
     * MULTIPLE VARIANTS
     *
     * Example:
     * Half / Full
     * Small / Medium / Large
     *
     * Open Quick View so the user can choose.
     * =================================================
     */

    if (
      item.has_variants &&
      item.variants &&
      item.variants.length > 1
    ) {
      onOpen(item);
      return;
    }

    /*
     * =================================================
     * FIND FIRST AVAILABLE VARIANT
     * =================================================
     */

    const selectedVariant =
      item.variants?.find(
        (variant) => variant.is_available
      ) ?? null;

    /*
     * Product requires variant selection
     * but no available variant exists.
     */
    if (
      item.has_variants &&
      !selectedVariant
    ) {
      onOpen(item);
      return;
    }

    /*
     * =================================================
     * EXISTING CART ITEM
     *
     * Used for the maximum quantity check.
     * =================================================
     */

    const existingCartItem =
      cartItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          (cartItem.variant?.id ?? null) ===
            (selectedVariant?.id ?? null)
      );

    /*
     * =================================================
     * MAXIMUM 20 ITEMS
     * =================================================
     */

    if (
      existingCartItem &&
      existingCartItem.quantity >= 20
    ) {
      toast.error(
        `Maximum limit of 20 reached for ${item.name}`
      );
      return;
    }

    /*
     * =================================================
     * GET UNIT PRICE
     * =================================================
     */

    const priceValue = item.has_variants
      ? selectedVariant?.offer_price ||
        selectedVariant?.actual_price
      : item.offer_price ||
        item.actual_price;

    const unitPrice = Number(
      priceValue || 0
    );

    /*
     * If the price cannot be determined,
     * open the Quick View instead.
     */
    if (unitPrice <= 0) {
      onOpen(item);
      return;
    }

    /*
     * =================================================
     * LOGIN CHECK
     * =================================================
     */

    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem(
        "isLoggedIn"
      ) === "true";

    /*
     * =================================================
     * 1. OPTIMISTIC REDUX UPDATE
     *
     * Same as Home page.
     * UI updates immediately.
     * =================================================
     */

    dispatch(
      addToCart({
        cart_item_id:
          existingCartItem?.cart_item_id ?? 0,

        id: item.id,

        name: item.name,

        description:
          item.description || "",

        image:
          item.image ?? null,

        dietary_preference:
          item.dietary_preference,

        has_variants:
          item.has_variants,

        actual_price:
          item.has_variants
            ? selectedVariant?.actual_price ??
              null
            : item.actual_price ?? null,

        offer_price:
          item.has_variants
            ? selectedVariant?.offer_price ??
              null
            : item.offer_price ?? null,

        variant: selectedVariant
          ? {
              id: selectedVariant.id,
              size_name:
                selectedVariant.size_name,
              actual_price:
                selectedVariant.actual_price,
              offer_price:
                selectedVariant.offer_price,
              is_available:
                selectedVariant.is_available,
            }
          : null,

        quantity: 1,

        unit_price: unitPrice,

        total_price: unitPrice,
      })
    );

    /*
     * =================================================
     * SUCCESS TOAST
     * =================================================
     */

    toast.success(
      `${item.name} added to cart`,
      {
        duration: 3000,
      }
    );

    /*
     * =================================================
     * GUEST USER
     *
     * Redux/local storage is enough.
     * No backend call.
     * =================================================
     */

    if (!isLoggedIn) {
      return;
    }

    /*
     * =================================================
     * 2. BACKGROUND BACKEND SYNC
     *
     * Same as Home page.
     * =================================================
     */

    try {
      const response =
        await addToCartApi({
          menu_item_id: item.id,

          variant_id:
            selectedVariant?.id ?? null,

          quantity: 1,
        });

      /*
       * Backend rejected the request.
       *
       * Keep the same Home-page behavior:
       * don't block the UI.
       */
      if (!response?.status) {
        return;
      }

      /*
       * =================================================
       * 3. REFRESH CART FROM BACKEND
       * =================================================
       */

      const cartResponse =
        await getCart();

      if (
        cartResponse?.status &&
        cartResponse?.data
      ) {
        const backendItems =
          cartResponse.data.items ?? [];

        /*
         * Convert backend cart structure
         * into the Redux cart structure.
         */
        const updatedCart =
          backendItems.map(
            (cartItem: any) => {
              const unitPrice =
                Number(
                  cartItem.unit_price
                );

              return {
                cart_item_id:
                  cartItem.id,

                id:
                  cartItem.menu_item.id,

                name:
                  cartItem.menu_item.name,

                description:
                  "",

                image:
                  cartItem.menu_item
                    .image ?? null,

                dietary_preference:
                  cartItem.menu_item
                    .dietary_preference,

                has_variants:
                  cartItem.menu_item
                    .has_variants,

                actual_price:
                  cartItem.menu_item
                    .actual_price ??
                  null,

                offer_price:
                  cartItem.menu_item
                    .offer_price ??
                  null,

                variant:
                  cartItem.variant
                    ? {
                        id:
                          cartItem.variant.id,

                        size_name:
                          cartItem.variant
                            .size_name,

                        actual_price:
                          cartItem.variant
                            .actual_price,

                        offer_price:
                          cartItem.variant
                            .offer_price,

                        is_available:
                          cartItem.variant
                            .is_available,
                      }
                    : null,

                quantity:
                  cartItem.quantity,

                unit_price:
                  unitPrice,

                total_price:
                  unitPrice *
                  cartItem.quantity,
              };
            }
          );

        /*
         * Replace optimistic cart
         * with backend-confirmed cart.
         */
        dispatch(
          setCart(updatedCart)
        );
      }
    } catch (error) {
      /*
       * Same Home behavior:
       * backend sync failure should not
       * break the already updated UI.
       */
      console.error(
        "Failed to sync cart to backend:",
        error
      );
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)]">

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block w-full text-left"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">

          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              No Image
            </div>
          )}

          {/* DISCOUNT BADGE */}

          {hasDiscount &&
            discountPercentage > 0 && (
              <div className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[var(--brand-green-dark)] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
                {discountPercentage}% OFF
              </div>
            )}

          {/* SOLD OUT */}

          {!orderable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-800">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-3 sm:p-4">

        {/* CATEGORY */}

        {item.category_name && (
          <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--brand-gold)] sm:text-[9px]">
            {item.category_name}
          </p>
        )}

        {/* NAME */}

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="block w-full text-left"
        >
          <h3 className="line-clamp-2 min-h-[36px] text-[13px] font-black leading-[1.35] text-[var(--brand-green-dark)] sm:text-[15px]">
            {item.name}
          </h3>
        </button>

        {/* DESCRIPTION */}

        {item.description && (
          <p className="mt-1 line-clamp-2 text-[10px] leading-[1.5] text-gray-500 sm:text-[11px]">
            {item.description}
          </p>
        )}

        {/* =================================================
            PRICE + ADD BUTTON
        ================================================= */}

        <div className="mt-3 flex items-end justify-between gap-2">

          {/* PRICE */}

          <div className="flex min-w-0 flex-col">

            {price !== null ? (
              <>
                <span className="text-[13px] font-black text-[var(--brand-green-dark)] sm:text-[15px]">
                  ₹ {price}
                </span>

                {displayOriginal !== null && (
                  <span className="text-[10px] text-gray-400 line-through">
                    ₹{displayOriginal}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[11px] font-bold text-gray-400 sm:text-[12px]">
                Coming Soon
              </span>
            )}

          </div>

          {/* =================================================
              ADD TO CART
          ================================================= */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!orderable}
            aria-label={`Add ${item.name} to cart`}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--brand-gold)]/30 bg-[var(--brand-green-dark)] text-[var(--brand-gold)] shadow-sm transition-all hover:scale-110 hover:bg-[#024532] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8 sm:shadow-md"
          >
            <Plus
              size={14}
              strokeWidth={3}
              className="sm:h-[18px] sm:w-[18px]"
            />
          </button>

        </div>
      </div>
    </article>
  );
};

export default MenuItemCard;