"use client";

import React from "react";
import { Plus, MapPin } from "lucide-react";
import AddressCard from "./AddressCard";
import type { AddressData } from "../hook/useAddressHook";

interface AddressListProps {
  addresses: AddressData[];
  selectedAddress: AddressData | null;
  onSelect: (address: AddressData) => void;
  onEdit: (address: AddressData) => void;
  onDelete: (address: AddressData) => void;
  onToggleDefault?: (address: AddressData, makeDefault: boolean) => void;
  deletingAddressId: number | null;
  onAdd: () => void;
}

const AddressList = ({
  addresses,
  selectedAddress,
  onSelect,
  onEdit,
  onDelete,
  onToggleDefault,
  deletingAddressId,
  onAdd,
}: AddressListProps) => {
  if (addresses.length === 0) {
    return (
      <div className="lg:col-span-8">
        <div className="border-2 border-dashed border-[#D9A441]/50 bg-white/60 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FDFBF7] text-[#D9A441] mx-auto flex items-center justify-center border border-[#EADBCA] shadow-sm">
            <MapPin className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-serif font-bold text-[#0F3D2E] tracking-wide">
              No Addresses Saved
            </h2>

            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
              Add your home or office address to continue ordering your royal
              dining delicacies.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D9A441] hover:text-[#C69232] uppercase tracking-wider group transition-colors"
            >
              <span>+ Add One Now</span>
              <span className="block w-0 group-hover:w-full h-0.5 bg-[#D9A441] transition-all" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-8 space-y-4">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          isSelected={selectedAddress?.id === address.id}
          onSelect={() => onSelect(address)}
          onEdit={() => onEdit(address)}
          onDelete={() => onDelete(address)}
          onToggleDefault={onToggleDefault}
          isDeleting={deletingAddressId === address.id}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="w-full group cursor-pointer border-2 border-dashed border-[#D9A441]/60 hover:border-[#D9A441] bg-white/40 hover:bg-[#FDF9F0] rounded-2xl p-4 flex items-center justify-center gap-3 text-[#0F3D2E] transition-all duration-200"
      >
        <div className="w-7 h-7 rounded-full bg-[#D9A441]/15 text-[#D9A441] group-hover:bg-[#D9A441] group-hover:text-white flex items-center justify-center transition-colors">
          <Plus className="w-4 h-4" />
        </div>

        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F3D2E]">
          Add Another Address
        </span>
      </button>
    </div>
  );
};

export default AddressList;