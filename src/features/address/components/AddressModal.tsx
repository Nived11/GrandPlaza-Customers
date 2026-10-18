"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  Search,
  X,
  Crosshair,
  MapPin,
  Home,
  Briefcase,
  Compass,
  Check,
  Loader2,
} from "lucide-react";
import { loadGoogleMaps } from "@/lib/loadGoogleMaps";
import type { AddressData } from "../hook/useAddressHook";

export interface AddressModalProps {
  isOpen: boolean;
  address: AddressData | null;
  onClose: () => void;
  onSave: (address: Omit<AddressData, "id">) => Promise<boolean | void> | void;
  isSaving?: boolean;
}

// Default center: Kerala region
const DEFAULT_CENTER = { lat: 11.2588, lng: 75.7804 };

type Step = "map" | "details";
type AddressType = "home" | "work" | "other";

export default function AddressModal({
  isOpen,
  address,
  onClose,
  onSave,
  isSaving = false,
}: AddressModalProps) {
  // Step state: 1 = map, 2 = details
  const [step, setStep] = useState<Step>("map");

  // Map Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);
  const autocompleteServiceRef = useRef<any>(null);

  // Map UI State
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Search Autocomplete
  const [searchQuery, setSearchQuery] = useState("");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

  // Pinned Location Data
  const [pinnedLat, setPinnedLat] = useState<number>(DEFAULT_CENTER.lat);
  const [pinnedLng, setPinnedLng] = useState<number>(DEFAULT_CENTER.lng);
  const [areaTitle, setAreaTitle] = useState("Selecting location...");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Kerala");
  const [pincode, setPincode] = useState("");

  // Details Form State
  const [useAccountDetails, setUseAccountDetails] = useState(true);
  const [accountName, setAccountName] = useState("");
  const [accountPhone, setAccountPhone] = useState("");
  const [customFullName, setCustomFullName] = useState("");
  const [customPhone, setCustomPhone] = useState("");

  const [addressType, setAddressType] = useState<AddressType>("home");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [saveAs, setSaveAs] = useState("Home");

  // Form Errors
  const [formErrors, setFormErrors] = useState<{
    building?: string;
    fullName?: string;
    phone?: string;
  }>({});

  // 1. Read logged-in account details from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        const name = user.first_name || user.name || "";
        const phone = user.phone_number || user.phone || "";
        setAccountName(name);
        setAccountPhone(phone);
        if (!address) {
          setCustomFullName(name);
          setCustomPhone(phone);
        }
      }
    } catch {
      // ignore
    }
  }, [address]);

  // 2. Initialize or reset when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (address) {
      // Edit mode: start on Details step
      setStep("details");
      const normalizedType = (address.address_type?.toLowerCase() || "home") as AddressType;
      setAddressType(["home", "work", "other"].includes(normalizedType) ? normalizedType : "home");
      setSaveAs(
        normalizedType === "home"
          ? "Home"
          : normalizedType === "work"
          ? "Office"
          : "Other"
      );

      setCustomFullName(address.full_name || "");
      setCustomPhone(address.phone_number || "");
      setUseAccountDetails(
        Boolean(
          accountName &&
            accountPhone &&
            address.full_name === accountName &&
            address.phone_number === accountPhone
        )
      );

      setBuilding(address.address_line || "");
      setCity(address.city || "");
      setState(address.state || "Kerala");
      setPincode(address.pincode || "");
      setAreaTitle(address.city || "Delivery Location");
      setFullAddress(`${address.city}, ${address.state} ${address.pincode}`);
      if (address.latitude && address.longitude) {
        setPinnedLat(Number(address.latitude));
        setPinnedLng(Number(address.longitude));
      }
    } else {
      // Add mode: start on Map step
      setStep("map");
      setAddressType("home");
      setSaveAs("Home");
      setBuilding("");
      setStreet("");
      setFormErrors({});
      setUseAccountDetails(true);
      setCustomFullName(accountName);
      setCustomPhone(accountPhone);
    }
  }, [isOpen, address, accountName, accountPhone]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Helper to parse address components from Google Geocoder result
  const parseResult = useCallback((result: any) => {
    let sublocality2 = "";
    let sublocality1 = "";
    let locality = "";
    let district = "";
    let adminArea = "";
    let postal = "";
    let premise = "";
    let route = "";

    if (Array.isArray(result.address_components)) {
      result.address_components.forEach((c: any) => {
        const types = c.types || [];
        if (types.includes("subpremise") || types.includes("premise")) premise = c.long_name;
        if (types.includes("route")) route = c.long_name;
        if (types.includes("sublocality_level_2") || types.includes("neighborhood")) sublocality2 = c.long_name;
        if (types.includes("sublocality_level_1") || types.includes("sublocality")) sublocality1 = c.long_name;
        if (types.includes("locality")) locality = c.long_name;
        if (types.includes("administrative_area_level_2")) district = c.long_name;
        if (types.includes("administrative_area_level_1")) adminArea = c.long_name;
        if (types.includes("postal_code")) postal = c.long_name;
      });
    }

    const title = sublocality1 || sublocality2 || premise || route || locality || district || "Selected Location";
    const cleanFull = (result.formatted_address || "").replace(/, India$/, "").trim();

    return {
      title,
      fullAddress: cleanFull,
      city: locality || sublocality1 || district || "Kochi",
      state: adminArea || "Kerala",
      pincode: postal || "",
    };
  }, []);

  // Reverse geocode lat & lng
  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!geocoderRef.current) return;
      setIsGeocoding(true);

      geocoderRef.current.geocode(
        { location: { lat, lng } },
        (results: any[], status: string) => {
          setIsGeocoding(false);
          if (status === "OK" && results && results[0]) {
            const parsed = parseResult(results[0]);
            setAreaTitle(parsed.title);
            setFullAddress(parsed.fullAddress);
            setCity(parsed.city);
            setState(parsed.state);
            setPincode(parsed.pincode);
          } else {
            setAreaTitle("Custom Location");
            setFullAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
          }
        }
      );
    },
    [parseResult]
  );

  // Initialize Map
  useEffect(() => {
    if (!isOpen || step !== "map" || !mapContainerRef.current) return;

    let isSubscribed = true;
    setIsLoadingMap(true);
    setMapError(null);

    loadGoogleMaps()
      .then((google) => {
        if (!isSubscribed || !mapContainerRef.current) return;

        geocoderRef.current = new google.maps.Geocoder();
        autocompleteServiceRef.current = new google.maps.places.AutocompleteService();

        const initialLat = address?.latitude ? Number(address.latitude) : pinnedLat;
        const initialLng = address?.longitude ? Number(address.longitude) : pinnedLng;

        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat: initialLat, lng: initialLng },
          zoom: 17,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy", // Seamless 1-finger panning on mobile
          clickableIcons: false,
        });

        mapInstanceRef.current = map;
        setIsLoadingMap(false);

        // Reverse geocode initial position
        reverseGeocode(initialLat, initialLng);

        // Map drag events
        map.addListener("dragstart", () => {
          setIsMapMoving(true);
        });

        map.addListener("idle", () => {
          setIsMapMoving(false);
          const center = map.getCenter();
          if (center) {
            const curLat = center.lat();
            const curLng = center.lng();
            setPinnedLat(curLat);
            setPinnedLng(curLng);
            reverseGeocode(curLat, curLng);
          }
        });
      })
      .catch((err) => {
        if (!isSubscribed) return;
        setIsLoadingMap(false);
        setMapError("Failed to load map. Please check your connection.");
        console.error("Map load error:", err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [isOpen, step, address, reverseGeocode]);

  // Search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (!val.trim()) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    if (autocompleteServiceRef.current) {
      setIsSearching(true);
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: val,
          componentRestrictions: { country: "in" },
        },
        (results: any[], status: string) => {
          setIsSearching(false);
          if (status === "OK" && results) {
            setPredictions(results);
            setShowPredictions(true);
          } else {
            setPredictions([]);
          }
        }
      );
    }
  };

  // Prediction selection
  const handleSelectPrediction = (placeId: string, description: string) => {
    setShowPredictions(false);
    setSearchQuery(description);

    if (geocoderRef.current && mapInstanceRef.current) {
      geocoderRef.current.geocode({ placeId }, (results: any[], status: string) => {
        if (status === "OK" && results && results[0]?.geometry?.location) {
          const loc = results[0].geometry.location;
          const lat = loc.lat();
          const lng = loc.lng();

          mapInstanceRef.current.panTo({ lat, lng });
          mapInstanceRef.current.setZoom(17);
          setPinnedLat(lat);
          setPinnedLng(lng);

          const parsed = parseResult(results[0]);
          setAreaTitle(parsed.title);
          setFullAddress(parsed.fullAddress);
          setCity(parsed.city);
          setState(parsed.state);
          setPincode(parsed.pincode);
        }
      });
    }
  };

  // Use Current Location (GPS)
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo({ lat, lng });
          mapInstanceRef.current.setZoom(17);
        }
        setPinnedLat(lat);
        setPinnedLng(lng);
        reverseGeocode(lat, lng);
      },
      (err) => {
        setIsLocating(false);
        console.warn("Geolocation error:", err.message);
        alert("Could not retrieve current location. Please allow location permissions or search manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Submit details form
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { building?: string; fullName?: string; phone?: string } = {};

    if (!building.trim()) {
      errors.building = "House / Flat / Building no is required";
    }

    const finalName = useAccountDetails ? accountName : customFullName.trim();
    const finalPhone = useAccountDetails ? accountPhone : customPhone.trim();

    if (!finalName) {
      errors.fullName = "Name is required";
    }

    if (!finalPhone) {
      errors.phone = "Mobile number is required";
    } else if (finalPhone.replace(/\D/g, "").length !== 10) {
      errors.phone = "Enter a valid 10-digit mobile number";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Combine into complete address string
    const completeLine = [building.trim(), street.trim(), fullAddress].filter(Boolean).join(", ");

    const payload: Omit<AddressData, "id"> = {
      address_type: addressType,
      full_name: finalName,
      phone_number: finalPhone,
      address_line: completeLine,
      city: city || "Kochi",
      state: state || "Kerala",
      pincode: pincode || "682001",
      latitude: pinnedLat,
      longitude: pinnedLng,
      is_default: Boolean(address?.is_default),
    };

    await onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end sm:justify-center sm:items-center bg-black/60 backdrop-blur-sm">
      {/* Container: Fullscreen on mobile, Elegant card modal on desktop */}
      <div className="relative w-full h-[100dvh] sm:h-[88vh] sm:max-w-2xl lg:max-w-3xl sm:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* ==========================================================
            STEP 1: FULL-SCREEN INTERACTIVE LOCATION MAP
            ========================================================== */}
        {step === "map" && (
          <div className="relative w-full h-full flex flex-col bg-[#F8F9FA]">
            {/* Top Search Bar with Back Button */}
            <div className="relative z-30 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center gap-2.5 shadow-sm">
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#0F3D2E] hover:bg-[#FAF5EB] active:scale-95 transition-all shrink-0"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Search Input */}
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search an area or address..."
                  className="w-full pl-10 pr-9 py-2.5 bg-gray-100/80 hover:bg-gray-100 focus:bg-white text-[13px] sm:text-sm font-medium text-slate-800 rounded-full border border-transparent focus:border-[#0F3D2E] focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 transition-all placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setPredictions([]);
                      setShowPredictions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X size={15} />
                  </button>
                )}

                {/* Autocomplete Predictions Dropdown */}
                {showPredictions && predictions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-40 divide-y divide-gray-50">
                    {predictions.map((p) => (
                      <button
                        key={p.place_id}
                        type="button"
                        onClick={() => handleSelectPrediction(p.place_id, p.description)}
                        className="w-full px-4 py-3 text-left hover:bg-[#FAF5EB] flex items-start gap-3 transition-colors"
                      >
                        <MapPin size={16} className="text-[#0F3D2E] mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {p.structured_formatting?.main_text || p.description}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {p.structured_formatting?.secondary_text || ""}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative flex-1 w-full overflow-hidden">
              {isLoadingMap && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50 gap-2">
                  <Loader2 size={28} className="animate-spin text-[#0F3D2E]" />
                  <span className="text-xs font-semibold text-gray-600">Loading map...</span>
                </div>
              )}

              {mapError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-50 p-6 text-center">
                  <MapPin size={30} className="text-red-500 mb-2" />
                  <p className="text-sm font-bold text-red-700">{mapError}</p>
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="mt-3 px-4 py-2 bg-[#0F3D2E] text-white text-xs font-bold rounded-lg"
                  >
                    Enter Address Manually
                  </button>
                </div>
              )}

              <div ref={mapContainerRef} className="w-full h-full" />

              {/* 🌟 EMPIRE PLAZA ROYAL GREEN & GOLD FIXED CENTER PIN */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-20 flex flex-col items-center">
                <div
                  className={`transition-all duration-200 ease-out origin-bottom ${
                    isMapMoving ? "-translate-y-3 scale-110" : "translate-y-0 scale-100"
                  }`}
                >
                  <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
                    {/* Royal Green Teardrop with Gold Outline */}
                    <path
                      d="M22 0C9.849 0 0 9.849 0 22C0 35.2 18.7 50.6 20.9 52.4C21.56 52.9 22.44 52.9 23.1 52.4C25.3 50.6 44 35.2 44 22C44 9.849 34.151 0 22 0Z"
                      fill="#0F3D2E"
                      stroke="#D4AF37"
                      strokeWidth="2"
                    />
                    {/* Cream Inner Circle */}
                    <circle cx="22" cy="20" r="9" fill="#FAF5EB" />
                    {/* Gold Center Core */}
                    <circle cx="22" cy="20" r="4.5" fill="#D4AF37" />
                  </svg>
                </div>
                {/* Shadow underneath */}
                <div
                  className={`w-4 h-1.5 bg-black/35 rounded-full blur-[1px] transition-all duration-200 ${
                    isMapMoving ? "opacity-30 scale-75" : "opacity-80 scale-100"
                  }`}
                />
              </div>

              {/* Floating "Current location" GPS button (Royal Green Accent) */}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="absolute bottom-4 right-4 z-20 bg-white hover:bg-[#FAF5EB] text-[#0F3D2E] border border-[#0F3D2E]/20 shadow-[0_4px_16px_rgba(15,61,46,0.18)] px-4 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {isLocating ? (
                  <Loader2 size={16} className="animate-spin text-[#0F3D2E]" />
                ) : (
                  <Crosshair size={16} className="text-[#0F3D2E]" />
                )}
                <span>{isLocating ? "Locating..." : "Current location"}</span>
              </button>
            </div>

            {/* Bottom Card: Pinned Address Details & CTA */}
            <div className="relative z-30 bg-white rounded-t-3xl sm:rounded-b-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.12)] p-4 sm:p-6 border-t border-gray-100 flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F3D2E]/10 border border-[#0F3D2E]/25 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} className="text-[#0F3D2E]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] block mb-0.5">
                    Place pin at exact delivery location
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-black text-[#0F3D2E] truncate">
                    {isGeocoding ? (
                      <span className="inline-flex items-center gap-2 text-gray-400 font-sans text-xs">
                        <Loader2 size={13} className="animate-spin text-[#0F3D2E]" /> Detecting address...
                      </span>
                    ) : (
                      areaTitle || "Pin Selected Location"
                    )}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 font-medium leading-relaxed">
                    {fullAddress || "Drag map under pin to set exact building"}
                  </p>
                </div>
              </div>

              {/* Confirm & Proceed Button (Empire Plaza Royal Green + Gold Border) */}
              <button
                type="button"
                onClick={() => setStep("details")}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0F3D2E] hover:bg-[#024532] text-white font-bold text-sm tracking-wide shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/35 cursor-pointer"
              >
                <span>Confirm & proceed</span>
                <span className="text-[#D4AF37]">→</span>
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================
            STEP 2: ADDRESS DETAILS FORM
            ========================================================== */}
        {step === "details" && (
          <form
            onSubmit={handleSaveAddress}
            className="relative w-full h-full flex flex-col bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setStep("map")}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#0F3D2E] hover:bg-[#FAF5EB] active:scale-95 transition-all shrink-0"
                  aria-label="Back to Map"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-serif font-black text-[#0F3D2E] truncate">
                    {areaTitle || "Address Details"}
                  </h2>
                  <p className="text-[11px] text-gray-500 truncate">
                    {fullAddress || `${city}, ${state}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5">
              
              {/* 1. Receiver Details */}
              <div className="bg-[#FAF5EB]/60 rounded-2xl p-4 border border-[#0F3D2E]/15">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] block mb-2.5">
                  Receiver Details
                </span>

                {accountName && accountPhone ? (
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={useAccountDetails}
                      onChange={(e) => setUseAccountDetails(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0F3D2E] focus:ring-[#D4AF37]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900">
                        Use my account details
                      </p>
                      <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                        {accountName}, {accountPhone}
                      </p>
                    </div>
                  </label>
                ) : null}

                {/* If unchecked or no account details, show manual inputs */}
                {(!useAccountDetails || !accountName || !accountPhone) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200/60">
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide block mb-1">
                        Receiver Name *
                      </label>
                      <input
                        type="text"
                        value={customFullName}
                        onChange={(e) => {
                          setCustomFullName(e.target.value);
                          if (formErrors.fullName) setFormErrors((p) => ({ ...p, fullName: undefined }));
                        }}
                        placeholder="Enter full name"
                        className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:border-[#0F3D2E] ${
                          formErrors.fullName ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[10px] text-red-600 mt-1 font-medium">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide block mb-1">
                        Receiver Phone *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={customPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setCustomPhone(val);
                          if (formErrors.phone) setFormErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        placeholder="10-digit mobile number"
                        className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:border-[#0F3D2E] ${
                          formErrors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-red-600 mt-1 font-medium">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Location Details */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] block -mb-1">
                  Location Details
                </span>

                {/* Address Type Tag Pills */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddressType("home");
                      setSaveAs("Home");
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      addressType === "home"
                        ? "bg-[#0F3D2E] border-[#0F3D2E] text-white shadow-sm"
                        : "border-gray-200 text-gray-700 hover:border-[#0F3D2E]/30 hover:bg-[#FAF5EB]"
                    }`}
                  >
                    <Home size={14} />
                    <span>House</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAddressType("work");
                      setSaveAs("Office");
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      addressType === "work"
                        ? "bg-[#0F3D2E] border-[#0F3D2E] text-white shadow-sm"
                        : "border-gray-200 text-gray-700 hover:border-[#0F3D2E]/30 hover:bg-[#FAF5EB]"
                    }`}
                  >
                    <Briefcase size={14} />
                    <span>Office</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAddressType("other");
                      setSaveAs("Other");
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      addressType === "other"
                        ? "bg-[#0F3D2E] border-[#0F3D2E] text-white shadow-sm"
                        : "border-gray-200 text-gray-700 hover:border-[#0F3D2E]/30 hover:bg-[#FAF5EB]"
                    }`}
                  >
                    <Compass size={14} />
                    <span>Other</span>
                  </button>
                </div>

                {/* Building / Flat / Floor (Required) */}
                <div>
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide block mb-1">
                    Building / Floor / House No *
                  </label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => {
                      setBuilding(e.target.value);
                      if (formErrors.building) setFormErrors((p) => ({ ...p, building: undefined }));
                    }}
                    placeholder="e.g. Flat 4B, Emerald Heights, House 12"
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white focus:outline-none focus:border-[#0F3D2E] focus:ring-2 focus:ring-[#0F3D2E]/10 transition-all font-medium ${
                      formErrors.building ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {formErrors.building && (
                    <p className="text-[10px] text-red-600 mt-1 font-medium">{formErrors.building}</p>
                  )}
                </div>

                {/* Street / Landmark (Recommended) */}
                <div>
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide block mb-1">
                    Street / Landmark (Recommended)
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. Near Metro Pillar 240, Opp Federal Bank"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#0F3D2E] focus:ring-2 focus:ring-[#0F3D2E]/10 transition-all font-medium"
                  />
                </div>

                {/* Area / Locality Box with "Change" button */}
                <div className="flex items-center justify-between p-3.5 bg-[#FAF5EB]/60 border border-[#0F3D2E]/15 rounded-2xl gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#0F3D2E]/20 flex items-center justify-center shrink-0">
                      <MapPin size={17} className="text-[#0F3D2E]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
                        Area / Locality
                      </p>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {areaTitle || city}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {fullAddress || `${city}, ${state} - ${pincode}`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep("map")}
                    className="text-xs font-bold text-[#0F3D2E] hover:text-white border border-[#0F3D2E]/30 bg-white hover:bg-[#0F3D2E] px-3.5 py-1.5 rounded-lg active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Save address as */}
                <div>
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide block mb-1">
                    Save address as *
                  </label>
                  <input
                    type="text"
                    value={saveAs}
                    onChange={(e) => setSaveAs(e.target.value)}
                    placeholder="e.g. Home, Office, Mom's Place"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#0F3D2E] font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Footer: Save Button (Royal Green & Gold) */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-white shrink-0">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#0F3D2E] hover:bg-[#024532] text-white font-bold text-sm tracking-wide shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#D4AF37]/30 disabled:opacity-70 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#D4AF37]" />
                    <span>Saving Address...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} className="text-[#D4AF37]" />
                    <span>Save Address & Proceed</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}