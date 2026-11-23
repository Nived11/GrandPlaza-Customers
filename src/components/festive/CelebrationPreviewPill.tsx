"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useCelebrationTheme } from "@/context/CelebrationThemeContext";

export default function CelebrationPreviewPill() {
  const { isCelebrationActive, toggleCelebration, activeTheme } = useCelebrationTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-[999] font-sans">
      <button
        type="button"
        onClick={toggleCelebration}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-lg border backdrop-blur-md active:scale-95 cursor-pointer ${
          isCelebrationActive
            ? "bg-[#063b27]/90 text-[#FFE082] border-[#D4AF37] shadow-[0_4px_16px_rgba(6,59,39,0.4)]"
            : "bg-white/90 text-gray-700 border-gray-300 hover:border-gray-400 shadow-md"
        }`}
        title="Click to toggle between Festive Celebration Mode and Original Clean UI"
      >
        <span className="text-sm">
          {isCelebrationActive ? "🎄" : "⚪"}
        </span>
        <span>
          {isCelebrationActive ? "Christmas Mode: ON" : "Original UI: Normal"}
        </span>
        <Sparkles size={12} className={isCelebrationActive ? "text-[#D4AF37] animate-pulse" : "text-gray-400"} />
      </button>
    </div>
  );
}
