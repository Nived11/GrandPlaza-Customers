"use client";

import React from "react";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductRecommendations from "./components/ProductRecommendations";

const ProductMain = () => {
  return (
    <div className="bg-[#FBF6EC] text-[#1E2A22] min-h-screen flex flex-col antialiased">
      <ProductBreadcrumb />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <ProductGallery />
          <ProductInfo />
        </div>
        <ProductRecommendations />
      </main>
    </div>
  );
};

export default ProductMain;