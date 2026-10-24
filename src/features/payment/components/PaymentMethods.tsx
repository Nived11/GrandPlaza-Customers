"use client";

import React from "react";
import {
  ShieldCheck,
  Smartphone,
  CreditCard,
  Landmark,
  Banknote,
  CheckCircle2,
  QrCode,
  Lock,
} from "lucide-react";
import type { PaymentMethod } from "../hook/usePaymentHook";

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  isCodEnabled?: boolean;
}

// 🌐 Pure inline vector SVG for Google Pay
function GPayLogo() {
  return (
    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/90 shadow-xs flex items-center justify-center shrink-0 p-2">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <path
          d="M23.04 12.261c0-.82-.073-1.609-.21-2.37H12v4.482h6.19c-.267 1.442-1.08 2.664-2.3 3.48v2.89h3.725c2.18-2.008 3.425-4.965 3.425-8.482z"
          fill="#4285F4"
        />
        <path
          d="M12 23.49c3.105 0 5.71-1.03 7.614-2.787l-3.725-2.89c-1.03.69-2.347 1.097-3.889 1.097-2.99 0-5.52-2.02-6.425-4.736H1.727v2.98C3.627 20.916 7.534 23.49 12 23.49z"
          fill="#34A853"
        />
        <path
          d="M5.575 14.174a6.924 6.924 0 010-4.348V6.846H1.727a11.492 11.492 0 000 10.308l3.848-2.98z"
          fill="#FBBC05"
        />
        <path
          d="M12 4.483c1.688 0 3.204.58 4.4 1.716l3.3-3.3C17.705 1.03 15.099 0 12 0 7.534 0 3.627 2.574 1.727 6.846l3.848 2.98C6.48 7.11 9.01 4.483 12 4.483z"
          fill="#EA4335"
        />
      </svg>
    </div>
  );
}

// 🌐 Pure inline vector SVG for PhonePe
function PhonePeLogo() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#5F259F] shadow-xs flex items-center justify-center shrink-0 p-2">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M10.206 9.941h2.949v4.692c-.402.201-.938.268-1.34.268-1.072 0-1.609-.536-1.609-1.743V9.941zm13.47 4.816c-1.523 6.449-7.985 10.442-14.433 8.919C2.794 22.154-1.199 15.691.324 9.243 1.847 2.794 8.309-1.199 14.757.324c6.449 1.523 10.442 7.985 8.919 14.433zm-6.231-5.888a.887.887 0 0 0-.871-.871h-1.609l-3.686-4.222c-.335-.402-.871-.536-1.407-.402l-1.274.401c-.201.067-.268.335-.134.469l4.021 3.82H6.386c-.201 0-.335.134-.335.335v.67c0 .469.402.871.871.871h.938v3.217c0 2.413 1.273 3.82 3.418 3.82.67 0 1.206-.067 1.877-.335v2.145c0 .603.469 1.072 1.072 1.072h.938a.432.432 0 0 0 .402-.402V9.874h1.542c.201 0 .335-.134.335-.335v-.67z" />
      </svg>
    </div>
  );
}

// 🌐 Pure inline vector SVG for Paytm
function PaytmLogo() {
  return (
    <div className="w-10 h-10 rounded-xl bg-[#002E6E] shadow-xs flex items-center justify-center shrink-0 p-2">
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#00BAF2">
        <path d="M15.85 8.167a.204.204 0 0 0-.04.004c-.68.19-.543 1.148-1.781 1.23h-.12a.23.23 0 0 0-.052.005h-.001a.24.24 0 0 0-.184.235v1.09c0 .134.106.241.237.241h.645v4.623c0 .132.104.238.233.238h1.058a.236.236 0 0 0 .233-.238v-4.623h.6c.13 0 .236-.107.236-.241v-1.09a.239.239 0 0 0-.236-.24h-.612V8.386a.218.218 0 0 0-.216-.22zm4.225 1.17c-.398 0-.762.15-1.042.395v-.124a.238.238 0 0 0-.234-.224h-1.07a.24.24 0 0 0-.236.242v5.92a.24.24 0 0 0 .236.242h1.07c.12 0 .217-.091.233-.209v-4.25a.393.393 0 0 1 .371-.408h.196a.41.41 0 0 1 .226.09.405.405 0 0 1 .145.319v4.074l.004.155a.24.24 0 0 0 .237.241h1.07a.239.239 0 0 0 .235-.23l-.001-4.246c0-.14.062-.266.174-.34a.419.419 0 0 1 .196-.068h.198c.23.02.37.2.37.408.005 1.396.004 2.8.004 4.224a.24.24 0 0 0 .237.241h1.07c.13 0 .236-.108.236-.241v-4.543c0-.31-.034-.442-.08-.577a1.601 1.601 0 0 0-1.51-1.09h-.015a1.58 1.58 0 0 0-1.152.5c-.291-.308-.7-.5-1.153-.5zM.232 9.4A.234.234 0 0 0 0 9.636v5.924c0 .132.096.238.216.241h1.09c.13 0 .237-.107.237-.24l.004-1.658H2.57c.857 0 1.453-.605 1.453-1.481v-1.538c0-.877-.596-1.484-1.453-1.484H.232zm9.032 0a.239.239 0 0 0-.237.241v2.47c0 .94.657 1.608 1.579 1.608h.675s.016 0 .037.004a.253.253 0 0 1 .222.253c0 .13-.096.235-.219.251l-.018.004-.303.006H9.739a.239.239 0 0 0-.236.24v1.09a.24.24 0 0 0 .236.242h1.75c.92 0 1.577-.669 1.577-1.608v-4.56a.239.239 0 0 0-.236-.24h-1.07a.239.239 0 0 0-.236.24c-.005.787 0 1.525 0 2.255a.253.253 0 0 1-.25.25h-.449a.253.253 0 0 1-.25-.255c.005-.754-.005-1.5-.005-2.25a.239.239 0 0 0-.236-.24zm-4.004.006a.232.232 0 0 0-.238.226v1.023c0 .132.113.24.252.24h1.413c.112.017.2.1.213.23v.14c-.013.124-.1.214-.207.224h-.7c-.93 0-1.594.63-1.594 1.515v1.269c0 .88.57 1.506 1.495 1.506h1.94c.348 0 .63-.27.63-.6v-4.136c0-1.004-.508-1.637-1.72-1.637zm-3.713 1.572h.678c.139 0 .25.115.25.256v.836a.253.253 0 0 1-.25.256h-.1c-.192.002-.386 0-.578 0zm4.67 1.977h.445c.139 0 .252.108.252.24v.932a.23.23 0 0 1-.014.076.25.25 0 0 1-.238.164h-.445a.247.247 0 0 1-.252-.24v-.933c0-.132.113-.239.252-.239Z" />
      </svg>
    </div>
  );
}

// 🌐 Pure inline vector SVG for generic UPI & QR Code
function UpiGenericLogo() {
  return (
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F3D2E] to-[#1E6B52] shadow-xs flex items-center justify-center shrink-0 p-2 text-[#D4AF37]">
      <QrCode size={22} />
    </div>
  );
}

export default function PaymentMethods({
  selectedMethod,
  onSelectMethod,
  isCodEnabled = false,
}: PaymentMethodsProps) {
  const upiApps = [
    {
      id: "gpay" as PaymentMethod,
      name: "Google Pay",
      subtitle: "Instant via GPay UPI",
      tag: "Fastest",
      icon: <GPayLogo />,
    },
    {
      id: "phonepe" as PaymentMethod,
      name: "PhonePe",
      subtitle: "Direct UPI & QR",
      tag: "Popular",
      icon: <PhonePeLogo />,
    },
    {
      id: "paytm" as PaymentMethod,
      name: "Paytm UPI",
      subtitle: "Paytm & Wallets",
      tag: "",
      icon: <PaytmLogo />,
    },
    {
      id: "upi_qr" as PaymentMethod,
      name: "Other UPI / QR",
      subtitle: "CRED, BHIM & All Apps",
      tag: "QR Code",
      icon: <UpiGenericLogo />,
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
              <p className="text-[11px] text-gray-500">Pay directly with your preferred UPI app</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {upiApps.map((app) => {
            const isSelected = selectedMethod === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onSelectMethod(app.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer ${
                  isSelected
                    ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/15 shadow-xs"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 bg-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {app.icon}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {app.name}
                      </span>
                      {app.tag && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                          {app.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500 block truncate">
                      {app.subtitle}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {isSelected ? (
                    <CheckCircle2 size={20} className="text-[#0F3D2E] fill-emerald-100" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-400 transition" />
                  )}
                </div>
              </button>
            );
          })}
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
              ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/15 shadow-xs"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
              <CreditCard size={20} />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-slate-800">Credit / Debit Card</span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    VISA
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                    Mastercard
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    RuPay
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-gray-500 block">
                All major domestic & international cards supported
              </span>
            </div>
          </div>
          <div className="shrink-0 ml-2">
            {selectedMethod === "card" ? (
              <CheckCircle2 size={20} className="text-[#0F3D2E] fill-emerald-100" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}
          </div>
        </button>

        {/* NET BANKING */}
        <button
          type="button"
          onClick={() => onSelectMethod("netbanking")}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedMethod === "netbanking"
              ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/15 shadow-xs"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
              <Landmark size={20} />
            </div>
            <div className="text-left min-w-0">
              <span className="font-bold text-sm text-slate-800 block">Net Banking</span>
              <span className="text-[11px] text-gray-500 block">
                HDFC, SBI, ICICI, Axis & 50+ Indian banks
              </span>
            </div>
          </div>
          <div className="shrink-0 ml-2">
            {selectedMethod === "netbanking" ? (
              <CheckCircle2 size={20} className="text-[#0F3D2E] fill-emerald-100" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}
          </div>
        </button>

        {/* CASH ON DELIVERY (Only shown when enabled by restaurant admin) */}
        {isCodEnabled && (
          <button
            type="button"
            onClick={() => onSelectMethod("cod")}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedMethod === "cod"
                ? "border-[#0F3D2E] bg-[#F4F9F6] ring-2 ring-[#0F3D2E]/15 shadow-xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 shrink-0">
                <Banknote size={20} />
              </div>
              <div className="text-left min-w-0">
                <span className="font-bold text-sm text-slate-800 block">Cash on Delivery</span>
                <span className="text-[11px] text-gray-500 block">
                  Pay cash or UPI directly to delivery partner at doorstep
                </span>
              </div>
            </div>
            <div className="shrink-0 ml-2">
              {selectedMethod === "cod" ? (
                <CheckCircle2 size={20} className="text-[#0F3D2E] fill-emerald-100" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
            </div>
          </button>
        )}
      </div>

      {/* Trust & Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-stone-500 py-1 bg-stone-50/80 rounded-2xl border border-stone-200/60 p-2.5">
        <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
        <span className="font-medium text-[11px] text-stone-600">
          100% Secure Payments • 256-Bit SSL Encryption • RBI Authorized Gateway
        </span>
      </div>
    </div>
  );
}
