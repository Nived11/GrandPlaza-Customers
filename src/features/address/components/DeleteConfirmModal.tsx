"use client";

import React from "react";
import { Trash2, X, Loader2 } from "lucide-react";
import type { AddressData } from "../hook/useAddressHook";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  address: AddressData | null;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  address,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  if (!isOpen || !address) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EADBCA] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors disabled:opacity-50"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Trash Icon */}
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Trash2 className="w-7 h-7" />
        </div>

        {/* Title & Description */}
        <div className="text-center space-y-1 mb-5">
          <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#0F3D2E]">
            Delete Address?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">
            Are you sure you want to remove this delivery address? You can add it back anytime.
          </p>
        </div>

        {/* Address Card Preview */}
        <div className="bg-[#FAF5EB] rounded-2xl p-4 border border-[#EADBCA] mb-6 text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0F3D2E] bg-white px-2.5 py-0.5 rounded-md border border-[#EADBCA]">
              {address.address_type}
            </span>
            {address.is_default && (
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D9A441]/15 text-[#8C6415] border border-[#D9A441]/30">
                Default
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-stone-800 pt-0.5">
            {address.full_name}
          </p>
          <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
            {address.address_line}, {address.city} - {address.pincode}
          </p>
          <p className="text-[11px] text-stone-500 font-medium">
            Phone: +91 {address.phone_number}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Address</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
