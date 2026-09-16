"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import { getProfileApi, updateProfileApi, getOrdersApi, logoutApi } from "../api/profileApi";
import { persistor } from "@/redux/store";
// Address state lives in features/address/hook/useAddressHook.ts — the
// Address tab uses that hook directly, so it isn't duplicated here.

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  joined_at: string;
}

export interface OrderItem {
  id: number;
  menu_item: number;
  variant: number | null;
  item_name: string;
  variant_name: string;
  quantity: number;
  unit_price: string;
  line_total: string;
}

// Matches both the /orders/my-orders list entries and the
// /orders/my-orders/:id detail response — same shape either way.
export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  special_instructions: string;
  total_price: string;
  status: string;
  payment_status: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export const useProfileHook = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfileApi();
          
      if (response?.status && response?.data) {
        setProfile({
          id: response.data.id,
          name: response.data.first_name || "",
          email: response.data.email || "",
          phone: response.data.phone_number || "",
          avatar: null,
          joined_at: "",
        });
      } else {
        setProfile(null);
      }
    } catch (err: any) {
      const message = extractErrorMessages(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await getOrdersApi();
      // /orders/my-orders returns { count, next, previous, results: Order[] },
      // not the { status, data } wrapper the profile endpoints use.
      setOrders(Array.isArray(response?.results) ? response.results : []);
    } catch (err: any) {
      toast.error(extractErrorMessages(err));
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateProfile = async (payload: { name: string; email: string; phone: string;}) => {
    setSaving(true);

    try {
      const response = await updateProfileApi({
        first_name: payload.name,
        email: payload.email,
        phone_number: payload.phone,
      });

      if (response?.status && response?.data) {
        setProfile({
          id: response.data.id,
          name: response.data.first_name || "",
          email: response.data.email || "",
          phone: response.data.phone_number || "",
          avatar: null,
          joined_at: "",
        });

        toast.success("Profile updated");
        return true;
      }

      return false;
    } catch (err: any) {
      toast.error(extractErrorMessages(err));
      return false;
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    try {
        await logoutApi();
    } catch (err) {
        // Even if the API call fails, clear the local session
    } finally {
        if (typeof window !== "undefined") {
            // Clear local storage
            localStorage.clear();

           // Clear session storage
            sessionStorage.clear();

           // Clear persisted Redux state
            await persistor.purge();

           // Redirect to home
            window.location.href = "/";
        }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    orders,
    loading,
    ordersLoading,
    saving,
    error,
    fetchProfile,
    fetchOrders,
    updateProfile,
    logout,
  };
};
