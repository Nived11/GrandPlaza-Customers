"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";

import AddressList from "./components/AddressList";
import AddressModal from "./components/AddressModal";
import AddressSummary from "./components/AddressSummary";
import AddressSkeleton from "./components/AddressSkeleton";

import { useAddressHook, AddressData } from "./hook/useAddressHook";

import { useOrderHook } from "../order/hook/useOrderHook";
import OrderSuccessModal from "../order/components/OrderSuccessModal";
import type { OrderData } from "../order/components/OrderSuccessModal";

export default function AddressMain() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { createOrder, isCreatingOrder } = useOrderHook();

    const [order, setOrder] = useState<OrderData | null>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const {
        addresses,
        isLoading,
        selectedAddress,
        deletingAddressId,
        addAddress,
        editAddress,
        deleteAddress,
        getAddresses,
        selectAddress,
        openAddModal,
        openEditModal,
        closeModal,
        isModalOpen,
        editingAddress,
    } = useAddressHook();

    const handleSave = async (
        addressData: Omit<AddressData, "id">
    ) => {
        if (editingAddress) {
            await editAddress(editingAddress.id, addressData);
            return;
        }

        const success = await addAddress(addressData);

        if (success) {
            closeModal();
            await getAddresses();
        }
    };

    const handleConfirmAddress = async (addressId: number) => {
        const response = await createOrder(addressId);

        if (response?.status && response?.data) {
            // Clear the Redux cart after successful checkout
            dispatch(clearCart());

            // Store the actual order returned by the API
            setOrder(response.data);

            // Open success screen
            setIsOrderModalOpen(true);
        }
    };

    const handleCloseOrderModal = () => {
        setIsOrderModalOpen(false);
    };

    const handleTrackOrder = () => {
        setIsOrderModalOpen(false);
    };

    const handleContinueBrowsing = () => {
        setIsOrderModalOpen(false);
        router.push("/orders");
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#FBF6EC]">
            <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                {/* Page Heading */}
                <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-[#D9A441] sm:text-xs">
                            DELIVERY ADDRESS
                        </p>

                        <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0F3D2E] sm:text-3xl lg:text-4xl">
                            Where should we deliver?
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#78716C] sm:text-[15px]">
                            Choose a saved address or add a new delivery address.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="w-full shrink-0 rounded-full bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto"
                    >
                        + Add New
                    </button>
                </div>

                {/* Content */}
                {isLoading ? (
                    <AddressSkeleton />
                ) : (
                    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">

                        <section className="min-w-0">
                            <AddressList
                                addresses={addresses}
                                selectedAddress={selectedAddress}
                                onSelect={selectAddress}
                                onEdit={openEditModal}
                                onDelete={deleteAddress}
                                deletingAddressId={deletingAddressId}
                                onAdd={openAddModal}
                            />
                        </section>

                        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
                            <AddressSummary
                                selectedAddress={selectedAddress}
                                onConfirm={handleConfirmAddress}
                                isCreatingOrder={isCreatingOrder}
                            />
                        </aside>

                    </div>
                )}
            </main>

            {/* Address Modal */}
            <AddressModal
                isOpen={isModalOpen}
                address={editingAddress}
                onClose={closeModal}
                onSave={handleSave}
            />

            {/* Order Success Modal */}
            <OrderSuccessModal
                isOpen={isOrderModalOpen}
                order={order}
                onClose={handleCloseOrderModal}
                onTrackOrder={handleTrackOrder}
                onContinueBrowsing={handleContinueBrowsing}
            />
        </div>
    );
}