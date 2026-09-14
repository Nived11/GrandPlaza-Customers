"use client";

import React from "react";
import type { AddressData } from "../hook/useAddressHook";

interface AddressCardProps {
    address: AddressData;
    isSelected: boolean;
    onSelect: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

const AddressCard = ({
    address,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
    isDeleting,
}: AddressCardProps) => {
    const isHome = address.address_type === "home";

    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer relative bg-white rounded-2xl p-5 sm:p-6 transition-all duration-200 ${
                isSelected
                    ? "border-2 border-[#D9A441] shadow-[0_8px_24px_-4px_rgba(15,61,46,0.09)]"
                    : "border border-[#EADBCA] shadow-[0_2px_10px_rgba(15,61,46,0.05)] hover:border-[#D9A441]/70 hover:shadow-[0_8px_24px_-4px_rgba(15,61,46,0.09)]"
            }`}
        >
            <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4 min-w-0">

                    {/* Address Icon */}
                    <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${
                            isHome
                                ? "bg-[#D9A441] text-white"
                                : "bg-[#0F3D2E] text-[#D9A441]"
                        }`}
                    >
                        {isHome ? (
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                    fillRule="evenodd"
                                />
                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                        )}
                    </div>

                    {/* Address Details */}
                    <div className="space-y-1 min-w-0">

                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-base font-bold text-[#0F3D2E] tracking-wider uppercase">
                                {address.address_type}
                            </h2>

                            {address.is_default && (
                                <span className="bg-[#0F3D2E]/10 text-[#0F3D2E] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    Default
                                </span>
                            )}
                        </div>

                        <p className="text-sm font-medium text-stone-700 leading-relaxed break-words">
                            {address.address_line}
                        </p>

                        <p className="text-xs font-semibold text-stone-500 flex flex-wrap items-center gap-2.5 pt-1">
                            <span>
                                PIN:{" "}
                                <strong className="text-stone-800">
                                    {address.pincode}
                                </strong>
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

                {/* Actions */}
                <div className="flex flex-col items-end justify-between h-[116px] shrink-0">

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
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
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
                            <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M3 6h18"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19 6l-1 14a1 1 0 01-1 1H7a1 1 0 01-1-1L5 6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 11v6M14 11v6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Selection Indicator */}
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isSelected
                                ? "border-2 border-[#0F3D2E] bg-black"
                                : "border-2 border-stone-300 bg-white"
                        }`}
                    >
                        <div
                            className={`w-2.5 h-2.5 rounded-full ${
                                isSelected
                                    ? "bg-[#D9A441]"
                                    : "bg-transparent"
                            }`}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddressCard;