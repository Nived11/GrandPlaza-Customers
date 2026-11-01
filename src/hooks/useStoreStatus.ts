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

// ==========================================
// 🌟 MODULE-LEVEL SHARED SINGLETON CACHE
// Eliminates duplicate API storms from MenuItemCards
// ==========================================
let globalStatus: StoreStatusData = {
  isOpen: true,
  isManuallyOpen: true,
  openingTime: null,
  closingTime: null,
  deliveryRadius: 0,
  restaurantName: "Empire Plaza",
  loading: true,
  formattedHoursText: "",
};

let lastFetchedTime = 0;
let inFlightPromise: Promise<StoreStatusData> | null = null;
const listeners = new Set<(status: StoreStatusData) => void>();
let globalPollingStarted = false;
let globalIntervalId: NodeJS.Timeout | null = null;

async function fetchGlobalStoreStatus(force = false): Promise<StoreStatusData> {
  const now = Date.now();
  // Return cached status if fresh (< 60s) unless forced
  if (!force && lastFetchedTime > 0 && now - lastFetchedTime < 60000) {
    return globalStatus;
  }

  // Deduplicate concurrent in-flight requests (all components share the same promise)
  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
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

        globalStatus = {
          isOpen,
          isManuallyOpen,
          openingTime,
          closingTime,
          deliveryRadius,
          restaurantName,
          loading: false,
          formattedHoursText,
        };
        lastFetchedTime = Date.now();
      }
    } catch {
      globalStatus = { ...globalStatus, loading: false };
    } finally {
      inFlightPromise = null;
      // Notify all subscriber components in one batch
      listeners.forEach((listener) => listener(globalStatus));
    }
    return globalStatus;
  })();

  return inFlightPromise;
}

function initGlobalPolling() {
  if (typeof window === "undefined" || globalPollingStarted) return;
  globalPollingStarted = true;

  const start = () => {
    if (globalIntervalId) clearInterval(globalIntervalId);
    globalIntervalId = setInterval(() => {
      if (typeof document !== "undefined" && !document.hidden) {
        fetchGlobalStoreStatus(true);
      }
    }, 60000); // 1 request every 60s for the entire tab
  };

  const handleVisibilityOrFocus = () => {
    if (typeof document !== "undefined" && !document.hidden) {
      if (Date.now() - lastFetchedTime > 45000) {
        fetchGlobalStoreStatus(true);
      }
      start();
    } else {
      if (globalIntervalId) {
        clearInterval(globalIntervalId);
        globalIntervalId = null;
      }
    }
  };

  start();
  document.addEventListener("visibilitychange", handleVisibilityOrFocus);
  window.addEventListener("focus", handleVisibilityOrFocus);
}

export function useStoreStatus() {
  const [status, setStatus] = useState<StoreStatusData>(globalStatus);

  useEffect(() => {
    // Subscribe to global updates
    listeners.add(setStatus);

    // Fetch if needed (deduplicated!)
    fetchGlobalStoreStatus();

    // Ensure single global polling interval
    initGlobalPolling();

    return () => {
      listeners.delete(setStatus);
    };
  }, []);

  const refresh = useCallback(() => fetchGlobalStoreStatus(true), []);

  return { ...status, refresh };
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
