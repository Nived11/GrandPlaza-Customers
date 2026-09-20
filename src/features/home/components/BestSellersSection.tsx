"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import useCartHook from "@/features/cart/hook/useCartHook";
import type { HomeMenuItem } from "../hooks/useHomeHook";

interface BestSellersSectionProps {
  data?: HomeMenuItem[];
  onProductClick?: (product: HomeMenuItem) => void;
}

export default function BestSellersSection({
  data = [],
  onProductClick,
}: BestSellersSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { addToCart: addToCartApi, getCart } = useCartHook();

  const handleAddToCart = async (e: React.MouseEvent, item: HomeMenuItem) => {
    e.stopPropagation();

    if (item.has_variants && item.variants && item.variants.length > 1) {
      onProductClick?.(item);
      return;
    }

    const selectedVariant =
      item.variants?.find((variant) => variant.is_available) ?? null;

    if (item.has_variants && !selectedVariant) {
      onProductClick?.(item);
      return;
    }

    // 🛡️ Limit Check: കാർട്ടിൽ ഇതിനകം 20 എണ്ണം ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു
    const existingCartItem = cartItems.find(
      (cItem) =>
        cItem.id === item.id &&
        (cItem.variant?.id ?? null) === (selectedVariant?.id ?? null)
    );

    if (existingCartItem && existingCartItem.quantity >= 20) {
      toast.error(`Maximum limit of 20 reached for ${item.name}`);
      return;
    }

    const priceValue = item.has_variants
      ? selectedVariant?.offer_price || selectedVariant?.actual_price
      : item.offer_price || item.actual_price;

    const unitPrice = Number(priceValue || 0);

    if (unitPrice <= 0) {
      onProductClick?.(item);
      return;
    }

    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") === "true";

    // 1. Instant Optimistic Update: Redux / LocalStorage അടിയന്തരമായി അപ്ഡേറ്റ് ആകും (0ms feedback)
    dispatch(
      addToCart({
        cart_item_id: existingCartItem?.cart_item_id ?? 0,
        id: item.id,
        name: item.name,
        description: item.description || "",
        image: item.image ?? null,
        dietary_preference: item.dietary_preference,
        has_variants: item.has_variants,
        actual_price: item.has_variants
          ? selectedVariant?.actual_price ?? null
          : item.actual_price ?? null,
        offer_price: item.has_variants
          ? selectedVariant?.offer_price ?? null
          : item.offer_price ?? null,
        variant: selectedVariant
          ? {
              id: selectedVariant.id,
              size_name: selectedVariant.size_name,
              actual_price: selectedVariant.actual_price,
              offer_price: selectedVariant.offer_price,
              is_available: selectedVariant.is_available,
            }
          : null,
        quantity: 1,
        unit_price: unitPrice,
        total_price: unitPrice,
      })
    );

    toast.success(`${item.name} added to cart`, {
      duration: 3000,
    });

    if (!isLoggedIn) {
      return;
    }

    // 2. Logged-in User: Background API sync (UI block ചെയ്യില്ല)
    try {
      const response = await addToCartApi({
        menu_item_id: item.id,
        variant_id: selectedVariant?.id ?? null,
        quantity: 1,
      });

      if (!response?.status) return;

      const cartResponse = await getCart();

      if (cartResponse?.status && cartResponse?.data) {
        const backendItems = cartResponse.data.items ?? [];
        const cartItems = backendItems.map((bItem: any) => {
          const uPrice = Number(bItem.unit_price);
          return {
            cart_item_id: bItem.id,
            id: bItem.menu_item.id,
            name: bItem.menu_item.name,
            description: "",
            image: bItem.menu_item.image ?? null,
            dietary_preference: bItem.menu_item.dietary_preference,
            has_variants: bItem.menu_item.has_variants,
            actual_price: bItem.menu_item.actual_price ?? null,
            offer_price: bItem.menu_item.offer_price ?? null,
            variant: bItem.variant
              ? {
                  id: bItem.variant.id,
                  size_name: bItem.variant.size_name,
                  actual_price: bItem.variant.actual_price,
                  offer_price: bItem.variant.offer_price,
                  is_available: bItem.variant.is_available,
                }
              : null,
            quantity: bItem.quantity,
            unit_price: uPrice,
            total_price: uPrice * bItem.quantity,
          };
        });

        dispatch(setCart(cartItems));
      }
    } catch (error) {
      console.error("Failed to sync cart to backend:", error);
    }
  };
  return (
    <div className="w-full mt-16 lg:mt-24">
      
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 z-10 bg-white px-4">
          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>

          <h2 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest">
            Best Sellers
          </h2>

          <span className="text-[var(--brand-gold)] text-xs">
            ✦
          </span>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-5">
        {data.map((item) => {
          const availableVariant = item.variants?.find(
            (variant) => variant.is_available
          );

          const offerPrice =
            item.offer_price || availableVariant?.offer_price;

          const actualPrice =
            item.actual_price || availableVariant?.actual_price;

          const discount =
            offerPrice &&
            actualPrice &&
            Number(actualPrice) > 0
              ? Math.round(
                  ((Number(actualPrice) - Number(offerPrice)) /
                    Number(actualPrice)) *
                    100
                )
              : 0;

          return (
            <div
              key={item.id}
              onClick={() => onProductClick?.(item)}
              className="bg-white rounded-xl lg:rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:border-[var(--brand-gold)]/60 hover:shadow-lg transition-all group flex flex-col overflow-hidden h-full cursor-pointer"
            >
              
              {/* Image Wrapper */}
              <div className="relative w-full h-28 sm:h-36 overflow-hidden bg-[var(--brand-cream-soft)]">
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-2 left-2 bg-[var(--brand-gold)] text-[var(--brand-green-dark)] text-[7px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm z-10">
                    {discount}% OFF
                  </div>
                )}

                {/* Image */}
                <img
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 bg-[var(--brand-green-dark)]/90 backdrop-blur-sm text-[var(--brand-gold)] text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm border border-[var(--brand-gold)]/20 z-10">
                  {item.category_name}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-2.5 sm:p-4 flex flex-col flex-grow bg-white">
                
                {/* Veg/Non-Veg Indicator */}
                <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      item.dietary_preference === "NON-VEG"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  />

                  <span
                    className={`text-[7px] sm:text-[8px] font-black tracking-widest ${
                      item.dietary_preference === "NON-VEG"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.dietary_preference}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[10px] sm:text-[13px] font-black text-slate-900 leading-tight mb-1 sm:mb-1.5 line-clamp-1">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-gray-500 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                  {item.description}
                </p>

                {/* Price & Add Button */}
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col">
                    {offerPrice && (
                      <span className="text-[12px] sm:text-[16px] font-black text-[var(--brand-green-dark)] leading-none mb-0.5 sm:mb-1">
                        ₹{offerPrice}
                      </span>
                    )}

                    {actualPrice &&
                      offerPrice &&
                      Number(actualPrice) > Number(offerPrice) && (
                        <span className="text-[9px] sm:text-[11px] font-semibold text-gray-400 line-through">
                          ₹{actualPrice}
                        </span>
                      )}
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--brand-green-dark)] hover:bg-[#024532] text-[var(--brand-gold)] flex items-center justify-center shadow-sm sm:shadow-md transition-colors active:scale-95 border border-[var(--brand-gold)]/30"
                  >
                    <Plus
                      size={14}
                      strokeWidth={3}
                      className="sm:w-[18px] sm:h-[18px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}