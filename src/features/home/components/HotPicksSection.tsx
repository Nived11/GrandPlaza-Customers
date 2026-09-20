"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import useCartHook from "@/features/cart/hook/useCartHook";
import type { HomeMenuItem } from "../hooks/useHomeHook";

interface HotPicksSectionProps {
  data?: HomeMenuItem[];
  onProductClick?: (product: HomeMenuItem) => void;
}

export default function HotPicksSection({
  data = [],
  onProductClick,
}: HotPicksSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { addToCart: addToCartApi, getCart } = useCartHook();

  const handleAddToCart = async (e: React.MouseEvent, item: HomeMenuItem) => {
    // Card-ന്റെ ക്ലിക്ക് ഇവന്റ് ട്രിഗർ ആകാതിരിക്കാൻ stopPropagation
    e.stopPropagation();

    // ഐറ്റത്തിന് ഒന്നിൽ കൂടുതൽ വേരിയന്റുകൾ (Half, Full etc.) ഉണ്ടെങ്കിൽ Modal ഓപ്പൺ ചെയ്യുക
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
      console.error("Failed to sync cart with backend:", error);
    }
  };

  return (
    <div className="w-full">
      
      {/* Header Section - existing design */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 lg:mb-8 px-4 mt-4">
        <span className="text-[var(--brand-gold)] opacity-70 text-xs md:text-sm">
          ✦✧
        </span>

        <h2 className="text-base lg:text-xl font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Today's{" "}
          <span className="text-[var(--brand-gold)] font-serif">
            Hot Picks
          </span>
        </h2>

        <span className="text-[var(--brand-gold)] opacity-70 text-xs md:text-sm">
          ✧✦
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 lg:px-0">
        {data.map((item) => {
          const availableVariant = item.variants?.find(
            (variant) => variant.is_available
          );

          const offerPrice =
            item.offer_price || availableVariant?.offer_price;

          const actualPrice =
            item.actual_price || availableVariant?.actual_price;

          return (
            <div
              key={item.id}
              onClick={() => onProductClick?.(item)}
              className="bg-white rounded-xl lg:rounded-[1.25rem] border border-gray-100 shadow-[0_4px_15px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full cursor-pointer"
            >
              
              {/* Image Container */}
              <div className="relative h-28 sm:h-36 w-full overflow-hidden">
                <img
                  src={item.image || ""}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                  {item.category_name}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-2.5 sm:p-4 flex flex-col flex-grow bg-white">
                
                {/* Dietary Preference */}
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
                <h3 className="text-[10px] sm:text-[12px] font-black text-slate-900 leading-tight mb-1 sm:mb-1.5 line-clamp-1">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[8px] sm:text-[9px] font-medium text-gray-500 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Price & Add Button */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    {offerPrice && (
                      <span className="text-[12px] sm:text-[15px] font-black text-[var(--brand-gold)]">
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

                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="w-5 h-5 cursor-pointer sm:w-6 sm:h-6 rounded-full bg-[var(--brand-green-dark)] hover:bg-[var(--brand-gold)] text-white flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                  >
                    <Plus
                      size={12}
                      strokeWidth={3}
                      className="sm:w-3.5 sm:h-3.5"
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