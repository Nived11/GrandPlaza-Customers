"use client";

import React from "react";

import AddressCard from "./AddressCard";
import type { AddressData } from "../hook/useAddressHook";

interface AddressListProps {
    addresses: AddressData[];
    selectedAddress: AddressData | null;
    onSelect: (address: AddressData) => void;
    onEdit: (address: AddressData) => void;
    onDelete: (id: number) => void;
    deletingAddressId: number | null;
    onAdd: () => void;
}

const AddressList = ({
    addresses,
    selectedAddress,
    onSelect,
    onEdit,
    onDelete,
    deletingAddressId,
    onAdd,
}: AddressListProps) => {
    if (addresses.length === 0) {
        return (
            <div className="lg:col-span-8">
                <div className="border-2 border-dashed border-[#D9A441]/50 bg-white/60 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-[#FDFBF7] text-[#D9A441] mx-auto flex items-center justify-center border border-[#EADBCA] shadow-sm">
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 21c-4.418-4.418-7-8.582-7-12a7 7 0 1114 0c0 3.418-2.582 7.582-7 12z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.5 17.5c2-1 5-1 7 0"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
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
                    address={address}
                    isSelected={selectedAddress?.id === address.id}
                    onSelect={() => onSelect(address)}
                    onEdit={() => onEdit(address)}
                    onDelete={() => onDelete(address.id)}
                    isDeleting={deletingAddressId === address.id}
                />
            ))}

            <button
                type="button"
                onClick={onAdd}
                className="w-full group cursor-pointer border-2 border-dashed border-[#D9A441]/60 hover:border-[#D9A441] bg-white/40 hover:bg-[#FDF9F0] rounded-2xl p-4 flex items-center justify-center gap-3 text-[#0F3D2E] transition-all duration-200"
            >
                <div className="w-7 h-7 rounded-full bg-[#D9A441]/15 text-[#D9A441] group-hover:bg-[#D9A441] group-hover:text-white flex items-center justify-center transition-colors">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 4v16m8-8H4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F3D2E]">
                    Add Another Address
                </span>
            </button>
        </div>
    );
};

export default AddressList;