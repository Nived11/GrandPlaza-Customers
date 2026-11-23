"use client";

import React from "react";

export default function VishuHeaderTrim() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[52] overflow-visible select-none"
    >
      <style jsx>{`
        @keyframes vishuGlow {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(250, 204, 21, 0.4));
            transform: scale(0.95);
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.9)) drop-shadow(0 0 10px rgba(234, 179, 8, 0.6));
            transform: scale(1.1);
          }
        }
        .vishu-blossom {
          animation: vishuGlow 2.6s ease-in-out infinite;
        }
      `}</style>

      {/* Desktop Vishu Kanikkonna Blossoms */}
      <div className="hidden md:block w-full relative h-14">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M 10 4 Q 90 22, 170 8 Q 250 24, 330 9 Q 410 23, 490 8 Q 530 18, 570 7"
            stroke="rgba(250, 204, 21, 0.55)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 870 7 Q 910 18, 950 8 Q 1030 23, 1110 9 Q 1190 24, 1270 8 Q 1350 22, 1430 4"
            stroke="rgba(250, 204, 21, 0.55)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Golden Kanikkonna Blossom clusters */}
          <circle cx="50" cy="14" r="4" fill="#FDE047" className="vishu-blossom" style={{ animationDelay: "0.1s" }} />
          <circle cx="90" cy="22" r="4.5" fill="#FACC15" className="vishu-blossom" style={{ animationDelay: "0.6s" }} />
          <circle cx="130" cy="15" r="4" fill="#FEF08A" className="vishu-blossom" style={{ animationDelay: "1.2s" }} />
          <circle cx="210" cy="17" r="4.5" fill="#FACC15" className="vishu-blossom" style={{ animationDelay: "0.4s" }} />
          <circle cx="250" cy="24" r="5" fill="#EAB308" className="vishu-blossom" style={{ animationDelay: "1.7s" }} />
          <circle cx="290" cy="16" r="4" fill="#FDE047" className="vishu-blossom" style={{ animationDelay: "0.9s" }} />
          <circle cx="370" cy="16" r="4.5" fill="#FACC15" className="vishu-blossom" style={{ animationDelay: "1.0s" }} />
          <circle cx="410" cy="23" r="5" fill="#FEF08A" className="vishu-blossom" style={{ animationDelay: "0.3s" }} />

          <circle cx="910" cy="16" r="4" fill="#FACC15" className="vishu-blossom" style={{ animationDelay: "0.5s" }} />
          <circle cx="950" cy="8" r="4.5" fill="#FDE047" className="vishu-blossom" style={{ animationDelay: "1.1s" }} />
          <circle cx="990" cy="17" r="5" fill="#FEF08A" className="vishu-blossom" style={{ animationDelay: "0.2s" }} />
          <circle cx="1070" cy="16" r="4.5" fill="#FACC15" className="vishu-blossom" style={{ animationDelay: "1.3s" }} />
          <circle cx="1110" cy="23" r="5" fill="#EAB308" className="vishu-blossom" style={{ animationDelay: "0.6s" }} />
          <circle cx="1230" cy="16" r="4.5" fill="#FDE047" className="vishu-blossom" style={{ animationDelay: "0.3s" }} />
          <circle cx="1270" cy="24" r="5" fill="#FACC15" className="vishu-blossom" style={{ animationDelay: "1.0s" }} />
        </svg>
      </div>

      {/* Mobile Vishu */}
      <div className="block md:hidden w-full relative h-10">
        <svg
          viewBox="0 0 390 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 object-cover"
          preserveAspectRatio="none"
        >
          <path d="M 5 2 Q 45 16, 85 6 Q 115 16, 140 5" stroke="rgba(250, 204, 21, 0.5)" strokeWidth="1.2" fill="none" />
          <path d="M 250 5 Q 275 16, 305 6 Q 345 16, 385 2" stroke="rgba(250, 204, 21, 0.5)" strokeWidth="1.2" fill="none" />
          <circle cx="25" cy="10" r="3" fill="#FACC15" className="vishu-blossom" />
          <circle cx="65" cy="14" r="3.5" fill="#FDE047" className="vishu-blossom" />
          <circle cx="105" cy="11" r="3" fill="#EAB308" className="vishu-blossom" />
          <circle cx="285" cy="11" r="3" fill="#FDE047" className="vishu-blossom" />
          <circle cx="325" cy="14" r="3.5" fill="#FACC15" className="vishu-blossom" />
        </svg>
      </div>
    </div>
  );
}
