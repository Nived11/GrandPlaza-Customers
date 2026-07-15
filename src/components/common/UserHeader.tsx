"use client";

import React from "react";
import Link from "next/link";

export default function UserHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50 shadow-sm">
      <Link href="/" className="text-xl font-bold text-orange-600">
        Empire Plaza
      </Link>
      
      <nav className="flex gap-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <Link href="/menu" className="hover:text-orange-600 transition">Menu</Link>
        <Link href="/cart" className="hover:text-orange-600 transition">Cart</Link>
        <Link href="/profile" className="hover:text-orange-600 transition">Profile</Link>
        <Link href="/about" className="hover:text-orange-600 transition">About</Link>
        <Link href="/contact" className="hover:text-orange-600 transition">Contact</Link>
      </nav>

      <div className="flex gap-4">
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-orange-600 self-center">
          Sign In
        </Link>
      </div>
    </header>
  );
}