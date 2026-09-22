"use client";

import { useEffect, useState } from "react";

interface DeliveryLocation {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

const STORAGE_KEY = "delivery_location";

const useDeliveryLocation = () => {
  const [location, setLocation] =
    useState<DeliveryLocation | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const savedLocation =
      sessionStorage.getItem(STORAGE_KEY);

    if (savedLocation) {
      try {
        const parsedLocation =
          JSON.parse(savedLocation);

        setLocation(parsedLocation);
        setIsLoading(false);

        return;
      } catch {
        sessionStorage.removeItem(
          STORAGE_KEY
        );
      }
    }

    if (!navigator.geolocation) {
      setError(
        "Location is not supported by this browser."
      );
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        try {
          /*
           * The browser only gives us latitude
           * and longitude.
           *
           * A reverse-geocoding API is required
           * to convert them into city/state.
           */

          const response = await fetch(
            `/api/location/reverse?latitude=${latitude}&longitude=${longitude}`
          );

          if (!response.ok) {
            throw new Error(
              "Unable to determine your location."
            );
          }

          const data = await response.json();

          const deliveryLocation = {
            city:
              data.city ||
              data.locality ||
              "",
            state:
              data.state ||
              "",
            latitude,
            longitude,
          };

          sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
              deliveryLocation
            )
          );

          setLocation(
            deliveryLocation
          );
        } catch (err) {
          console.error(
            "Reverse geocoding error:",
            err
          );

          setError(
            "Unable to determine your location."
          );
        } finally {
          setIsLoading(false);
        }
      },
      (geoError) => {
        console.error(
          "Geolocation error:",
          geoError
        );

        setError(
          "Location permission was denied."
        );

        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  return {
    location,
    isLoading,
    error,
  };
};

export default useDeliveryLocation;