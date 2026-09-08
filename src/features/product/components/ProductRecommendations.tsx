"use client";

import React from "react";

const ProductRecommendations = () => {
  return (
    <section
      aria-label="Recommended items"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full border-t border-[#E6E0D2]/60"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center space-x-2 text-[#D9A441] text-xs font-bold uppercase tracking-widest mb-1.5">
          <span>✦</span>
          <span>RECOMMENDATIONS</span>
          <span>✦</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2A22]">
          You May{" "}
          <span className="text-[#D9A441] italic">
            Also Like
          </span>
        </h2>

        <div className="w-16 h-0.5 bg-[#D9A441]/50 mx-auto mt-3" />
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 1 */}
        <article className="bg-white rounded-2xl border border-[#E6E0D2]/80 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#FBF6EC]">
              <img
                alt="Chicken Pizza"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_R_aNK4VklzbV_YGzzLDDDrQuuUm8BwS1ahn4yS1S4PvHkTbiELQ4NudXoMMS-Y9f81IB1QxPqaFrk-yDlU1MTIVuGyxeKl0BMgsWqM-A19lS6bVbW5wEB0WZH0u_cKIyEZcStIcD73J8asU1UGBvOWcAON2MtxHgvIiEHmjnkOzeL3x-gEv8_Y63Fbhi1Coh_w8uNBQ2M35f4CEZarXmiTYzuX3L6qpI4Q2VgjMCYQHGaKdaWrCB"
              />

              <span className="absolute top-2.5 left-2.5 bg-[#D9A441] text-[#0F3D2E] text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                SAVE ₹30
              </span>
            </div>

            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="w-3 h-3 border border-red-600 flex items-center justify-center rounded-sm">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                NON-VEG
              </span>
            </div>

            <h3 className="font-bold text-lg text-[#1E2A22] group-hover:text-[#0F3D2E] transition-colors">
              Chicken Pizza
            </h3>

            <p className="text-xs text-[#8C968F] mt-1 line-clamp-2">
              Crispy wood-fired crust with succulent spiced chicken chunks
              and mozzarella.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E6E0D2]/60 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-[#1E2A22]">
                ₹220.00
              </span>

              <span className="text-xs text-[#8C968F] line-through ml-1.5">
                ₹250.00
              </span>
            </div>

            <button
              aria-label="Add Chicken Pizza"
              className="w-9 h-9 rounded-full bg-[#0F3D2E] hover:bg-[#17523F] text-white flex items-center justify-center shadow-sm transition-transform active:scale-90"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </button>
          </div>
        </article>

        {/* Card 2 */}
        <article className="bg-white rounded-2xl border border-[#E6E0D2]/80 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#FBF6EC]">
              <img
                alt="Alfaham Mandi Special"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD33YPsn-We5D4o_hUJ_ZKwAxvh6CaDWi6XAyd5A7xzP070FnTzxxtSMhhRV-2Q-q9Ang2ej-Xwnsn1CkjM3HqZ4XNqHH3QjrHTMlDBB5XvKHr9TTQw2MCPWPpsCr3yr1EQHSXOd8wAuK6pzyjvrHQ3P0GNYpm2-sDvISBUmhKKLRf3d0B7axRrPVvtYmuAe9LZeeQtCZu__yt4QCSQyZ7JEI2DEL86Wg30ZJ7D-4VflPlln9ITI0In"
              />

              <span className="absolute top-2.5 left-2.5 bg-[#0F3D2E] text-[#D9A441] text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-sm border border-[#D9A441]/30">
                BESTSELLER
              </span>
            </div>

            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="w-3 h-3 border border-red-600 flex items-center justify-center rounded-sm">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                ARABIC DELICACY
              </span>
            </div>

            <h3 className="font-bold text-lg text-[#1E2A22] group-hover:text-[#0F3D2E] transition-colors">
              Alfaham Mandi Special
            </h3>

            <p className="text-xs text-[#8C968F] mt-1 line-clamp-2">
              Authentic charcoal grilled chicken served on a fragrant bed of
              spiced long basmati rice.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E6E0D2]/60 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-[#1E2A22]">
                ₹310.00
              </span>
            </div>

            <button
              aria-label="Add Alfaham Mandi"
              className="w-9 h-9 rounded-full bg-[#0F3D2E] hover:bg-[#17523F] text-white flex items-center justify-center shadow-sm transition-transform active:scale-90"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </button>
          </div>
        </article>

        {/* Card 3 */}
        <article className="bg-white rounded-2xl border border-[#E6E0D2]/80 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-[#FBF6EC]">
              <img
                alt="Royal Kunafa Pistachio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpnJSw2YZq3vWBlWCiDwB_rCxUXPlawF5JbP2zdK0foTUphKiMBdCC1HZx3_8i0p962oCT2ctZZrZ4iBbgp1SpTH1wg1K71pd2sXkFxs9PjJZtLCUZDpD7tXh1lgTYlpkw9TAhr6Mq4qnLGudQtHaQTrJHNfKc_lYMbcBODymftJVcRTrEKQ9DkuNtdhDWj8kUYa3jBJyDV7uhPaYFIiJ56VwsAoNu2-3DH1Qaz0DI87Bvnz5-bbdP"
              />

              <span className="absolute top-2.5 left-2.5 bg-[#D9A441] text-[#0F3D2E] text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                CHEF SPECIAL
              </span>
            </div>

            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="w-3 h-3 border border-green-600 flex items-center justify-center rounded-sm">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">
                VEG DESSERT
              </span>
            </div>

            <h3 className="font-bold text-lg text-[#1E2A22] group-hover:text-[#0F3D2E] transition-colors">
              Royal Kunafa Pistachio
            </h3>

            <p className="text-xs text-[#8C968F] mt-1 line-clamp-2">
              Crisp kataifi pastry filled with rich stretchy sweet cheese,
              crushed Iranian pistachios & rose drizzle.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E6E0D2]/60 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-[#1E2A22]">
                ₹180.00
              </span>
            </div>

            <button
              aria-label="Add Kunafa"
              className="w-9 h-9 rounded-full bg-[#0F3D2E] hover:bg-[#17523F] text-white flex items-center justify-center shadow-sm transition-transform active:scale-90"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProductRecommendations;