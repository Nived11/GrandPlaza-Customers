"use client";

import React from "react";

export default function ChristmasHeaderTrim() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[52] overflow-visible select-none"
    >
      <style jsx>{`
        @keyframes fairyLightGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.9);
            filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.4));
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
            filter: drop-shadow(0 0 6px rgba(255, 223, 0, 0.9)) drop-shadow(0 0 10px rgba(255, 179, 0, 0.6));
          }
        }
        @keyframes ornamentSway {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .fairy-light {
          animation: fairyLightGlow 2.4s ease-in-out infinite;
        }
        .ornament-sway {
          transform-origin: top center;
          animation: ornamentSway 4s ease-in-out infinite;
        }
      `}</style>

      {/* ========================================================
          🖥️ DESKTOP FESTIVE HEADER TRIM (FIRST VERSION)
      ======================================================== */}
      <div className="hidden md:block w-full relative h-14">
        {/* SVG Fairy Light Swags Across Desktop Header */}
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 object-cover"
          preserveAspectRatio="none"
        >
          {/* Fairy Light Swags (Curved Strings) */}
          <path
            d="M 10 4 Q 90 22, 170 8 Q 250 24, 330 9 Q 410 23, 490 8 Q 530 18, 570 7"
            stroke="rgba(212, 175, 55, 0.45)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 870 7 Q 910 18, 950 8 Q 1030 23, 1110 9 Q 1190 24, 1270 8 Q 1350 22, 1430 4"
            stroke="rgba(212, 175, 55, 0.45)"
            strokeWidth="1"
            fill="none"
          />

          {/* Twinkling Golden & Ruby Fairy Light Bulbs */}
          {/* Left Wing Lights */}
          <circle cx="50" cy="14" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.1s" }} />
          <circle cx="90" cy="22" r="3" fill="#FF5252" className="fairy-light" style={{ animationDelay: "0.7s" }} />
          <circle cx="130" cy="15" r="3" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "1.3s" }} />
          <circle cx="210" cy="17" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.4s" }} />
          <circle cx="250" cy="24" r="3" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "1.8s" }} />
          <circle cx="290" cy="16" r="3" fill="#FF5252" className="fairy-light" style={{ animationDelay: "0.9s" }} />
          <circle cx="370" cy="16" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "1.1s" }} />
          <circle cx="410" cy="23" r="3" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "0.3s" }} />
          <circle cx="450" cy="15" r="3" fill="#FF5252" className="fairy-light" style={{ animationDelay: "1.6s" }} />
          <circle cx="530" cy="16" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.8s" }} />

          {/* Right Wing Lights */}
          <circle cx="910" cy="16" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.5s" }} />
          <circle cx="950" cy="8" r="3" fill="#FF5252" className="fairy-light" style={{ animationDelay: "1.2s" }} />
          <circle cx="990" cy="17" r="3" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "0.2s" }} />
          <circle cx="1070" cy="16" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "1.4s" }} />
          <circle cx="1110" cy="23" r="3" fill="#FF5252" className="fairy-light" style={{ animationDelay: "0.6s" }} />
          <circle cx="1150" cy="16" r="3" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "1.9s" }} />
          <circle cx="1230" cy="16" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.3s" }} />
          <circle cx="1270" cy="24" r="3" fill="#FF5252" className="fairy-light" style={{ animationDelay: "1.0s" }} />
          <circle cx="1310" cy="15" r="3" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "1.7s" }} />
          <circle cx="1390" cy="12" r="3" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.4s" }} />
        </svg>

        {/* Hanging Miniature Christmas Ornaments at Edges */}
        <div className="absolute left-6 top-1 ornament-sway flex flex-col items-center">
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#D4AF37] to-amber-200" />
          <div className="w-2.5 h-1.5 bg-[#D4AF37] rounded-xs shadow-xs" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 via-rose-600 to-red-950 shadow-[0_2px_8px_rgba(220,38,38,0.5)] border border-amber-300/40 relative">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.4px]" />
          </div>
        </div>

        <div className="absolute right-8 top-1 ornament-sway flex flex-col items-center" style={{ animationDelay: "-2s" }}>
          <div className="w-[1px] h-7 bg-gradient-to-b from-[#D4AF37] to-amber-200" />
          <div className="w-2.5 h-1.5 bg-[#D4AF37] rounded-xs shadow-xs" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-200 via-[#D4AF37] to-amber-800 shadow-[0_2px_8px_rgba(212,175,55,0.6)] border border-amber-100/60 relative">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/80 blur-[0.4px]" />
          </div>
        </div>
      </div>

      {/* ========================================================
          📱 MOBILE FESTIVE HEADER TRIM
      ======================================================== */}
      <div className="md:hidden w-full relative h-10 overflow-hidden">
        <svg
          viewBox="0 0 390 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 object-cover"
          preserveAspectRatio="none"
        >
          {/* Fairy Light Swags */}
          <circle cx="25" cy="9" r="2.2" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.2s" }} />
          <circle cx="65" cy="12" r="2.2" fill="#FF5252" className="fairy-light" style={{ animationDelay: "0.9s" }} />
          <circle cx="105" cy="8" r="2.2" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "1.5s" }} />
          <circle cx="165" cy="11" r="2.2" fill="#FFE082" className="fairy-light" style={{ animationDelay: "0.4s" }} />
          <circle cx="225" cy="11" r="2.2" fill="#FF5252" className="fairy-light" style={{ animationDelay: "1.1s" }} />
          <circle cx="285" cy="8" r="2.2" fill="#FFD54F" className="fairy-light" style={{ animationDelay: "0.7s" }} />
          <circle cx="325" cy="12" r="2.2" fill="#FFE082" className="fairy-light" style={{ animationDelay: "1.8s" }} />
          <circle cx="365" cy="9" r="2.2" fill="#FF5252" className="fairy-light" style={{ animationDelay: "0.3s" }} />
        </svg>

        <div className="absolute right-3 top-0 ornament-sway flex flex-col items-center">
          <div className="w-[1px] h-3.5 bg-gradient-to-b from-[#D4AF37] to-amber-200" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-red-500 via-rose-600 to-red-950 shadow-xs border border-amber-300/40 relative">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
