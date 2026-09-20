"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  addToCart,
  setCart,
} from "@/redux/slices/cartSlice";
import type { AppDispatch, RootState } from "@/redux/store";

import {
  HomeMenuItem,
  HomeVariant,
} from "@/features/home/hooks/useHomeHook";

import useCartHook from "@/features/cart/hook/useCartHook";

interface ProductQuickViewModalProps {
  product: HomeMenuItem | null;
  onClose: () => void;
}

const ProductQuickViewModal = ({
  product,
  onClose,
}: ProductQuickViewModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const {
    addToCart: addToCartApi,
    getCart,
  } = useCartHook();

  const [mounted, setMounted] = useState(false);

  const [selectedVariant, setSelectedVariant] =
    useState<HomeVariant | null>(null);

  const [quantity, setQuantity] = useState(1);

  const [isAdding, setIsAdding] = useState(false);

  /*
   * Mount modal portal.
   */
  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  /*
   * Reset modal state whenever a different
   * product is opened.
   */
  useEffect(() => {
    if (!product) {
      setSelectedVariant(null);
      setQuantity(1);
      return;
    }

    setQuantity(1);

    if (
      product.has_variants &&
      product.variants?.length > 0
    ) {
      const firstAvailableVariant =
        product.variants.find(
          (variant) => variant.is_available
        );

      setSelectedVariant(
        firstAvailableVariant ?? null
      );
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  /*
   * Prevent background scrolling while modal is open.
   */
  useEffect(() => {
    if (!product) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [product]);

  /*
   * Close modal with Escape.
   */
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [product, onClose]);

  if (!product || !mounted) {
    return null;
  }

  /*
   * Get the selected price.
   *
   * Variant product:
   * selected variant offer_price
   * → selected variant actual_price
   *
   * Normal product:
   * product offer_price
   * → product actual_price
   */
  const currentPrice = selectedVariant
    ? Number(
        selectedVariant.offer_price ||
          selectedVariant.actual_price ||
          0
      )
    : Number(
        product.offer_price ||
          product.actual_price ||
          0
      );

  /*
   * Original price.
   */
  const originalPrice = selectedVariant
    ? Number(
        selectedVariant.actual_price || 0
      )
    : Number(product.actual_price || 0);

  const hasDiscount =
    originalPrice > currentPrice;

  const savingAmount = hasDiscount
    ? originalPrice - currentPrice
    : 0;

  const totalPrice = currentPrice * quantity;

  /*
   * Map backend cart response into Redux cart format.
   *
   * Backend CartItem ID:
   * item.id
   *
   * Menu Item ID:
   * item.menu_item.id
   */
  const syncBackendCartToRedux = (
    cartResponse: any
  ) => {
    if (
      !cartResponse?.status ||
      !cartResponse?.data
    ) {
      return;
    }

    const backendItems =
      cartResponse.data.items ?? [];

    const cartItems = backendItems.map(
      (item: any) => {
        const unitPrice = Number(
          item.unit_price
        );

        return {
          cart_item_id: item.id,

          id: item.menu_item.id,

          name: item.menu_item.name,

          description: "",

          image:
            item.menu_item.image ?? null,

          dietary_preference:
            item.menu_item
              .dietary_preference,

          has_variants:
            item.menu_item.has_variants,

          actual_price:
            item.menu_item.actual_price ??
            null,

          offer_price:
            item.menu_item.offer_price ??
            null,

          variant: item.variant
            ? {
                id: item.variant.id,

                size_name:
                  item.variant.size_name,

                actual_price:
                  item.variant
                    .actual_price,

                offer_price:
                  item.variant
                    .offer_price,

                is_available:
                  item.variant
                    .is_available,
              }
            : null,

          quantity: item.quantity,

          unit_price: unitPrice,

          total_price:
            unitPrice * item.quantity,
        };
      }
    );

    dispatch(setCart(cartItems));
  };

  /*
   * Add product to cart.
   *
   * Logged out:
   * Redux only.
   *
   * Logged in:
   * POST Add Cart API
   * → GET Cart API
   * → Sync Redux
   */
  const handleAddToCart = async () => {
    if (!product) return;

    /*
     * Validate variant.
     */
    if (
      product.has_variants &&
      !selectedVariant
    ) {
      toast.error("Please select a size");
      return;
    }

    /*
     * Validate variant availability.
     */
    if (
      product.has_variants &&
      selectedVariant &&
      !selectedVariant.is_available
    ) {
      toast.error(
        "Selected size is currently unavailable"
      );
      return;
    }

    /*
     * Get current unit price.
     */
    const priceValue = product.has_variants
      ? selectedVariant?.offer_price ||
        selectedVariant?.actual_price
      : product.offer_price ||
        product.actual_price;

    const unitPrice = Number(
      priceValue || 0
    );

    if (unitPrice <= 0) {
      toast.error("Price is unavailable");
      return;
    }

    // 🛡️ Limit Check: നിലവിലുള്ള quantity + പുതിയ quantity 20-ൽ കൂടുമോ എന്ന് നോക്കുന്നു
    const existingCartItem = cartItems.find(
      (cItem) =>
        cItem.id === product.id &&
        (cItem.variant?.id ?? null) === (selectedVariant?.id ?? null)
    );

    const currentQty = existingCartItem ? existingCartItem.quantity : 0;
    if (currentQty + quantity > 20) {
      toast.error(
        currentQty >= 20
          ? `Maximum limit of 20 already reached for ${product.name}`
          : `You can only add ${20 - currentQty} more of ${product.name} (Max: 20)`
      );
      return;
    }

    try {
      setIsAdding(true);

      /*
       * Check login status.
       */
      const isLoggedIn =
        localStorage.getItem(
          "isLoggedIn"
        ) === "true";

      /*
       * ==================================================
       * GUEST USER
       * ==================================================
       *
       * Do NOT call the backend.
       * Store the item only in Redux.
       */
      // 1. Instant Optimistic Update: Redux / LocalStorage update (0ms)
      dispatch(
        addToCart({
          cart_item_id: 0,
          id: product.id,
          name: product.name,
          description: product.description || "",
          image: product.image ?? null,
          dietary_preference: product.dietary_preference,
          has_variants: product.has_variants,
          actual_price: product.has_variants
            ? selectedVariant?.actual_price ?? null
            : product.actual_price ?? null,
          offer_price: product.has_variants
            ? selectedVariant?.offer_price ?? null
            : product.offer_price ?? null,
          variant: selectedVariant
            ? {
                id: selectedVariant.id,
                size_name: selectedVariant.size_name,
                actual_price: selectedVariant.actual_price,
                offer_price: selectedVariant.offer_price,
                is_available: selectedVariant.is_available,
              }
            : null,
          quantity,
          unit_price: unitPrice,
          total_price: unitPrice * quantity,
        })
      );

      toast.success(`${product.name} added to cart`, {
        duration: 3000,
      });

      onClose();

      if (!isLoggedIn) {
        return;
      }

      // 2. Logged-in User: Background API sync
      try {
        const response = await addToCartApi({
          menu_item_id: product.id,
          variant_id: selectedVariant?.id ?? null,
          quantity,
        });

        if (!response?.status) return;

        const cartResponse = await getCart();
        syncBackendCartToRedux(cartResponse);
      } catch (err) {
        console.error("Failed to sync modal cart to backend:", err);
      }
    } finally {
      setIsAdding(false);
    }
  };

  /*
   * Close when clicking the backdrop.
   */
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#09281E]/60 p-3 backdrop-blur-[6px] sm:p-5"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-product-title"
    >
      <div
        className="relative flex max-h-[94vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[22px] border border-[#0F3D2E]/10 bg-white shadow-[0_25px_80px_rgba(9,40,30,0.28)] md:min-h-[400px] md:flex-row"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* LEFT — IMAGE */}
        <div className="relative h-[260px] shrink-0 overflow-hidden bg-[#FBF6EC] md:h-auto md:w-[45%]">
          <img
            src={product.image || ""}
            alt={product.name}
            className="h-full w-full object-cover"
          />

          {/* Dietary badge */}
          <div className="absolute left-4 top-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
                product.dietary_preference ===
                "VEG"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.dietary_preference}
            </span>
          </div>

          {/* Save button */}
          <button
            type="button"
            aria-label="Save product"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#0F3D2E] shadow-md backdrop-blur transition hover:bg-white"
          >
            <Heart
              size={18}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* RIGHT — INFORMATION */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Close */}
          <div className="flex justify-end px-4 pt-4 sm:px-5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product quick view"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1E2320]/60 transition hover:bg-[#FBF6EC] hover:text-[#0F3D2E]"
            >
              <X
                size={20}
                strokeWidth={1.8}
              />
            </button>
          </div>

          {/* Product information */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6">
            {/* Title */}
            <h2
              id="quick-view-product-title"
              className="mt-1 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-[#0F3D2E] sm:text-[28px]"
            >
              {product.name}
            </h2>

            {/* Description */}
            {product.description && (
              <p className="mt-3 text-[13px] leading-6 text-[#1E2320]/65">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="text-[24px] font-bold text-[#0F3D2E]">
                ₹{currentPrice.toFixed(0)}
              </span>

              {hasDiscount && (
                <>
                  <span className="pb-0.5 text-[14px] text-[#1E2320]/40 line-through">
                    ₹{originalPrice.toFixed(0)}
                  </span>

                  <span className="pb-0.5 text-[11px] font-bold uppercase tracking-wide text-[#16533F]">
                    Save ₹
                    {savingAmount.toFixed(0)}
                  </span>
                </>
              )}
            </div>

            {/* VARIANTS */}
            {product.has_variants &&
              product.variants?.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0F3D2E]">
                      Select Size
                    </h3>

                    {selectedVariant && (
                      <span className="text-[11px] text-[#1E2320]/50">
                        {
                          selectedVariant.size_name
                        }
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {product.variants.map(
                      (variant) => {
                        const variantPrice =
                          Number(
                            variant.offer_price ||
                              variant.actual_price ||
                              0
                          );

                        const isSelected =
                          selectedVariant?.id ===
                          variant.id;

                        return (
                          <button
                            key={variant.id}
                            type="button"
                            disabled={
                              !variant.is_available
                            }
                            onClick={() => {
                              if (
                                variant.is_available
                              ) {
                                setSelectedVariant(
                                  variant
                                );
                              }
                            }}
                            className={`rounded-[12px] border px-3 py-3 text-left transition ${
                              isSelected
                                ? "border-[#0F3D2E] bg-[#0F3D2E] text-white"
                                : variant.is_available
                                ? "border-[#0F3D2E]/15 bg-[#FBF6EC] text-[#0F3D2E] hover:border-[#0F3D2E]/40"
                                : "cursor-not-allowed border-[#1E2320]/10 bg-gray-100 text-[#1E2320]/30"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[12px] font-semibold">
                                {
                                  variant.size_name
                                }
                              </span>

                              {!variant.is_available && (
                                <span className="text-[9px] uppercase tracking-wide">
                                  Unavailable
                                </span>
                              )}
                            </div>

                            <div className="mt-1 text-[12px] font-medium">
                              ₹
                              {variantPrice.toFixed(
                                0
                              )}
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

            <div className="h-3" />
          </div>

          {/* BOTTOM ACTION */}
          <div className="shrink-0 border-t border-[#0F3D2E]/10 bg-white px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex h-12 shrink-0 items-center rounded-[12px] border border-[#0F3D2E]/15 bg-[#FBF6EC]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(
                        1,
                        current - 1
                      )
                    )
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-full w-10 items-center justify-center text-[#0F3D2E] transition hover:bg-[#0F3D2E]/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>

                <span className="w-7 text-center text-[13px] font-bold text-[#0F3D2E]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(
                        20,
                        current + 1
                      )
                    )
                  }
                  disabled={quantity >= 20}
                  aria-label="Increase quantity"
                  className="flex h-full w-10 items-center justify-center text-[#0F3D2E] transition hover:bg-[#0F3D2E]/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  isAdding ||
                  !product.is_available ||
                  (product.has_variants &&
                    !selectedVariant)
                }
                className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#0F3D2E] px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#16533F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={16} />

                <span className="truncate">
                  {isAdding
                    ? "Adding..."
                    : `Add to Cart · ₹${totalPrice.toFixed(
                        0
                      )}`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductQuickViewModal;