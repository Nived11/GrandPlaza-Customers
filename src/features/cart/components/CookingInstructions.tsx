"use client";

import React from "react";

const CookingInstructions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-warm-md border border-[#0F3D2E]/5 p-6">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[#0F3D2E] shrink-0">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="flex-1">
          <label
            htmlFor="cooking-instructions"
            className="block text-sm font-semibold text-[#0F3D2E] mb-1"
          >
            Special Cooking Instructions or Dietary Requests
          </label>

          <p className="text-xs text-[#1E2A22]/55 mb-3">
            Let our chefs know if you have any special requests.
          </p>

          <textarea
            id="cooking-instructions"
            rows={2}
            placeholder="E.g., Please make the burger sauce mild and pack cutlery separately..."
            className="w-full rounded-xl border border-[#0F3D2E]/15 bg-[#FBF6EC]/30 px-4 py-3 text-sm text-[#1E2A22] placeholder:text-[#1E2A22]/35 focus:outline-none focus:ring-2 focus:ring-[#D9A441]/30 focus:border-[#D9A441] resize-none transition"
          />
        </div>
      </div>
    </div>
  );
};

export default CookingInstructions;