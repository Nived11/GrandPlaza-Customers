"use client";

import React from "react";

const ProductBreadcrumb = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-3 sm:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-xs font-medium text-[#8C968F]"
      >
        <a
          href="#"
          className="transition-colors hover:text-[#0F3D2E]"
        >
          Home
        </a>

        <span className="text-[#E6E0D2]">/</span>

        <a
          href="#"
          className="transition-colors hover:text-[#0F3D2E]"
        >
          Menu
        </a>

        <span className="text-[#E6E0D2]">/</span>

        <a
          href="#"
          className="transition-colors hover:text-[#0F3D2E]"
        >
          Burgers
        </a>

        <span className="text-[#E6E0D2]">/</span>

        <span className="font-semibold text-[#1E2A22]">
          Updated Chicken Burger
        </span>
      </nav>
    </div>
  );
};

export default ProductBreadcrumb;