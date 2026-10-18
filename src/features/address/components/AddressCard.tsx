"use client";

import React from "react";
import { Check, Pencil, Trash2, Loader2, Home, Briefcase, MapPin } from "lucide-react";
import type { AddressData } from "../hook/useAddressHook";

interface AddressCardProps {
  address: AddressData;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleDefault?: (address: AddressData, makeDefault: boolean) => void;
  isDeleting: boolean;
  isUpdatingDefault?: boolean;
}

const AddressCard = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleDefault,
  isDeleting,
  isUpdatingDefault = false,
}: AddressCardProps) => {
  const normType = (address.address_type || "home").toLowerCase();
  const isHome = normType === "home";
  const isWork = normType === "work" || normType === "office";

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer relative rounded-2xl p-5 sm:p-6 transition-all duration-200 ${
        isSelected
          ? "border-2 border-[#0F3D2E] bg-[#FDFBF7] shadow-[0_8px_24px_-4px_rgba(15,61,46,0.12)] ring-1 ring-[#0F3D2E]/10"
          : "border border-[#EADBCA] bg-white shadow-[0_2px_10px_rgba(15,61,46,0.05)] hover:border-[#D9A441]/70 hover:shadow-[0_8px_24px_-4px_rgba(15,61,46,0.09)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left Side: Icon & Details */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          {/* Address Type Icon */}
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-colors ${
              isHome
                ? "bg-[#D9A441] text-white"
                : isWork
                ? "bg-[#0F3D2E] text-[#D9A441]"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {isHome ? (
              <Home className="w-5 h-5" />
            ) : isWork ? (
              <Briefcase className="w-5 h-5" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </div>

          {/* Address Text Content */}
          <div className="space-y-1.5 min-w-0 flex-1">
            {/* Header Tags: Type, Selected Badge, Default Badge & Toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-[#0F3D2E] tracking-wider uppercase">
                {address.address_type}
              </h2>

              {/* Selection Badge */}
              {isSelected && (
                <span className="bg-[#0F3D2E] text-[#D9A441] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                  Delivering Here
                </span>
              )}

              {/* Default Badge */}
              {address.is_default && (
                <span className="bg-[#D9A441]/15 text-[#8C6415] border border-[#D9A441]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Default
                </span>
              )}

              {/* Default Toggle Actions */}
              {onToggleDefault && (
                <>
                  {address.is_default ? (
                    <button
                      type="button"
                      disabled={isUpdatingDefault}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDefault(address, false);
                      }}
                      className="text-[10px] font-medium text-stone-400 hover:text-red-500 underline transition-colors disabled:opacity-50"
                    >
                      Remove default
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isUpdatingDefault}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDefault(address, true);
                      }}
                      className="text-[10px] font-bold text-[#0F3D2E] hover:text-[#D9A441] flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      <span className="text-[#D9A441]">★</span>
                      <span>Set as default</span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Recipient Full Name */}
            {address.full_name && (
              <p className="text-xs sm:text-sm font-bold text-stone-800">
                {address.full_name}
              </p>
            )}

            {/* Address Line */}
            <p className="text-xs sm:text-sm font-medium text-stone-600 leading-relaxed break-words">
              {address.address_line}
            </p>

            {/* Location & Contact Meta */}
            <p className="text-xs font-semibold text-stone-500 flex flex-wrap items-center gap-2 pt-0.5">
              <span>
                PIN:{" "}
                <strong className="text-stone-800">{address.pincode}</strong>
              </span>

              <span className="w-1 h-1 rounded-full bg-stone-300" />

              <span>
                Phone:{" "}
                <strong className="text-stone-800">
                  +91 {address.phone_number}
                </strong>
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Edit/Delete Actions & Selection Radio */}
        <div className="flex flex-col items-end justify-between self-stretch shrink-0 gap-3">
          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Edit */}
            <button
              type="button"
              aria-label={`Edit ${address.address_type} Address`}
              onClick={(event) => {
                event.stopPropagation();
                onEdit();
              }}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#D9A441] text-stone-600 hover:text-white flex items-center justify-center transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>

            {/* Delete */}
            <button
              type="button"
              aria-label={`Delete ${address.address_type} Address`}
              disabled={isDeleting}
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-red-500 text-stone-600 hover:text-white flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Selection Radio Indicator */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? "border-2 border-[#0F3D2E] bg-[#0F3D2E] shadow-sm"
                : "border-2 border-stone-300 bg-white hover:border-[#D9A441]"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                isSelected ? "bg-[#D9A441] scale-100" : "bg-transparent scale-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;