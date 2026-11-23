"use client";

import React from "react";

export default function OnamHeaderTrim() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[52] overflow-visible select-none"
    >
      <style jsx>{`
        @keyframes onamFlowerGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.4));
            transform: scale(0.96);
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.9)) drop-shadow(0 0 10px rgba(234, 88, 12, 0.6));
            transform: scale(1.08);
          }
        }
        @keyframes garlandSway {
          0%, 100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }
        .onam-flower {
          animation: onamFlowerGlow 2.8s ease-in-out infinite;
        }
        .garland-sway {
          transform-origin: top center;
          animation: garlandSway 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* ========================================================
          🖥️ DESKTOP ONAM FESTIVE TRIM (MARIGOLD & KASAVU)
      ======================================================== */}
      <div className="hidden md:block w-full relative h-14">
        {/* SVG Floral Marigold Swags Across Header */}
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 object-cover"
          preserveAspectRatio="none"
        >
          {/* Golden Kasavu & Marigold Thread Swags */}
          <path
            d="M 10 4 Q 90 22, 170 8 Q 250 24, 330 9 Q 410 23, 490 8 Q 530 18, 570 7"
            stroke="rgba(245, 158, 11, 0.55)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
          />
          <path
            d="M 870 7 Q 910 18, 950 8 Q 1030 23, 1110 9 Q 1190 24, 1270 8 Q 1350 22, 1430 4"
            stroke="rgba(245, 158, 11, 0.55)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
          />

          {/* Left Wing Marigold (Chendumalli) Flowers */}
          <circle cx="50" cy="14" r="4.5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.1s" }} />
          <circle cx="90" cy="22" r="5" fill="#EA580C" className="onam-flower" style={{ animationDelay: "0.6s" }} />
          <circle cx="130" cy="15" r="4.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "1.2s" }} />
          <circle cx="210" cy="17" r="5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.4s" }} />
          <circle cx="250" cy="24" r="5.5" fill="#EA580C" className="onam-flower" style={{ animationDelay: "1.7s" }} />
          <circle cx="290" cy="16" r="4.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "0.9s" }} />
          <circle cx="370" cy="16" r="5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "1.0s" }} />
          <circle cx="410" cy="23" r="5" fill="#EA580C" className="onam-flower" style={{ animationDelay: "0.3s" }} />
          <circle cx="450" cy="15" r="4.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "1.5s" }} />
          <circle cx="530" cy="16" r="4" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.8s" }} />

          {/* Right Wing Marigold Flowers */}
          <circle cx="910" cy="16" r="4" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.5s" }} />
          <circle cx="950" cy="8" r="4.5" fill="#EA580C" className="onam-flower" style={{ animationDelay: "1.1s" }} />
          <circle cx="990" cy="17" r="5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "0.2s" }} />
          <circle cx="1070" cy="16" r="5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "1.3s" }} />
          <circle cx="1110" cy="23" r="5.5" fill="#EA580C" className="onam-flower" style={{ animationDelay: "0.6s" }} />
          <circle cx="1150" cy="16" r="4.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "1.8s" }} />
          <circle cx="1230" cy="16" r="5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.3s" }} />
          <circle cx="1270" cy="24" r="5" fill="#EA580C" className="onam-flower" style={{ animationDelay: "1.0s" }} />
          <circle cx="1310" cy="15" r="4.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "1.6s" }} />
          <circle cx="1390" cy="12" r="4" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.4s" }} />
        </svg>

        {/* Traditional Hanging Floral Pendants (Tassels) */}
        <div className="absolute left-6 top-1 garland-sway flex flex-col items-center">
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#F59E0B] to-amber-300" />
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md border border-yellow-200/50 flex items-center justify-center text-[8px]">
            🌼
          </div>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-xs -mt-1 flex items-center justify-center text-[6px]">
            🌸
          </div>
        </div>

        <div className="absolute right-6 top-1 garland-sway flex flex-col items-center" style={{ animationDelay: "1.5s" }}>
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#F59E0B] to-amber-300" />
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md border border-yellow-200/50 flex items-center justify-center text-[8px]">
            🌼
          </div>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-xs -mt-1 flex items-center justify-center text-[6px]">
            🌸
          </div>
        </div>
      </div>

      {/* ========================================================
          📱 MOBILE ONAM HEADER TRIM
      ======================================================== */}
      <div className="block md:hidden w-full relative h-10">
        <svg
          viewBox="0 0 390 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 object-cover"
          preserveAspectRatio="none"
        >
          {/* Left Wing */}
          <path
            d="M 5 2 Q 45 16, 85 6 Q 115 16, 140 5"
            stroke="rgba(245, 158, 11, 0.5)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
          />
          {/* Right Wing */}
          <path
            d="M 250 5 Q 275 16, 305 6 Q 345 16, 385 2"
            stroke="rgba(245, 158, 11, 0.5)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Mobile Flowers */}
          <circle cx="25" cy="10" r="3.5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.2s" }} />
          <circle cx="65" cy="14" r="4" fill="#EA580C" className="onam-flower" style={{ animationDelay: "0.7s" }} />
          <circle cx="105" cy="11" r="3.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "1.1s" }} />
          <circle cx="135" cy="6" r="3" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.4s" }} />

          <circle cx="255" cy="6" r="3" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.3s" }} />
          <circle cx="285" cy="11" r="3.5" fill="#FBBF24" className="onam-flower" style={{ animationDelay: "1.3s" }} />
          <circle cx="325" cy="14" r="4" fill="#EA580C" className="onam-flower" style={{ animationDelay: "0.8s" }} />
          <circle cx="365" cy="10" r="3.5" fill="#F59E0B" className="onam-flower" style={{ animationDelay: "0.5s" }} />
        </svg>

        {/* Small corner floral tassels */}
        <div className="absolute left-2 top-0.5 garland-sway flex flex-col items-center">
          <div className="w-[1px] h-3 bg-amber-400" />
          <span className="text-[9px]">🌼</span>
        </div>
        <div className="absolute right-2 top-0.5 garland-sway flex flex-col items-center" style={{ animationDelay: "1s" }}>
          <div className="w-[1px] h-3 bg-amber-400" />
          <span className="text-[9px]">🌼</span>
        </div>
      </div>
    </div>
  );
}
