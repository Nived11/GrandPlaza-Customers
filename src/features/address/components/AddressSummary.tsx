"use client";

import React from "react";
import type { AddressData } from "../hook/useAddressHook";

interface AddressSummaryProps {
  selectedAddress: AddressData | null;
  onConfirm: (addressId: number) => void;
  isCreatingOrder: boolean;
}

const AddressSummary = ({
  selectedAddress,
  onConfirm,
  isCreatingOrder,
}: AddressSummaryProps) => {

  return (
    <div className="lg:col-span-4 lg:sticky lg:top-28">
      <div className="bg-[#F7F2E8] border border-[#EADBCA] rounded-3xl p-6 shadow-[0_2px_10px_rgba(15,61,46,0.05)] space-y-5">

        <div className="flex items-center justify-between pb-3 border-b border-[#EADBCA]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#D9A441]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            Selection Summary
          </span>

          <span className="text-[10px] font-bold text-[#0F3D2E] bg-white px-2.5 py-0.5 rounded-full border border-[#EADBCA]">
            Step 2 of 3
          </span>
        </div>

        {selectedAddress ? (
          <div className="bg-white rounded-2xl p-4 border border-[#EADBCA] shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#78716C] block">
              Deliver To
            </span>

            <h3 className="text-sm font-bold text-[#0F3D2E] tracking-tight uppercase">
              {selectedAddress.address_type} ({selectedAddress.pincode})
            </h3>

            <p className="text-xs text-stone-600 break-words">
              {selectedAddress.address_line}, {selectedAddress.city},{" "}
              {selectedAddress.state}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#EADBCA] text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
              No Address Saved
            </p>

            <p className="text-[11px] text-stone-400 mt-0.5">
              Please add an address to proceed
            </p>
          </div>
        )}

        <div className="flex items-center gap-2.5 text-xs font-medium text-[#0F3D2E] bg-[#FDFBF7] p-3 rounded-xl border border-[#EADBCA]">
          <span className="text-base leading-none text-[#D9A441]">
            ⚡
          </span>

          <span className="text-xs text-[#0F3D2E]">
            <strong>30–35 mins</strong> Delivery from Malappuram Central
            Kitchen
          </span>
        </div>

        <button
          type="button"
          disabled={!selectedAddress || isCreatingOrder}
          onClick={() => {
            if (selectedAddress) {
              onConfirm(selectedAddress.id);
            }
          }}
          className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 group ${
            selectedAddress && !isCreatingOrder
              ? "bg-[#0F3D2E] hover:bg-[#185843] text-white shadow-[0_8px_24px_-4px_rgba(15,61,46,0.09)]"
              : "bg-[#CBD5E1] text-stone-500 cursor-not-allowed"
          }`}
        >
          <span>
            {isCreatingOrder ? "Creating Order..." : "Confirm Address"}
          </span>
        
          <svg
            className="w-4 h-4 text-[#D9A441] group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M14 5l7 7m0 0l-7 7m7-7H3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-[#0F3D2E] transition-colors"
          >
            ‹ Back to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddressSummary;