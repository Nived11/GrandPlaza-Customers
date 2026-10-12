"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Search, Crosshair, Loader2, MapPin, Check, Navigation } from "lucide-react";
import { loadGoogleMaps } from "@/lib/loadGoogleMaps";

export interface SelectedLocationData {
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lng?: number;
}

interface GoogleMapLocationPickerProps {
  onLocationSelect: (data: SelectedLocationData) => void;
  initialAddress?: string;
  className?: string;
}

// Default center: Malappuram / Kozhikode region, Kerala
const DEFAULT_CENTER = { lat: 11.2588, lng: 75.7804 };

export default function GoogleMapLocationPicker({
  onLocationSelect,
  initialAddress,
  className = "",
}: GoogleMapLocationPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<string>(initialAddress || "");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [locateSuccessMsg, setLocateSuccessMsg] = useState<string | null>(null);

  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);
  const geocoderInstanceRef = useRef<any>(null);

  // Helper to extract clean address details from Google Geocoder / Places components
  const parseAddressComponents = useCallback((result: any): SelectedLocationData => {
    let streetNumber = "";
    let route = "";
    let sublocality = "";
    let locality = "";
    let administrativeArea = "";
    let postalCode = "";

    if (Array.isArray(result.address_components)) {
      result.address_components.forEach((component: any) => {
        const types = component.types || [];
        if (types.includes("street_number")) streetNumber = component.long_name;
        if (types.includes("route")) route = component.long_name;
        if (
          types.includes("sublocality") ||
          types.includes("sublocality_level_1") ||
          types.includes("sublocality_level_2")
        ) {
          if (!sublocality) sublocality = component.long_name;
        }
        if (types.includes("locality")) locality = component.long_name;
        // District fallback for Indian cities
        if (!locality && types.includes("administrative_area_level_2")) {
          locality = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          administrativeArea = component.long_name;
        }
        if (types.includes("postal_code")) postalCode = component.long_name;
      });
    }

    const cleanFormatted = result.formatted_address
      ? result.formatted_address.replace(/, India$/, "").trim()
      : "";

    const street = [streetNumber, route].filter(Boolean).join(" ");
    const addressLine = cleanFormatted || [street, sublocality].filter(Boolean).join(", ") || "";
    const city = locality || sublocality || "";
    const state = administrativeArea || "Kerala";
    const pincode = postalCode || "";

    const lat = typeof result.geometry?.location?.lat === "function" ? result.geometry.location.lat() : undefined;
    const lng = typeof result.geometry?.location?.lng === "function" ? result.geometry.location.lng() : undefined;

    return {
      address_line: addressLine,
      city,
      state,
      pincode,
      lat,
      lng,
    };
  }, []);

  const handleReverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!geocoderInstanceRef.current) return;

      setIsGeocoding(true);
      geocoderInstanceRef.current.geocode(
        { location: { lat, lng } },
        (results: any[], status: string) => {
          setIsGeocoding(false);
          if (status === "OK" && results && results[0]) {
            const parsed = parseAddressComponents(results[0]);
            const summary = results[0].formatted_address || parsed.address_line;
            setSelectedSummary(summary);
            setLocateSuccessMsg("Address auto-filled from map!");
            onLocationSelect(parsed);
          } else {
            console.warn("Geocoding failed status:", status);
          }
        }
      );
    },
    [onLocationSelect, parseAddressComponents]
  );

  // Fallback to IP geolocation when browser GPS is blocked (e.g. on HTTP)
  const getIpFallbackLocation = async (): Promise<{ lat: number; lng: number } | null> => {
    try {
      const res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client");
      if (res.ok) {
        const data = await res.json();
        if (data.latitude && data.longitude) {
          return { lat: Number(data.latitude), lng: Number(data.longitude) };
        }
      }
    } catch {}

    try {
      const res2 = await fetch("https://ipapi.co/json/");
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2.latitude && data2.longitude) {
          return { lat: Number(data2.latitude), lng: Number(data2.longitude) };
        }
      }
    } catch {}

    return null;
  };

  // Locate Current GPS Position
  const handleLocateMe = useCallback(async () => {
    setIsLocating(true);
    setLocateSuccessMsg(null);

    const applyLocation = (lat: number, lng: number) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter({ lat, lng });
        mapInstanceRef.current.setZoom(16);
      }
      if (markerInstanceRef.current) {
        markerInstanceRef.current.setPosition({ lat, lng });
      }
      handleReverseGeocode(lat, lng);
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          applyLocation(pos.coords.latitude, pos.coords.longitude);
        },
        async (err) => {
          console.warn("Browser GPS unavailable, falling back to IP:", err.message);
          const ipLoc = await getIpFallbackLocation();
          setIsLocating(false);
          if (ipLoc) {
            applyLocation(ipLoc.lat, ipLoc.lng);
          } else {
            // Apply default Kerala center and reverse geocode
            applyLocation(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
          }
        },
        { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
      );
    } else {
      const ipLoc = await getIpFallbackLocation();
      setIsLocating(false);
      if (ipLoc) {
        applyLocation(ipLoc.lat, ipLoc.lng);
      } else {
        applyLocation(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
      }
    }
  }, [handleReverseGeocode]);

  // Initialize Map
  useEffect(() => {
    let isCancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (isCancelled || !mapContainerRef.current) return;

        setIsLoadingMap(false);

        // Geocoder
        geocoderInstanceRef.current = new google.maps.Geocoder();

        // Create Map
        const map = new google.maps.Map(mapContainerRef.current, {
          center: DEFAULT_CENTER,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });
        mapInstanceRef.current = map;

        // Create Draggable Marker
        const marker = new google.maps.Marker({
          position: DEFAULT_CENTER,
          map,
          draggable: true,
          title: "Drag to pin delivery location",
          animation: google.maps.Animation.DROP,
        });
        markerInstanceRef.current = marker;

        // Marker dragend listener
        marker.addListener("dragend", () => {
          const position = marker.getPosition();
          if (position) {
            handleReverseGeocode(position.lat(), position.lng());
          }
        });

        // Map click listener (tap anywhere to drop pin)
        map.addListener("click", (e: any) => {
          if (e.latLng) {
            marker.setPosition(e.latLng);
            handleReverseGeocode(e.latLng.lat(), e.latLng.lng());
          }
        });

        // Autocomplete on Search input
        if (searchInputRef.current && google.maps.places) {
          const autocomplete = new google.maps.places.Autocomplete(searchInputRef.current, {
            componentRestrictions: { country: "in" },
            fields: ["geometry", "formatted_address", "address_components", "name"],
          });

          autocomplete.bindTo("bounds", map);

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              return;
            }

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            map.setCenter({ lat, lng });
            map.setZoom(16);
            marker.setPosition({ lat, lng });

            const parsed = parseAddressComponents(place);
            setSelectedSummary(place.formatted_address || parsed.address_line);
            setLocateSuccessMsg("Place selected & address auto-filled!");
            onLocationSelect(parsed);
          });
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setIsLoadingMap(false);
          setMapError("Failed to load Google Maps. Please verify connection.");
          console.error("Google Maps load error:", err);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [handleReverseGeocode, onLocationSelect, parseAddressComponents]);

  return (
    <div className={`w-full flex flex-col gap-2.5 ${className}`}>
      {/* 🌟 1-CLICK CURRENT LOCATION BUTTON (High visibility on mobile) */}
      <button
        type="button"
        onClick={handleLocateMe}
        disabled={isLocating}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0F3D2E] to-[#185843] text-white text-xs font-bold uppercase tracking-wider hover:from-[#185843] hover:to-[#0F3D2E] active:scale-[0.98] transition-all shadow-sm cursor-pointer disabled:opacity-70"
      >
        {isLocating ? (
          <>
            <Loader2 size={16} className="animate-spin text-[#D9A441]" />
            <span>Detecting Your GPS Location...</span>
          </>
        ) : (
          <>
            <Navigation size={15} className="text-[#D9A441]" />
            <span>Find My Current Location</span>
          </>
        )}
      </button>

      {/* Places Search Bar */}
      <div className="relative w-full">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search area, landmark, or street name..."
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:bg-white focus:outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E] transition-all text-stone-900 placeholder-stone-400 font-medium"
        />
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100">
        {isLoadingMap && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100/90 gap-2">
            <Loader2 size={24} className="animate-spin text-[#0F3D2E]" />
            <span className="text-[11px] font-semibold text-stone-600">Loading Google Maps...</span>
          </div>
        )}

        {mapError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-50 p-4 text-center">
            <MapPin size={24} className="text-red-500 mb-1" />
            <span className="text-xs font-semibold text-red-600">{mapError}</span>
            <span className="text-[10px] text-stone-500 mt-1">You can still enter your address manually below.</span>
          </div>
        )}

        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Instruction Badge */}
        <div className="absolute bottom-2 left-2 z-10 pointer-events-none bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1.5 shadow">
          <MapPin size={11} className="text-[#D9A441]" />
          <span>Tap or drag pin to your exact building</span>
        </div>
      </div>

      {/* Geocoded Status / Feedback Pill */}
      {selectedSummary && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
          {isGeocoding ? (
            <Loader2 size={15} className="animate-spin text-[#0F3D2E] shrink-0 mt-0.5" />
          ) : (
            <Check size={15} className="text-emerald-700 shrink-0 mt-0.5" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
              {locateSuccessMsg || "Pinned Location (Auto-Filled Below)"}
            </p>
            <p className="text-xs font-semibold text-stone-800 line-clamp-2 mt-0.5 leading-snug">
              {selectedSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
