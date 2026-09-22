"use client";

import { useCallback, useEffect, useState } from "react";
import type { AddressData } from "./useAddressHook";
import { getAddressesApi } from "../api/AddressApi";

export const DELIVERY_LOCATION_STORAGE_KEY = "selected_delivery_address";
export const GUEST_LOCATION_STORAGE_KEY = "guest_location";
export const DELIVERY_LOCATION_EVENT = "delivery-location-updated";
export const AUTH_STATE_EVENT = "auth-state-changed";

const GUEST_LOCATION_FALLBACK = {
  label: "Malappuram, Kerala",
};

const isLoggedIn = () =>
  typeof window !== "undefined" &&
  localStorage.getItem("isLoggedIn") === "true";

export const getStoredDeliveryLocation = (): AddressData | null => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(
    DELIVERY_LOCATION_STORAGE_KEY
  );

  if (!stored) return null;

  try {
    return JSON.parse(stored) as AddressData;
  } catch {
    localStorage.removeItem(
      DELIVERY_LOCATION_STORAGE_KEY
    );
    return null;
  }
};

export const persistDeliveryLocation = (
  address: AddressData | null
) => {
  if (typeof window === "undefined") return;

  if (address) {
    localStorage.setItem(
      DELIVERY_LOCATION_STORAGE_KEY,
      JSON.stringify(address)
    );
  } else {
    localStorage.removeItem(
      DELIVERY_LOCATION_STORAGE_KEY
    );
  }

  window.dispatchEvent(
    new CustomEvent(DELIVERY_LOCATION_EVENT)
  );
};

export const getGuestLocation = () => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(
    GUEST_LOCATION_STORAGE_KEY
  );

  if (stored) {
    try {
      return JSON.parse(stored) as { label: string };
    } catch {
      localStorage.removeItem(
        GUEST_LOCATION_STORAGE_KEY
      );
    }
  }

  localStorage.setItem(
    GUEST_LOCATION_STORAGE_KEY,
    JSON.stringify(GUEST_LOCATION_FALLBACK)
  );

  return GUEST_LOCATION_FALLBACK;
};

const useDeliveryLocationHook = () => {
  const [location, setLocationState] =
    useState<AddressData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [guestLocation, setGuestLocation] =
    useState<{ label: string } | null>(null);

  const loadLocation = useCallback(async () => {
    if (typeof window === "undefined") return;

    if (!isLoggedIn()) {
      setLocationState(null);
      setGuestLocation(getGuestLocation());
      setLoading(false);
      return;
    }

    const storedLocation =
      getStoredDeliveryLocation();

    if (storedLocation) {
      setLocationState(storedLocation);
      setLoading(false);
    } else {
      setLoading(true);
    }

    try {
      const response: AddressData[] =
        await getAddressesApi();

      const addresses = response || [];

      const defaultAddress =
        addresses.find(
          (address) => address.is_default
        ) ||
        addresses[0] ||
        null;

      setLocationState(defaultAddress);

      persistDeliveryLocation(
        defaultAddress
      );
    } catch (error) {
      console.error(
        "Error loading delivery location:",
        error
      );

      // Keep the previously stored location when
      // the API temporarily fails.
      const stored =
        getStoredDeliveryLocation();

      setLocationState(stored);
    } finally {
      setLoading(false);
    }
  }, []);

  const setLocation = useCallback(
    (address: AddressData | null) => {
      setLocationState(address);
      persistDeliveryLocation(address);
    },
    []
  );

  useEffect(() => {
    loadLocation();

    const handleLocationUpdate = () => {
      if (!isLoggedIn()) {
        setLocationState(null);
        setGuestLocation(getGuestLocation());
        return;
      }

      const stored =
        getStoredDeliveryLocation();

      setLocationState(stored);
    };

    const handleAuthStateChange = () => {
      loadLocation();
    };

    const handleStorage = (
      event: StorageEvent
    ) => {
      if (
        event.key ===
        DELIVERY_LOCATION_STORAGE_KEY
      ) {
        handleLocationUpdate();
      }

      if (
        event.key === "isLoggedIn"
      ) {
        handleAuthStateChange();
      }
    };

    window.addEventListener(
      DELIVERY_LOCATION_EVENT,
      handleLocationUpdate
    );

    window.addEventListener(
      AUTH_STATE_EVENT,
      handleAuthStateChange
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        DELIVERY_LOCATION_EVENT,
        handleLocationUpdate
      );

      window.removeEventListener(
        AUTH_STATE_EVENT,
        handleAuthStateChange
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [loadLocation]);

  return {
    location,
    loading,
    setLocation,
    refreshLocation: loadLocation,
    guestLocation,
  };
};

export default useDeliveryLocationHook;
