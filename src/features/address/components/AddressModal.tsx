"use client";

import React, { useEffect, useState } from "react";
import type { AddressData } from "../hook/useAddressHook";

interface AddressModalProps {
  isOpen: boolean;
  address: AddressData | null;
  onClose: () => void;
  onSave: (address: Omit<AddressData, "id">) => void;
}

interface ReverseGeocodeResponse {
  localityInfo?: {
    administrative?: Array<{
      name?: string;
      description?: string;
      order?: number;
    }>;
  };
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  postcode?: string;
  localityName?: string;
  countryName?: string;
  latitude?: number;
  longitude?: number;
}

const AddressModal = ({
  isOpen,
  address,
  onClose,
  onSave,
}: AddressModalProps) => {
  const [addressType, setAddressType] =
    useState<AddressData["address_type"]>("home");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (address) {
      setAddressType(address.address_type);
      setFullName(address.full_name);
      setPhoneNumber(address.phone_number);
      setAddressLine(address.address_line);
      setCity(address.city);
      setState(address.state);
      setPincode(address.pincode);
      setIsDefault(address.is_default);
    } else {
      setAddressType("home");
      setFullName("");
      setPhoneNumber("");
      setAddressLine("");
      setCity("");
      setState("");
      setPincode("");
      setIsDefault(false);
    }

    setLocationError("");
    setIsLocating(false);
  }, [isOpen, address]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /**
   * Get user's current device location
   * and convert coordinates into an address.
   */
const populateCurrentLocation = () => {
  setLocationError("");

  if (!navigator.geolocation) {
    setLocationError(
      "Location is not supported by this browser."
    );
    return;
  }

  setIsLocating(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        if (!response.ok) {
          throw new Error("Reverse geocoding failed");
        }

        const data = await response.json();

        console.log("Location response:", data);

        /*
         * City
         */
        const detectedCity =
          data.city ||
          data.locality ||
          data.localityName ||
          "";

        /*
         * State
         */
        const detectedState =
          data.principalSubdivision || "";

        /*
         * PINCODE
         *
         * BigDataCloud returns the postal code
         * in the `postcode` field.
         */
        const detectedPincode =
          data.postcode ||
          "";

        /*
         * Address / locality
         */
        const detectedAddress =
          data.locality ||
          data.localityName ||
          data.city ||
          "";

        setAddressLine(detectedAddress);
        setCity(detectedCity);
        setState(detectedState);
        setPincode(detectedPincode);

        setLocationError("");
      } catch (error) {
        console.error(
          "Reverse geocoding error:",
          error
        );

        setLocationError(
          "Unable to find your address. Please enter it manually."
        );
      } finally {
        setIsLocating(false);
      }
    },
    (error) => {
      console.error("Geolocation error:", error);

      setIsLocating(false);

      if (error.code === error.PERMISSION_DENIED) {
        setLocationError(
          "Location permission was denied. Please allow location access and try again."
        );
      } else if (
        error.code === error.POSITION_UNAVAILABLE
      ) {
        setLocationError(
          "Your current location could not be determined."
        );
      } else if (error.code === error.TIMEOUT) {
        setLocationError(
          "Location request timed out. Please try again."
        );
      } else {
        setLocationError(
          "Unable to get your current location."
        );
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSave({
      address_type: addressType,
      full_name: fullName,
      phone_number: phoneNumber,
      address_line: addressLine,
      city,
      state,
      pincode,
      is_default: isDefault,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
      style={{
        background: "rgba(9, 40, 30, 0.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative z-[10000] w-full max-w-[440px] rounded-[22px] border border-[#EADBCA] bg-white p-5 sm:p-6 md:p-7"
        style={{
          boxShadow:
            "0 25px 60px -15px rgba(9, 40, 30, 0.35)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-800 sm:right-5 sm:top-5"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Heading */}
        <div className="mb-5 pr-8">
          <h2
            id="modal-title"
            className="font-serif text-xl font-bold tracking-wide text-[#0F3D2E] sm:text-2xl"
          >
            {address ? "Edit Address" : "New Address"}
          </h2>

          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
            Delivery Details
          </p>
        </div>

        {/* Address Type */}
        <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-[#F1F5F9]/80 p-1 text-xs font-bold">
          {(["home", "work", "other"] as const).map(
            (type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAddressType(type)}
                className={`rounded-lg py-2 transition-all ${
                  addressType === type
                    ? "bg-white text-[#D9A441] shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {type.toUpperCase()}
              </button>
            )
          )}
        </div>

        {/* Current Location */}
        <button
          type="button"
          onClick={populateCurrentLocation}
          disabled={isLocating}
          className="group mb-4 flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed border-[#D9A441] bg-[#FDF9F0] p-3 text-left transition-colors hover:bg-[#FBF6EC] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EADBCA] bg-white text-[#0F3D2E] shadow-sm">
              {isLocating ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-90"
                    d="M21 12a9 9 0 00-9-9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold leading-snug text-[#0F3D2E]">
                {isLocating
                  ? "Detecting Your Location..."
                  : "Use Current Location / Map"}
              </p>

              <p className="text-[11px] font-medium text-[#78716C]">
                {isLocating
                  ? "Please wait..."
                  : "Tap to detect your location"}
              </p>
            </div>
          </div>

          {/* Map Preview */}
          <div className="relative flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#CBD5E1] bg-[#E2E8F0]">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-amber-50 to-emerald-200" />

            <div className="absolute h-0.5 w-12 rotate-45 bg-white/70" />

            <div className="absolute h-0.5 w-12 -rotate-12 bg-white/70" />

            <div className="relative z-10 h-3 w-3 animate-bounce rounded-full border-2 border-white bg-[#D9A441] shadow-sm" />
          </div>
        </button>

        {/* Location Error */}
        {locationError && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
            <p className="text-[11px] font-medium leading-5 text-red-600">
              {locationError}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          className="space-y-3.5"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              className="w-full rounded-xl border-none bg-[#F1F5F9] px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 transition-all focus:ring-2 focus:ring-[#D9A441] sm:text-sm"
              placeholder="Full name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
              Phone Number
            </label>

            <input
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(
                  event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                )
              }
              className="w-full rounded-xl border-none bg-[#F1F5F9] px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 transition-all focus:ring-2 focus:ring-[#D9A441] sm:text-sm"
              placeholder="10-digit phone number"
              inputMode="numeric"
              maxLength={10}
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
              Complete Address
            </label>

            <input
              value={addressLine}
              onChange={(event) =>
                setAddressLine(event.target.value)
              }
              className="w-full rounded-xl border-none bg-[#F1F5F9] px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 transition-all focus:ring-2 focus:ring-[#D9A441] sm:text-sm"
              placeholder="House No, Building, Street"
              required
            />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                City
              </label>

              <input
                value={city}
                onChange={(event) =>
                  setCity(event.target.value)
                }
                className="w-full min-w-0 rounded-xl border-none bg-[#F1F5F9] px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 transition-all focus:ring-2 focus:ring-[#D9A441] sm:text-sm"
                placeholder="City"
                required
              />
            </div>

            <div className="min-w-0">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
                State
              </label>

              <input
                value={state}
                onChange={(event) =>
                  setState(event.target.value)
                }
                className="w-full min-w-0 rounded-xl border-none bg-[#F1F5F9] px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 transition-all focus:ring-2 focus:ring-[#D9A441] sm:text-sm"
                placeholder="State"
                required
              />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#78716C]">
              Pincode
            </label>

            <input
              value={pincode}
              onChange={(event) =>
                setPincode(
                  event.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              className="w-full rounded-xl border-none bg-[#F1F5F9] px-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 transition-all focus:ring-2 focus:ring-[#D9A441] sm:text-sm"
              placeholder="6-digit"
              inputMode="numeric"
              maxLength={6}
              required
            />
          </div>

          {/* Default */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              checked={isDefault}
              onChange={(event) =>
                setIsDefault(event.target.checked)
              }
              className="h-4 w-4 rounded border-stone-300 text-[#0F3D2E] focus:ring-[#D9A441]"
              id="checkbox-default"
              type="checkbox"
            />

            <label
              htmlFor="checkbox-default"
              className="cursor-pointer select-none text-xs font-bold uppercase tracking-wider text-stone-700"
            >
              Set as default
            </label>
          </div>

          {/* Save */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-[#0F3D2E] py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#185843]"
              style={{
                boxShadow:
                  "0 8px 24px -4px rgba(15, 61, 46, 0.09)",
              }}
            >
              {address ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;