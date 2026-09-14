"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  addAddressApi,
  editAddressApi,
  getAddressesApi,
  deleteAddressApi,
  type AddressPayload,
} from "../api/AddressApi";
import { extractErrorMessages } from "@/utils/extractErrorMessages";

export interface AddressData extends AddressPayload {
  id: number;
}

export const useAddressHook = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingAddress, setEditingAddress] =
    useState<AddressData | null>(null);

  // Open empty modal for adding
  const openAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  // Open modal with existing address
  const openEditModal = (address: AddressData) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setEditingAddress(null);
    setIsModalOpen(false);
  };

  // GET addresses
  const getAddresses = async () => {
    try {
      setIsLoading(true);

      const response: AddressData[] = await getAddressesApi();

      const addressList = response || [];

      setAddresses(addressList);

      const defaultAddress =
        addressList.find((item) => item.is_default) ||
        addressList[0] ||
        null;

      setSelectedAddress(defaultAddress);
    } catch (error) {
      toast.error(extractErrorMessages(error));
    } finally {
      setIsLoading(false);
    }
  };

  // ADD address
  const addAddress = async (data: AddressPayload) => {
    try {
      setIsSaving(true);
  
      await addAddressApi(data);
  
      toast.success("Address added successfully");
  
      return true;
    } catch (error) {
      toast.error(extractErrorMessages(error));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // EDIT address
  const editAddress = async (
    id: number,
    data: Partial<AddressPayload>
  ) => {
    try {
      setIsSaving(true);

      const response = await editAddressApi(
        String(id),
        data
      );

      toast.success(
        response?.message || "Address updated successfully"
      );

      await getAddresses();

      closeModal();

      return response;
    } catch (error) {
      toast.error(extractErrorMessages(error));
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE address
  const deleteAddress = async (id: number) => {
    try {
        setDeletingAddressId(id);
    
        const response = await deleteAddressApi(
            String(id)
        );
    
        toast.success(
            response?.message || "Address deleted successfully"
        );
    
        await getAddresses();
    
        return response;
    } catch (error) {
        toast.error(extractErrorMessages(error));
        return null;
    } finally {
        setDeletingAddressId(null);
    }
  };

  // Select address
  const selectAddress = (address: AddressData) => {
    setSelectedAddress(address);
  };

  // Fetch addresses
  useEffect(() => {
    getAddresses();
  }, []);

  return {
    addresses,
    selectedAddress,
    isLoading,
    isSaving,
    deletingAddressId,
    editingAddress,
    isModalOpen,
    getAddresses,
    addAddress,
    editAddress,
    deleteAddress,
    selectAddress,
    openAddModal,
    openEditModal,
    closeModal,
};
};