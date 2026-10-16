"use client";

import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/lib/axios";

export interface StoreStatusData {
  isOpen: boolean;
  isManuallyOpen: boolean;
  openingTime: string | null;
  closingTime: string | null;
  deliveryRadius: number;
  restaurantName: string;
  loading: boolean;
  formattedHoursText: string;
}

export function useStoreStatus() {
  const [status, setStatus] = useState<StoreStatusData>({
    isOpen: true,
    isManuallyOpen: true,
    openingTime: null,
    closingTime: null,
    deliveryRadius: 0,
    restaurantName: "Empire Plaza",
    loading: true,
    formattedHoursText: "",
  });

  const fetchStatus = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/settings/site-settings");
      if (res.data) {
        const d = res.data;
        const isOpen = Boolean(d.isOpen ?? d.is_open ?? true);
        const isManuallyOpen = Boolean(d.isManuallyOpen ?? d.is_manually_open ?? true);
        const openingTime = d.openingTime ?? d.opening_time ?? null;
        const closingTime = d.closingTime ?? d.closing_time ?? null;
        const deliveryRadius = Number(d.deliveryRadius ?? d.delivery_radius ?? 0);
        const restaurantName = d.appName ?? d.restaurant_name ?? "Empire Plaza";

        let formattedHoursText = "";
        if (openingTime && closingTime) {
          formattedHoursText = `${formatTime(openingTime)} - ${formatTime(closingTime)}`;
        }

        setStatus({
          isOpen,
          isManuallyOpen,
          openingTime,
          closingTime,
          deliveryRadius,
          restaurantName,
          loading: false,
          formattedHoursText,
        });
      }
    } catch {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { ...status, refresh: fetchStatus };
}

function formatTime(timeStr: string): string {
  try {
    const parts = timeStr.split(":");
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    }
  } catch {
    // fallback
  }
  return timeStr;
}
