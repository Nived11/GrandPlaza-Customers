"use client";

import React from "react";
import { MapPin, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  useAddressHook,
  type AddressData,
} from "../../address/hook/useAddressHook";
import AddressSkeleton from "./AddressSkeleton";
import AddressModal from "../../address/components/AddressModal";

export default function AddressSection() {
  const {
    addresses,
    isLoading,
    isSaving,
    deletingAddressId,
    editingAddress,
    isModalOpen,
    addAddress,
    editAddress,
    deleteAddress,
    getAddresses,
    openAddModal,
    openEditModal,
    closeModal,
  } = useAddressHook();

  const handleSaveAddress = async (payload: Omit<AddressData, "id">) => {
    if (editingAddress) {
      await editAddress(editingAddress.id, payload);
    } else {
      const success = await addAddress(payload);
      if (success) {
        await getAddresses();
      }
    }
    closeModal();
  };

  const handleSetDefault = async (address: AddressData) => {
    await editAddress(address.id, { is_default: true });
  };

  if (isLoading) {
    return <AddressSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-serif font-black text-[var(--brand-green-dark)]">
          Saved Addresses
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white px-3 sm:px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.15em] shrink-0 transition-colors shadow-sm"
        >
          <Plus size={14} className="shrink-0" />
          <span>Add New</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-[0_15px_50px_rgba(0,0,0,0.05)] p-10 sm:p-16 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[var(--brand-cream-soft)] flex items-center justify-center mb-4">
            <MapPin size={22} className="text-[var(--brand-gold)]" />
          </div>
          <h3 className="text-lg font-serif font-black text-[var(--brand-green-dark)] mb-1.5">
            No saved addresses
          </h3>
          <p className="text-[12px] text-gray-500 font-medium">
            Add an address to speed up checkout next time.
          </p>
        </div>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:shadow-lg transition-all p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4"
          >
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--brand-cream-soft)] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={18} className="text-[var(--brand-green-dark)]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-wider">
                    {address.address_type}
                  </h3>
                  {address.is_default && (
                    <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand-gold)]/15 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[12px] sm:text-[13px] font-bold text-slate-800">
                  {address.full_name}
                </p>
                <p className="text-[12px] sm:text-[13px] text-gray-600 font-medium leading-relaxed">
                  {address.address_line}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>
                <p className="text-[11px] text-gray-400 font-medium mt-1">
                  {address.phone_number}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(address)}
                  className="w-8 h-8 rounded-lg border border-gray-200 hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] flex items-center justify-center text-gray-500 transition-colors"
                  aria-label="Edit address"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  disabled={deletingAddressId === address.id}
                  className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-300 hover:text-red-500 flex items-center justify-center text-gray-500 transition-colors disabled:opacity-50"
                  aria-label="Delete address"
                >
                  {deletingAddressId === address.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                </button>
              </div>
              {!address.is_default && (
                <button
                  onClick={() => handleSetDefault(address)}
                  className="text-[9px] font-bold uppercase tracking-wider text-[var(--brand-green-dark)] hover:text-[var(--brand-gold)] transition-colors"
                >
                  Set as default
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {/* 2-Step Location Pinning & Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        address={editingAddress}
        onClose={closeModal}
        onSave={handleSaveAddress}
        isSaving={isSaving}
      />
    </div>
  );
}
