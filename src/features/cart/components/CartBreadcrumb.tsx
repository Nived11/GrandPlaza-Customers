"use client";

import React from "react";
import Link from "next/link";

const CartBreadcrumb = () => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs font-medium text-ink/50 mb-4 space-x-2"
    >
      <Link href="/" className="hover:text-forest transition-colors">
        Home
      </Link>

      <span>/</span>

      <Link href="/menu" className="hover:text-forest transition-colors">
        Menu
      </Link>

      <span>/</span>

      <span className="text-forest font-semibold">Your Cart</span>
    </nav>
  );
};

export default CartBreadcrumb;