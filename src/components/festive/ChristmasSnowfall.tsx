"use client";

import React, { useMemo } from "react";

export default function ChristmasSnowfall() {
  // Generate random flake positions and timings once
  const flakes = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const left = Math.random() * 100; // 0% to 100%
      const duration = 6 + Math.random() * 8; // 6s to 14s
      const delay = Math.random() * 8; // 0s to 8s
      const size = 3 + Math.random() * 5; // 3px to 8px
      const opacity = 0.25 + Math.random() * 0.45; // subtle translucency
      const blur = size > 5 ? 1 : 0.5;
      const swayDuration = 3 + Math.random() * 3;

      return { id: i, left, duration, delay, size, opacity, blur, swayDuration };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden select-none"
    >
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(15px);
          }
          100% {
            transform: translateY(105vh) translateX(-15px);
          }
        }
      `}</style>

      {flakes.map((f) => (
        <span
          key={f.id}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            left: `${f.left}%`,
            top: "-15px",
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            filter: `blur(${f.blur}px)`,
            boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
            animation: `snowfall ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
