"use client";

import React, { useState } from "react";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Updated Chicken Burger",
      description:
        "Regular Patty • Extra Smoked Cheddar • House Special Herb Aioli • Medium Spice",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBr0NZhrcFscf5ZGX4TvON_-QGyLx4GvrqzYxHVinSnMQgtcuNnShNwS1AiOYR4-kRUiPtxhyGRyuuoWrqb_Pclxl3amQwEeDeSNYMh58eaxvxvWTU7fsa1RJ3YK8eeW0jTCAFKRTw4t3vKtRT45Vu7dGybhfEhDq7ohqkklKRS7CEFpIUpCDEd7FlrJ65GKpLoapiOAkeAB8SXNbjgxvpvIQewe9xukaLLI2sn8vSxh8Wsy6Yn9Nx1",
      imageAlt:
        "Updated Chicken Burger with melted smoked cheddar and fresh lettuce",
      badge: "Burger",
      badgeType: "forest",
      quantity: 1,
      price: 270,
      originalPrice: 300,
    },
    {
      id: 2,
      name: "Chicken Pizza",
      description:
        "Medium (8 Slices) • Extra Mozzarella • Oven Roasted Spiced Chicken",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnS3KzkRpr5TbRa5QiEoUVs3V89NbJ_aPky9Prx7Sd656Wp03yPiEqAwxDOFp5UFBYtY0iF7bagu1R5LeOJtPbILm8wrMPU_1Lyb1lwLg5TmvZxLzQiwAXPmyau8iisa8B21KYwfYsfd5sTBjaii5wmpnJzJaMHVB0jBp8aHuCjh1elyp8VBLSRs-RVq268V7ZvBVgzpMDXEEcJCZ3aUeUSTXEBnasiieWqHDN2WLdOVPkRSWuGszJ",
      imageAlt:
        "Chicken Pizza with golden charred crust and aromatic herbs",
      badge: "Save ₹30",
      badgeType: "gold",
      quantity: 1,
      price: 220,
      originalPrice: 250,
    },
    {
      id: 3,
      name: "Royal Kunafa Pistachio",
      description:
        "Crisp Golden Kataifi • Sweet Akkawi Cheese • Crushed Iranian Pistachios • Rose Syrup",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZv_Y7I3jTkp7_GaCSZGG8rrNTGjktB9TdgNjtTK_Cky1Myh2pRh7Hdl_nWhjkbd1tjrJwD1_8xtmW4r-XnoABUsgBZdbu_EIZsj5eJJgrk87-1zzFHQIAKyZK0WEjAWYmS-_Zbc3_MCQp_kGNwr0BEZIzvkLlAskjBKbrpzLGlfLBoe9wIN65ovbqLxwB5YmhPB4ip1tcamVpoSCzg-9iDqB1y3gDEnvPom-7LhYFTJ0K1CVFVOib",
      imageAlt:
        "Royal Kunafa Pistachio with molten sweet cheese and pistachios",
      badge: "Chef Special",
      badgeType: "gold",
      quantity: 1,
      price: 180,
      originalPrice: 200,
    },
  ]);

  const increaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
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

          <div className="flex items-center space-x-12 sm:space-x-16">
            <span className="hidden sm:inline">Quantity</span>
            <span>Total Price</span>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <article
            key={item.id}
            className="p-6 border-b border-[#0F3D2E]/5 hover:bg-[#FBF6EC]/20 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 last:border-b-0"
            data-purpose="cart-item"
          >
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {/* Dish Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FBF6EC] shrink-0 border border-[#0F3D2E]/10 shadow-sm relative">
                <img
                  alt={item.imageAlt}
                  className="w-full h-full object-cover"
                  src={item.image}
                />

                <span
                  className={`absolute top-1 left-1 ${
                    item.badgeType === "forest"
                      ? "bg-[#0F3D2E] text-white"
                      : "bg-[#D9A441] text-[#0F3D2E]"
                  } text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider`}
                >
                  {item.badge}
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

                <div className="flex items-center gap-3 pt-1">
                  <button
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition flex items-center gap-1"
                    type="button"
                    onClick={() => removeItem(item.id)}
                  >
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

                    Remove
                  </button>

                  <span className="text-xs text-[#1E2A22]/30">•</span>

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
                  className="stepper-btn w-6 h-6 rounded-full border border-[#0F3D2E]/20 flex items-center justify-center text-xs text-[#0F3D2E] font-bold"
                  type="button"
                  onClick={() => decreaseQuantity(item.id)}
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
                  className="stepper-btn w-6 h-6 rounded-full border border-[#0F3D2E]/20 flex items-center justify-center text-xs text-[#0F3D2E] font-bold"
                  type="button"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-base sm:text-lg font-bold text-[#D9A441] font-serif">
                  ₹{item.price.toFixed(2)}
                </div>

                <div className="text-[11px] text-[#1E2A22]/40 line-through">
                  ₹{item.originalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CartItems;