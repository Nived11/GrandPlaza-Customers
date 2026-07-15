"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Initiating OTP login flow for:", phone);
    // Future integration point for Python backend OTP service
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Branding & Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Enter your phone number to receive an OTP</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 text-sm font-medium">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 10-digit number"
                className="w-full pl-14 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-600/10 transition active:scale-[0.98]"
          >
            Send OTP
          </button>
        </form>

        {/* Dynamic Redirect Navigation */}
        <div className="text-center mt-6 pt-6 border-t border-gray-100 text-sm text-gray-600">
          New to Empire Plaza?{" "}
          <Link href="/auth/signup" className="text-orange-600 font-semibold hover:underline">
            Sign Up Now
          </Link>
        </div>

      </div>
    </div>
  );
}