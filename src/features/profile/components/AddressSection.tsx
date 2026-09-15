"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import {
  useAddressHook,
  type AddressData,
} from "../../address/hook/useAddressHook";
import type { AddressPayload } from "../../address/api/AddressApi";

const ADDRESS_TYPES = ["Home", "Work", "Other"];

const EMPTY_FORM: AddressPayload = {
  address_type: "Home",
  full_name: "",
  phone_number: "",
  address_line: "",
  city: "",
  state: "",
  pincode: "",
  is_default: false,
};

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

  const [form, setForm] = useState<AddressPayload>(EMPTY_FORM);

  // Sync the form whenever the modal opens, for both add and edit
  useEffect(() => {
    if (!isModalOpen) return;
    setForm(
      editingAddress
        ? {
            address_type: editingAddress.address_type,
            full_name: editingAddress.full_name,
            phone_number: editingAddress.phone_number,
            address_line: editingAddress.address_line,
            city: editingAddress.city,
            state: editingAddress.state,
            pincode: editingAddress.pincode,
            is_default: editingAddress.is_default,
          }
        : EMPTY_FORM
    );
  }, [isModalOpen, editingAddress]);

  const handleChange = (
    field: keyof AddressPayload,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (editingAddress) {
      // editAddress already refetches the list and closes the modal
      await editAddress(editingAddress.id, form);
    } else {
      const success = await addAddress(form);
      if (success) {
        await getAddresses();
        closeModal();
      }
    }
  };

  const handleSetDefault = async (address: AddressData) => {
    await editAddress(address.id, { is_default: true });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white border border-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-serif font-black text-[var(--brand-green-dark)]">
          Saved Addresses
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors"
        >
          <Plus size={14} />
          Add New
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
            className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-sm hover:shadow-lg transition-all p-5 sm:p-6 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[var(--brand-cream-soft)] flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[var(--brand-green-dark)]" />
              </div>

              <div className="min-w-0">
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

            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(address)}
                  className="w-8 h-8 rounded-lg border border-gray-200 hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)] flex items-center justify-center text-gray-500 transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  disabled={deletingAddressId === address.id}
                  className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-300 hover:text-red-500 flex items-center justify-center text-gray-500 transition-colors disabled:opacity-50"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif font-black text-[var(--brand-green-dark)]">
                {editingAddress ? "Edit Address" : "New Address"}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                  Address Type
                </label>
                <div className="flex gap-2">
                  {ADDRESS_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleChange("address_type", type)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                        form.address_type === type
                          ? "bg-[var(--brand-gold)] border-[var(--brand-gold)] text-[var(--brand-green-dark)]"
                          : "border-gray-200 text-gray-500 hover:border-[var(--brand-gold)]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                    Full Name
                  </label>
                  <input
                    value={form.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-2.5 text-[13px] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    value={form.phone_number}
                    onChange={(e) =>
                      handleChange("phone_number", e.target.value)
                    }
                    className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-2.5 text-[13px] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                  Address
                </label>
                <textarea
                  value={form.address_line}
                  onChange={(e) => handleChange("address_line", e.target.value)}
                  rows={2}
                  className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-2.5 text-[13px] font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                    City
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-2.5 text-[13px] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                    State
                  </label>
                  <input
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-2.5 text-[13px] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1.5">
                    Pincode
                  </label>
                  <input
                    value={form.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-2.5 text-[13px] font-medium"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.is_default}
                  onChange={(e) => handleChange("is_default", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--brand-green-dark)] focus:ring-[var(--brand-gold)]"
                />
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Set as default address
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 mt-8 pt-5 border-t border-gray-100">
              <button
                onClick={closeModal}
                disabled={isSaving}
                className="flex items-center gap-1 border border-gray-200 text-gray-500 hover:bg-gray-50 px-4 py-2.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
              >
                <X size={13} />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center gap-1 bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white px-4 py-2.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors disabled:opacity-60"
              >
                <Check size={13} />
                {isSaving ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
