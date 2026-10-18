"use client";

import React, { useEffect, useRef, useState } from "react";
import { Phone, Navigation, Loader2, MapPin, Bike, Utensils, PackageCheck } from "lucide-react";
import { loadGoogleMaps } from "@/lib/loadGoogleMaps";
import { getPusherClient } from "@/lib/pusherClient";
import type { DeliveryBoyInfo } from "@/features/profile/hooks/useProfileHook";

interface LiveOrderTrackingMapProps {
  orderId: number;
  deliveryAddress: string;
  deliveryBoy?: DeliveryBoyInfo | null;
  orderStatus: string;
  onStatusUpdate?: (newStatus: string) => void;
}

// Empire Plaza Kitchen location (Kadavanthra, Kochi)
const STORE_LOCATION = {
  lat: 9.967625,
  lng: 76.304040,
  name: "Empire Plaza Kitchen",
};

export default function LiveOrderTrackingMap({
  orderId,
  deliveryAddress,
  deliveryBoy,
  orderStatus,
  onStatusUpdate,
}: LiveOrderTrackingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const destinationMarkerRef = useRef<any>(null);
  const storeMarkerRef = useRef<any>(null);
  const riderMarkerRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [riderCoords, setRiderCoords] = useState<{ lat: number; lng: number } | null>(
    deliveryBoy?.latitude && deliveryBoy?.longitude
      ? { lat: Number(deliveryBoy.latitude), lng: Number(deliveryBoy.longitude) }
      : null
  );
  const [destCoords, setDestCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // 1. Geocode Delivery Address to Lat/Lng
  useEffect(() => {
    let isCancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (isCancelled || !deliveryAddress) return;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: deliveryAddress }, (results: any[], status: string) => {
          if (isCancelled) return;
          if (status === "OK" && results && results[0]) {
            const loc = results[0].geometry.location;
            setDestCoords({ lat: loc.lat(), lng: loc.lng() });
          } else {
            console.warn("Could not geocode customer address:", status);
            // Default near store location
            setDestCoords({ lat: 9.967625, lng: 76.304040 });
          }
        });
      })
      .catch((err) => {
        if (!isCancelled) setMapError("Failed to initialize Google Maps");
      });

    return () => {
      isCancelled = true;
    };
  }, [deliveryAddress]);

  // 2. Initialize Map & Markers
  useEffect(() => {
    if (!destCoords || !mapContainerRef.current) return;

    let isCancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (isCancelled || !mapContainerRef.current) return;

        setIsLoading(false);

        const initialCenter = riderCoords || destCoords || STORE_LOCATION;

        const map = new google.maps.Map(mapContainerRef.current, {
          center: initialCenter,
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

        // Store Marker (Empire Plaza Restaurant)
        const storeMarker = new google.maps.Marker({
          position: STORE_LOCATION,
          map,
          title: "Empire Plaza Kitchen",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#D4AF37",
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: "#0F3D2E",
          },
        });
        storeMarkerRef.current = storeMarker;

        // Destination Marker (Customer Address)
        const destMarker = new google.maps.Marker({
          position: destCoords,
          map,
          title: "Your Delivery Location",
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: "#0F3D2E",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
          },
        });
        destinationMarkerRef.current = destMarker;

        // Rider Marker (Delivery Boy)
        if (riderCoords) {
          const riderMarker = new google.maps.Marker({
            position: riderCoords,
            map,
            title: deliveryBoy?.name ? `${deliveryBoy.name} (Rider)` : "Delivery Partner",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#E09B16",
              fillOpacity: 1,
              strokeWeight: 3,
              strokeColor: "#FFFFFF",
            },
          });
          riderMarkerRef.current = riderMarker;
        }

        // Fit bounds to show Restaurant, Customer & Rider
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(STORE_LOCATION);
        bounds.extend(destCoords);
        if (riderCoords) bounds.extend(riderCoords);
        map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
      })
      .catch((err) => {
        if (!isCancelled) {
          setIsLoading(false);
          setMapError("Failed to load map");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [destCoords]);

  // 3. Move Rider Marker smoothly when coordinates update
  useEffect(() => {
    if (!riderCoords || !mapInstanceRef.current) return;

    if (riderMarkerRef.current) {
      riderMarkerRef.current.setPosition(riderCoords);
    } else {
      loadGoogleMaps().then((google) => {
        if (!mapInstanceRef.current) return;
        const riderMarker = new google.maps.Marker({
          position: riderCoords,
          map: mapInstanceRef.current,
          title: deliveryBoy?.name ? `${deliveryBoy.name} (Rider)` : "Delivery Partner",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#E09B16",
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: "#FFFFFF",
          },
        });
        riderMarkerRef.current = riderMarker;
      });
    }

    if (destCoords && mapInstanceRef.current && (window as any).google) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      bounds.extend(STORE_LOCATION);
      bounds.extend(destCoords);
      bounds.extend(riderCoords);
      mapInstanceRef.current.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
    }
  }, [riderCoords, destCoords, deliveryBoy?.name]);

  // 4. Pusher Real-time Location & Status Listener
  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe("orders-channel");

    // Rider Location Broadcast
    const handleLocationUpdate = (data: {
      delivery_boy_id?: number;
      latitude: number;
      longitude: number;
      active_order_ids?: number[];
    }) => {
      const isTargetRider = deliveryBoy?.id && data.delivery_boy_id === deliveryBoy.id;
      const isTargetOrder = Array.isArray(data.active_order_ids) && data.active_order_ids.includes(orderId);

      if (isTargetRider || isTargetOrder || !deliveryBoy) {
        setRiderCoords({ lat: data.latitude, lng: data.longitude });
      }
    };

    // Order Status Update
    const handleStatusUpdate = (data: { order_id?: number; status?: string }) => {
      if (data.order_id === orderId && data.status && onStatusUpdate) {
        onStatusUpdate(data.status);
      }
    };

    channel.bind("delivery-location-updated", handleLocationUpdate);
    channel.bind("order-status-updated", handleStatusUpdate);

    return () => {
      channel.unbind("delivery-location-updated", handleLocationUpdate);
      channel.unbind("order-status-updated", handleStatusUpdate);
    };
  }, [orderId, deliveryBoy?.id, onStatusUpdate]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#EADBCA] bg-white shadow-sm flex flex-col">
      {/* Top Live Bar */}
      <div className="px-4 py-2.5 bg-gradient-to-r from-[#0F3D2E] to-[#185843] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
            Live Order Tracking
          </span>
        </div>

        <span className="text-[10px] font-medium text-emerald-100 uppercase tracking-widest">
          {orderStatus.replace(/_/g, " ")}
        </span>
      </div>

      {/* Map View */}
      <div className="relative w-full h-56 sm:h-64 bg-stone-100">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100/90 gap-2">
            <Loader2 size={24} className="animate-spin text-[#0F3D2E]" />
            <span className="text-xs font-semibold text-stone-600">Connecting to live map...</span>
          </div>
        )}

        {mapError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
            <MapPin size={24} className="text-amber-600 mb-1" />
            <span className="text-xs font-semibold text-stone-700">{mapError}</span>
          </div>
        )}

        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Legend Overlay */}
        <div className="absolute bottom-2 left-2 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-stone-200 text-[10px] font-medium shadow-xs flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#0F3D2E]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0F3D2E]"></span>
            <span>Your Address</span>
          </div>
          <div className="flex items-center gap-1 text-[#D4AF37]">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span>Kitchen</span>
          </div>
          {deliveryBoy && (
            <div className="flex items-center gap-1 text-amber-700">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Rider (Live)</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Delivery / Rider Info Card */}
      <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#0F3D2E] text-amber-300 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            {deliveryBoy ? (
              <Bike size={20} />
            ) : orderStatus === "ready_for_pickup" ? (
              <PackageCheck size={20} />
            ) : (
              <Utensils size={18} />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-[#0F3D2E] truncate">
                {deliveryBoy?.name
                  ? deliveryBoy.name
                  : orderStatus === "ready_for_pickup"
                  ? "Food Ready • Assigning Partner"
                  : orderStatus === "preparing"
                  ? "Kitchen Cooking Your Order"
                  : "Order Placed at Empire Plaza"}
              </p>
              {deliveryBoy?.employee_id && (
                <span className="text-[9px] font-bold bg-[#EADBCA]/50 text-stone-700 px-1.5 py-0.5 rounded">
                  {deliveryBoy.employee_id}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500 truncate mt-0.5">
              {deliveryBoy
                ? riderCoords
                  ? "Rider is heading to your address"
                  : "Rider assigned • Live GPS updates will appear shortly"
                : orderStatus === "ready_for_pickup"
                ? "Your food is packed & ready! Connecting with nearest delivery partner."
                : "Your meal is being carefully prepared in our kitchen."}
            </p>
          </div>
        </div>

        {deliveryBoy?.phone && (
          <a
            href={`tel:${deliveryBoy.phone}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F3D2E] text-white text-xs font-bold hover:bg-[#16533F] transition-all shrink-0 shadow-xs"
          >
            <Phone size={13} className="text-amber-300" />
            <span>Call</span>
          </a>
        )}
      </div>
    </div>
  );
}
