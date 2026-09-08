"use client";

import React from "react";
import Link from "next/link";

const AddMoreDishes = () => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-[#0F3D2E]/20 bg-[#FBF6EC]/40">
      <div className="flex items-center space-x-3">
        <span className="text-lg">🍽️</span>

        <div>
          <p className="text-xs font-semibold text-[#0F3D2E]">
            Forgot drinks or side starters?
          </p>

          <p className="text-[11px] text-[#1E2A22]/60">
            Browse Arabian platters, mojitos and hot sides
          </p>
        </div>
      </div>

      <Link
        href="#menu"
        className="px-4 py-1.5 text-xs font-bold text-[#0F3D2E] bg-white border border-[#0F3D2E]/15 rounded-full hover:bg-[#0F3D2E] hover:text-white transition shadow-sm"
      >
        + Add More Dishes
      </Link>
    </div>
  );
};

export default AddMoreDishes;