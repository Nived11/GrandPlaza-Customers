"use client";

import React, { useState } from "react";

const ProductGallery = () => {
  const images = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUzc7w2o09-9q2HrurEQpU3ete-VzcU4J7Dqb_qYYI4k-wYBIRL1c5W5agebH18k2dRpelbx1-e0QORZ_cDy2FcXdDeczDynkzBFkprTNJIOVzPl-VEjJX4bCM-b2GM2T0KhFokwwH4hC9CICic64ke1WKLoPXwOYfckXysFSoDJqLqYumdcUd9e-2ESOm35qB4VAkiAM4lJAILb7akgXcvOAUexnmYZRrwdRH_cTtQSKtpDIVR_D",
      alt: "Updated Chicken Burger with melted cheddar, crisp lettuce, brioche bun",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT3V2dsvwofLvFLr3rJv9BGNYe_CAEH-efTsMxgl9uI4V9ZyDPyS8JoT6L2Mz-yofpFyEy51MvuOKkkMHfJSFlpRlOdT7BW1aV9OAhTPJVenGnhe5tO0AgabGd5CwZq59LV2a22dMdZs0G-frp8F7LgXvrUEyP7qIYigBKSvAITP_TpXUaEcO5XkyTORtHnEi5_f40un-sBGKlf34gZZ0QWNB3mTvf-IBRou5raLH2vAcSOmKPV_hM",
      alt: "Front View",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKjHUkoAhIeWSLQYT9jaS2GT9E1Tx7JF9jIpLy4n3TW2PlovjWl8TFjU3mWMBHFehjMabBv03p9s_DQFamZMy0P425l1Xluv6RpjMISBLzw12hd4-_XcWbjZS3yxX74u3M1V5MaP74wnjNpRX7RIrrApejJi2-rVHdx1Abe-xqIuFnyJVfE4xMfd2A_GWgA059C7OqGCmeDN9i9SCIKcOsglPykI1u1VwfXZqW1PVODxvdV562fRTQ",
      alt: "Cross section melted cheese",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa0sUw3f7KSK_3P9QHzV12Fp1ZPq1eQq5IsGu04TMv6xNjkX494tFXGp4-r4GKXmImDLSfIJnHMld_yGAzOpDGeFFRzmz22pPYgKiFHw8se_ylpUhOGuvfAwhPXpH-WZoL_9wjvheLEYzVO-MWNjOMbx4UFVV6c1fEUpDGsm2s3hg_UPkBAcJWh0RLlfv1PdAtdVnVp5YP5h_xgXaID3E6bVkaR_kNCLOkPojCWom6JABjHNCIVj7L",
      alt: "Top view with toasted sesame bun",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBClvmiDeNmYIDOQ-RLD7VebL9GYtwjsZi7u-d_orw3zArLMv8fS9e5cROVKAM_fP6YI958jSJjUgeJzFXxiANpqxdO9Uf2KcLafslg9OwALVjsPZv-oRB1abC99znWOdSDv1DeetLb9WlQuXVnO01xM_dgb6n7NcTnkwCmDAGuW_KIywcwzf3geaphRIdsgD43QyNxOz5h5Xkx5-LthbMVUuyIE8lMga43GTWL7oZwBt0UoRkICI-U",
      alt: "Burger Combo fries view",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <>
      <section
        aria-label="Product Media Gallery"
        className="flex flex-col space-y-5 lg:col-span-7"
      >
        {/* Main Large Showcase Card */}
        <div
          className="group relative overflow-hidden rounded-3xl border border-[#E6E0D2]/70 bg-white p-6 shadow-[0_8px_24px_-4px_rgba(15,61,46,0.08),0_2px_6px_-1px_rgba(217,164,65,0.05)] transition-all duration-500 hover:shadow-[0_20px_45px_-10px_rgba(217,164,65,0.35)]"
        >
          {/* Background warm radial golden glow aura */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-[22rem] w-[22rem] rounded-full bg-[#D9A441]/15 blur-3xl glow-aura-pulse" />

          <div
            className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#D9A441]/10 blur-2xl glow-aura-pulse"
            style={{ animationDelay: "1.8s" }}
          />

          {/* Badges */}
          <div className="absolute left-6 top-6 z-20 flex items-center gap-2">
            {/* Non-Veg */}
            <div className="flex items-center justify-center rounded-md border border-[#E6E0D2] bg-white/95 p-1.5 shadow-sm backdrop-blur-sm">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border-2 border-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              </span>
            </div>

            {/* Discount Badge */}
            <span className="badge-shimmer relative flex items-center gap-1 overflow-hidden rounded-full bg-[#D9A441] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0A291F] shadow-sm">
              <svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  fillRule="evenodd"
                />
              </svg>
              SAVE ₹30
            </span>

            {/* Chef Signature */}
            <span className="hidden rounded-full border border-[#D9A441]/30 bg-[#0F3D2E] px-2.5 py-1 text-[11px] font-semibold text-[#D9A441] sm:inline-block">
              Chef Signature
            </span>
          </div>

          {/* Fresh Grill */}
          <div className="absolute right-6 top-6 z-20 flex items-center gap-1.5 rounded-full border border-[#E6E0D2]/80 bg-white/90 px-3 py-1 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D9A441]" />
            </span>

            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#0F3D2E]">
              <span>Fresh Grill</span>
            </span>
          </div>

          {/* Previous Button */}
          <button
            aria-label="Previous view"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E0D2] bg-white/90 text-[#0F3D2E] shadow-md transition-all hover:scale-105 hover:bg-white active:scale-95"
            type="button"
            onClick={previousImage}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            aria-label="Next view"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E0D2] bg-white/90 text-[#0F3D2E] shadow-md transition-all hover:scale-105 hover:bg-white active:scale-95"
            type="button"
            onClick={nextImage}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </button>

          {/* Main Hero Image */}
          <div className="group-hover:shadow-inner relative flex h-80 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#FBF6EC]/40 transition-all duration-300 sm:h-[420px]">
            {/* Steam Wisps */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center overflow-hidden pt-8"
            >
              {/* Steam 1 */}
              <svg
                className="steam-wisp-1 absolute top-6 h-44 w-20 text-[#D9A441]/30 blur-[2px]"
                fill="none"
                viewBox="0 0 60 140"
              >
                <path
                  d="M25,130 C10,105 45,85 28,55 C15,30 35,15 25,5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="7"
                />
              </svg>

              {/* Steam 2 */}
              <svg
                className="steam-wisp-2 absolute left-1/3 top-4 h-48 w-24 text-white/40 blur-[3px]"
                fill="none"
                viewBox="0 0 60 140"
              >
                <path
                  d="M30,135 C48,110 12,80 32,50 C48,25 25,10 32,0"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>

              {/* Steam 3 */}
              <svg
                className="steam-wisp-3 absolute right-1/3 top-8 h-40 w-16 text-[#D9A441]/35 blur-[1.5px]"
                fill="none"
                viewBox="0 0 60 140"
              >
                <path
                  d="M22,125 C38,100 15,75 30,48 C42,25 20,10 26,2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="6"
                />
              </svg>

              {/* Heat Shimmer */}
              <div className="glow-aura-pulse pointer-events-none absolute inset-x-0 bottom-6 h-32 bg-gradient-to-t from-[#D9A441]/15 via-transparent to-transparent opacity-60" />
            </div>

            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="img-fade-transition h-full w-full transform object-cover object-center transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {images.slice(1).map((image, index) => {
            const actualIndex = index + 1;
            const isActive = selectedImage === actualIndex;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(actualIndex)}
                className={`overflow-hidden rounded-xl border border-[#E6E0D2] bg-white p-1 shadow-sm transition-all focus:outline-none hover:scale-[1.02] ${
                  isActive
                    ? "ring-2 ring-[#D9A441] ring-offset-2"
                    : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-[#D9A441]/60"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="pointer-events-none h-16 w-full rounded-lg object-cover sm:h-20"
                />
              </button>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 divide-y divide-[#E6E0D2]/60 rounded-2xl border border-[#E6E0D2]/80 bg-white p-4 text-center shadow-[0_2px_8px_-2px_rgba(15,61,46,0.06)] md:grid-cols-4 md:divide-x md:divide-y-0">
          {/* 30 MINS */}
          <div className="group/b1 flex cursor-default flex-col items-center justify-center p-2">
            <div className="mb-1.5 flex h-9 w-9 transform items-center justify-center rounded-full bg-[#FBF6EC] text-[#0F3D2E] shadow-sm transition-transform duration-300 group-hover/b1:-translate-y-1 group-hover/b1:scale-110">
              <svg
                className="h-5 w-5 text-[#D9A441]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <span className="text-xs font-bold uppercase tracking-tight text-[#1E2A22]">
              30 MINS
            </span>

            <span className="text-[10px] font-medium text-[#8C968F]">
              Fast Doorstep Delivery
            </span>
          </div>

          {/* 100% HYGIENIC */}
          <div className="group/b2 flex cursor-default flex-col items-center justify-center p-2">
            <div className="mb-1.5 flex h-9 w-9 transform items-center justify-center rounded-full bg-[#FBF6EC] text-[#0F3D2E] shadow-sm transition-transform duration-300 group-hover/b2:-translate-y-1 group-hover/b2:scale-110">
              <svg
                className="h-5 w-5 text-[#0F3D2E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <span className="text-xs font-bold uppercase tracking-tight text-[#1E2A22]">
              100% HYGIENIC
            </span>

            <span className="text-[10px] font-medium text-[#8C968F]">
              FSSAI Certified Kitchen
            </span>
          </div>

          {/* BEST OFFERS */}
          <div className="group/b3 flex cursor-default flex-col items-center justify-center p-2">
            <div className="mb-1.5 flex h-9 w-9 transform items-center justify-center rounded-full bg-[#FBF6EC] text-[#0F3D2E] shadow-sm transition-transform duration-300 group-hover/b3:-translate-y-1 group-hover/b3:scale-110">
              <svg
                className="h-5 w-5 text-[#D9A441]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <span className="text-xs font-bold uppercase tracking-tight text-[#1E2A22]">
              BEST OFFERS
            </span>

            <span className="text-[10px] font-medium text-[#8C968F]">
              Daily App Savings
            </span>
          </div>

          {/* FRESH & HOT */}
          <div className="group/b4 flex cursor-default flex-col items-center justify-center p-2">
            <div className="fresh-benefit-icon mb-1.5 flex h-9 w-9 transform items-center justify-center rounded-full bg-[#FBF6EC] text-[#0F3D2E] shadow-sm transition-transform duration-300 group-hover/b4:-translate-y-1 group-hover/b4:scale-110">
              <svg
                className="h-5 w-5 animate-pulse text-[#B88224]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <span className="text-xs font-bold uppercase tracking-tight text-[#1E2A22]">
              FRESH & HOT
            </span>

            <span className="text-[10px] font-medium text-[#8C968F]">
              Thermal Insulated Pack
            </span>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes steamRise {
          0% {
            transform: translateY(18px) scaleX(0.7) scaleY(0.7);
            opacity: 0;
          }

          25% {
            opacity: 0.55;
          }

          50% {
            transform: translateY(-24px) scaleX(1.15) scaleY(1.1);
            opacity: 0.7;
          }

          80% {
            opacity: 0.3;
          }

          100% {
            transform: translateY(-65px) scaleX(1.4) scaleY(1.3);
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.75;
            transform: scale(1.04);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-150%) rotate(25deg);
          }

          100% {
            transform: translateX(250%) rotate(25deg);
          }
        }

        .steam-wisp-1 {
          animation: steamRise 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .steam-wisp-2 {
          animation: steamRise 4.8s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.4s;
        }

        .steam-wisp-3 {
          animation: steamRise 3.9s cubic-bezier(0.4, 0, 0.2, 1) infinite 2.2s;
        }

        .glow-aura-pulse {
          animation: glowPulse 3.8s ease-in-out infinite;
        }

        .badge-shimmer::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          animation: shimmer 3s infinite ease-in-out;
          pointer-events: none;
        }

        .fresh-benefit-icon:hover {
          animation: glowPulse 1.2s ease-in-out infinite;
        }

        .img-fade-transition {
          transition:
            opacity 0.28s ease-in-out,
            transform 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProductGallery;