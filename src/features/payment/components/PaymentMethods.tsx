"use client";

import React from "react";
import { ShieldCheck, Smartphone, CreditCard, Landmark, Banknote, CheckCircle2 } from "lucide-react";
import type { PaymentMethod } from "../hook/usePaymentHook";

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

export default function PaymentMethods({ selectedMethod, onSelectMethod }: PaymentMethodsProps) {
  const upiApps = [
    {
      id: "gpay" as PaymentMethod,
      name: "Google Pay",
      tag: "Fastest",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
    },
    {
      id: "phonepe" as PaymentMethod,
      name: "PhonePe",
      tag: "Popular",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-phonepe-logo-icon-download-in-svg-png-gif-file-formats--payment-app-digital-wallet-india-pack-logos-icons-4860265.png",
    },
    {
      id: "paytm" as PaymentMethod,
      name: "Paytm UPI",
      tag: "",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--brand-social-media-pack-logos-icons-4860264.png",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. UPI APPS */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCA] shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F3D2E] flex items-center justify-center">
              <Smartphone size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-800">
                UPI / Google Pay / PhonePe
              </h3>
              <p className="text-[11px] text-gray-500">Pay directly from your UPI app</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {upiApps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onSelectMethod(app.id)}
              className={`flex items-center justify-between sm:flex-col sm:items-start p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer ${
                selectedMethod === app.id
                  ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/10"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 sm:block">
                <img src={app.icon} alt={app.name} className="h-6 w-auto object-contain" />
                <span className="font-semibold text-xs sm:text-sm text-slate-800 sm:mt-2 block">
                  {app.name}
                </span>
              </div>

              {selectedMethod === app.id ? (
                <CheckCircle2 size={18} className="text-[#0F3D2E]" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. OTHER PAYMENT OPTIONS */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EADBCA] shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
          Other Payment Methods
        </h4>

        {/* CARDS */}
        <button
          type="button"
          onClick={() => onSelectMethod("card")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMethod === "card"
              ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/10"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
              <CreditCard size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-sm text-slate-800 block">Credit / Debit Card</span>
              <span className="text-[11px] text-gray-500">Visa, Mastercard, RuPay, Maestro</span>
            </div>
          </div>
          {selectedMethod === "card" ? (
            <CheckCircle2 size={18} className="text-[#0F3D2E]" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-gray-300" />
          )}
        </button>

        {/* NET BANKING */}
        <button
          type="button"
          onClick={() => onSelectMethod("netbanking")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMethod === "netbanking"
              ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/10"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
              <Landmark size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-sm text-slate-800 block">Net Banking</span>
              <span className="text-[11px] text-gray-500">All Indian major banks supported</span>
            </div>
          </div>
          {selectedMethod === "netbanking" ? (
            <CheckCircle2 size={18} className="text-[#0F3D2E]" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-gray-300" />
          )}
        </button>

        {/* CASH ON DELIVERY */}
        <button
          type="button"
          onClick={() => onSelectMethod("cod")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMethod === "cod"
              ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/10"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800">
              <Banknote size={20} />
            </div>
            <div className="text-left">
              <span className="font-semibold text-sm text-slate-800 block">Cash on Delivery</span>
              <span className="text-[11px] text-gray-500">Pay cash or UPI at your doorstep</span>
            </div>
          </div>
          {selectedMethod === "cod" ? (
            <CheckCircle2 size={18} className="text-[#0F3D2E]" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-gray-300" />
          )}
        </button>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-500 py-1">
        <ShieldCheck size={16} className="text-emerald-700" />
        <span>100% Safe & Secure Payments</span>
      </div>
    </div>
  );
}