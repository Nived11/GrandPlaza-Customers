"use client";

import React, { useEffect, useRef, useState } from "react";
import { Phone, Navigation, Loader2, MapPin, Bike, Crosshair, Sparkles } from "lucide-react";
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

// Modern Food Delivery Map Theme: Clean, minimal clutter, soft pastel palette
const MODERN_MAP_STYLES = [
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#DCE9F2" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F7F8FA" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FFFFFF" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#FDEEC8" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#F5DF9D" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#78716C" }] },
];

export default function LiveOrderTrackingMap({
  orderId,
  deliveryAddress,
  deliveryBoy,
  orderStatus,
  onStatusUpdate,
}: LiveOrderTrackingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const routePolylineRef = useRef<any>(null);
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

  // 1. Geocode Delivery Address
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
            // Default near store in Kochi
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

  // Fit bounds helper
  const fitMapBounds = (map: any, google: any) => {
    if (!map || !google || !destCoords) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(STORE_LOCATION);
    bounds.extend(destCoords);
    if (riderCoords) bounds.extend(riderCoords);
    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  };

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
          zoomControl: false, // Clean mobile-app aesthetic
          styles: MODERN_MAP_STYLES,
        });
        mapInstanceRef.current = map;

        // Custom SVG Pin 1: Empire Plaza Kitchen
        const storeIcon = {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
              <svg width="42" height="50" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C9.4 0 0 9.4 0 21C0 33.6 18 48.5 20 49.5C20.6 49.8 21.4 49.8 22 49.5C24 48.5 42 33.6 42 21C42 9.4 32.6 0 21 0Z" fill="#0F3D2E" stroke="#D4AF37" stroke-width="2.5"/>
                <circle cx="21" cy="20" r="11" fill="#FAF5EB"/>
                <path d="M17 14v11M18.5 14v5M15.5 14v5M24 14c0 3-1.5 4.5-3 5v6" stroke="#0F3D2E" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            `),
          scaledSize: new google.maps.Size(38, 46),
          anchor: new google.maps.Point(19, 46),
        };

        const storeMarker = new google.maps.Marker({
          position: STORE_LOCATION,
          map,
          title: "Empire Plaza Kitchen",
          icon: storeIcon,
          zIndex: 10,
        });
        storeMarkerRef.current = storeMarker;

        // Custom SVG Pin 2: Customer Destination (Home)
        const destIcon = {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
              <svg width="42" height="50" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C9.4 0 0 9.4 0 21C0 33.6 18 48.5 20 49.5C20.6 49.8 21.4 49.8 22 49.5C24 48.5 42 33.6 42 21C42 9.4 32.6 0 21 0Z" fill="#D9A441" stroke="#FFFFFF" stroke-width="2.5"/>
                <circle cx="21" cy="20" r="11" fill="#FFFFFF"/>
                <path d="M15 22v-4l6-4.5l6 4.5v4h-3.5v-3h-5v3h-3.5z" fill="#0F3D2E"/>
              </svg>
            `),
          scaledSize: new google.maps.Size(38, 46),
          anchor: new google.maps.Point(19, 46),
        };

        const destMarker = new google.maps.Marker({
          position: destCoords,
          map,
          title: "Your Delivery Location",
          icon: destIcon,
          zIndex: 15,
        });
        destinationMarkerRef.current = destMarker;

        // Custom SVG Pin 3: Delivery Partner (Live Bike Pin)
        if (riderCoords) {
          const riderIcon = {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" fill="#0F3D2E" stroke="#D4AF37" stroke-width="3"/>
                  <circle cx="24" cy="24" r="18" fill="#185843"/>
                  <circle cx="16" cy="28" r="4.5" stroke="#FAF5EB" stroke-width="2"/>
                  <circle cx="32" cy="28" r="4.5" stroke="#FAF5EB" stroke-width="2"/>
                  <path d="M16 28l5.5-9h6l4.5 9M21.5 19l2.5 9" stroke="#FAF5EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M26 15h4" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
              `),
            scaledSize: new google.maps.Size(46, 46),
            anchor: new google.maps.Point(23, 23),
          };

          const riderMarker = new google.maps.Marker({
            position: riderCoords,
            map,
            title: deliveryBoy?.name ? `${deliveryBoy.name} (Delivery Partner)` : "Delivery Partner",
            icon: riderIcon,
            zIndex: 30,
          });
          riderMarkerRef.current = riderMarker;
        }

        // Draw connecting route path
        const routePoints = [
          STORE_LOCATION,
          ...(riderCoords ? [riderCoords] : []),
          destCoords,
        ];

        const routePath = new google.maps.Polyline({
          path: routePoints,
          geodesic: true,
          strokeColor: "#0F3D2E",
          strokeOpacity: 0.7,
          strokeWeight: 4,
          map,
        });
        routePolylineRef.current = routePath;

        fitMapBounds(map, google);
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

    loadGoogleMaps().then((google) => {
      if (!mapInstanceRef.current) return;

      if (riderMarkerRef.current) {
        riderMarkerRef.current.setPosition(riderCoords);
      } else {
        const riderIcon = {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="#0F3D2E" stroke="#D4AF37" stroke-width="3"/>
                <circle cx="24" cy="24" r="18" fill="#185843"/>
                <circle cx="16" cy="28" r="4.5" stroke="#FAF5EB" stroke-width="2"/>
                <circle cx="32" cy="28" r="4.5" stroke="#FAF5EB" stroke-width="2"/>
                <path d="M16 28l5.5-9h6l4.5 9M21.5 19l2.5 9" stroke="#FAF5EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M26 15h4" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            `),
          scaledSize: new google.maps.Size(46, 46),
          anchor: new google.maps.Point(23, 23),
        };

        const riderMarker = new google.maps.Marker({
          position: riderCoords,
          map: mapInstanceRef.current,
          title: deliveryBoy?.name ? `${deliveryBoy.name} (Delivery Partner)` : "Delivery Partner",
          icon: riderIcon,
          zIndex: 30,
        });
        riderMarkerRef.current = riderMarker;
      }

      if (routePolylineRef.current && destCoords) {
        routePolylineRef.current.setPath([
          STORE_LOCATION,
          riderCoords,
          destCoords,
        ]);
      }

      fitMapBounds(mapInstanceRef.current, google);
    });
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
    <div className="w-full rounded-3xl overflow-hidden border border-[#EADBCA] bg-white shadow-[0_12px_36px_-6px_rgba(15,61,46,0.12)] flex flex-col">
      {/* 🌟 Interactive Live Map Container */}
      <div className="relative w-full h-64 sm:h-72 bg-stone-100">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-100/90 gap-2">
            <Loader2 size={26} className="animate-spin text-[#0F3D2E]" />
            <span className="text-xs font-bold text-stone-600">Connecting live GPS radar...</span>
          </div>
        )}

        {mapError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
            <MapPin size={26} className="text-[#D9A441] mb-1" />
            <span className="text-xs font-bold text-stone-700">{mapError}</span>
          </div>
        )}

        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Top Floating ETA Pill Badge (Just like top delivery apps!) */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-[#0F3D2E]/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full shadow-lg border border-[#D4AF37]/30 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black tracking-wider uppercase text-[#D4AF37]">
              {orderStatus === "out_for_delivery"
                ? "On the Way • Live GPS"
                : orderStatus === "ready_for_pickup"
                ? "Food Ready • Assigning Partner"
                : "Cooking in Kitchen"}
            </span>
          </div>

          {/* Re-center button */}
          <button
            type="button"
            onClick={() => {
              if (mapInstanceRef.current && (window as any).google) {
                fitMapBounds(mapInstanceRef.current, (window as any).google);
              }
            }}
            className="w-8 h-8 rounded-full bg-white text-stone-700 hover:text-[#0F3D2E] shadow-md border border-stone-200 flex items-center justify-center pointer-events-auto transition-transform active:scale-95"
            aria-label="Center Map"
          >
            <Crosshair size={16} />
          </button>
        </div>

        {/* Bottom Map Legend */}
        <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#EADBCA] text-[10px] font-bold shadow-md flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#0F3D2E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F3D2E] border border-white"></span>
            <span>Kitchen</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8C6415]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441] border border-white"></span>
            <span>Home</span>
          </div>
          {deliveryBoy && (
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#185843] border border-white"></span>
              <span>Rider</span>
            </div>
          )}
        </div>
      </div>

      {/* 🛵 Sleek Delivery Partner Action Card */}
      <div className="p-4 bg-gradient-to-b from-[#FDFBF7] to-white border-t border-[#EADBCA] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#0F3D2E] text-[#D4AF37] flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
            <Bike size={24} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-extrabold text-[#0F3D2E] truncate">
                {deliveryBoy?.name || "Empire Plaza Delivery Fleet"}
              </h4>
              <span className="text-[10px] font-black bg-[#D4AF37]/20 text-[#8C6415] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                ★ 4.9 Verified
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium truncate mt-0.5">
              {deliveryBoy
                ? riderCoords
                  ? "Rider is driving to your location with your food"
                  : "Partner assigned • Heading to kitchen for pickup"
                : "Connecting nearest delivery partner for swift dispatch"}
            </p>
          </div>
        </div>

        {deliveryBoy?.phone && (
          <a
            href={`tel:${deliveryBoy.phone}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F3D2E] hover:bg-[#16533F] text-[#D4AF37] text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
          >
            <Phone size={14} className="text-[#D4AF37]" />
            <span>Call Partner</span>
          </a>
        )}
      </div>
    </div>
  );
}
