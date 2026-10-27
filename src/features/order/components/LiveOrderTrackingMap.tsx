"use client";

import React, { useEffect, useRef, useState } from "react";
import { Phone, Navigation, Loader2, MapPin, Bike, Crosshair, Sparkles, Plus, Minus } from "lucide-react";
import { loadGoogleMaps } from "@/lib/loadGoogleMaps";
import { getPusherClient } from "@/lib/pusherClient";
import type { DeliveryBoyInfo } from "@/features/profile/hooks/useProfileHook";

interface LiveOrderTrackingMapProps {
  orderId: number;
  deliveryAddress: string;
  deliveryLat?: number | null;
  deliveryLng?: number | null;
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

function getRiderBikeSvg(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="72" viewBox="0 0 60 72">
    <defs>
      <filter id="cust-pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3" flood-color="#000000" flood-opacity="0.38"/>
      </filter>
      <linearGradient id="cust-pin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F3D2E"/>
        <stop offset="100%" stop-color="#062319"/>
      </linearGradient>
    </defs>

    <!-- Pulsing Radar circle under needle tip -->
    <circle cx="30" cy="64" r="7" fill="#059669" opacity="0.45">
      <animate attributeName="r" from="3" to="12" dur="1.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.9" to="0" dur="1.4s" repeatCount="indefinite"/>
    </circle>

    <!-- Map Pin Teardrop Shape -->
    <path d="M30 4 C16 4 6 14 6 28 C6 41 26 61 29 64.2 C29.5 64.8 30.5 64.8 31 64.2 C34 61 54 41 54 28 C54 14 44 4 30 4 Z"
          fill="url(#cust-pin-grad)"
          stroke="#D4AF37"
          stroke-width="2.2"
          filter="url(#cust-pin-shadow)"/>

    <!-- High-Contrast Crisp White Inner Disc -->
    <circle cx="30" cy="27" r="19" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.8"/>

    <!-- Delivery Scooter & Rider Graphic -->
    <g transform="translate(13.5, 13)">
      <!-- Amber Delivery Thermal Bag/Box -->
      <rect x="1" y="7" width="9" height="9" rx="1.5" fill="#D97706" stroke="#92400E" stroke-width="0.7"/>
      <path d="M1 11.5 H10" stroke="#FDE68A" stroke-width="1"/>
      <circle cx="5.5" cy="9.2" r="1" fill="#FFFFFF"/>

      <!-- Rider Helmet -->
      <circle cx="17" cy="4" r="4" fill="#0F3D2E" stroke="#D4AF37" stroke-width="0.8"/>
      <path d="M19 3.5 C20 4.2 20.5 5.5 19.5 6.5 L17.5 6.5" stroke="#38BDF8" stroke-width="1" stroke-linecap="round" fill="none"/>

      <!-- Rider Jacket & Arm -->
      <path d="M13.5 8 C14.5 7 18 7 19.5 10.5 L16 14 L12 12.5 Z" fill="#0F3D2E"/>
      <path d="M17 10 L23 11.5" stroke="#0F3D2E" stroke-width="1.8" stroke-linecap="round"/>

      <!-- Handlebar & Mirror -->
      <path d="M22 9 L24.5 9" stroke="#334155" stroke-width="1.2" stroke-linecap="round"/>

      <!-- Scooter Windshield & Front Cowl -->
      <path d="M22.5 10.5 L27 13 L25 16.5 L22 15 Z" fill="#059669"/>
      <!-- Headlight Yellow Glow -->
      <path d="M27 13.5 L28.8 14.2" stroke="#FACC15" stroke-width="1.8" stroke-linecap="round"/>

      <!-- Scooter Body & Footboard -->
      <path d="M10 14.5 L15 16 L22 16 L20 19.5 L10 18 Z" fill="#059669"/>
      <path d="M9.5 17.5 L22.5 17.5" stroke="#047857" stroke-width="1.2" stroke-linecap="round"/>

      <!-- Fenders -->
      <path d="M3 18 C3 15 9.5 15 9.5 18" stroke="#059669" stroke-width="1.6" fill="none"/>
      <path d="M20.5 18 C20.5 15 27 15 27 18" stroke="#059669" stroke-width="1.6" fill="none"/>

      <!-- Rear Wheel (Black Tire + White Rim + Gold Hub) -->
      <circle cx="6.5" cy="19.5" r="4.2" fill="#1E293B" stroke="#0F172A" stroke-width="1.2"/>
      <circle cx="6.5" cy="19.5" r="2.2" fill="#E2E8F0"/>
      <circle cx="6.5" cy="19.5" r="0.9" fill="#D4AF37"/>

      <!-- Front Wheel (Black Tire + White Rim + Gold Hub) -->
      <circle cx="23.5" cy="19.5" r="4.2" fill="#1E293B" stroke="#0F172A" stroke-width="1.2"/>
      <circle cx="23.5" cy="19.5" r="2.2" fill="#E2E8F0"/>
      <circle cx="23.5" cy="19.5" r="0.9" fill="#D4AF37"/>
    </g>

    <!-- Top Status Badge -->
    <rect x="18" y="1" width="24" height="8.5" rx="4.25" fill="#10B981" stroke="#FFFFFF" stroke-width="0.8"/>
    <text x="30" y="7" font-family="system-ui, -apple-system, sans-serif" font-size="6" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">LIVE</text>
  </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

export default function LiveOrderTrackingMap({
  orderId,
  deliveryAddress,
  deliveryLat,
  deliveryLng,
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

  // 1. Resolve Delivery Destination Coordinates (Use exact GPS coordinates if available!)
  useEffect(() => {
    if (
      deliveryLat !== undefined &&
      deliveryLat !== null &&
      deliveryLng !== undefined &&
      deliveryLng !== null
    ) {
      const latNum = Number(deliveryLat);
      const lngNum = Number(deliveryLng);
      if (!isNaN(latNum) && !isNaN(lngNum) && latNum !== 0 && lngNum !== 0) {
        setDestCoords({ lat: latNum, lng: lngNum });
        return;
      }
    }

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
  }, [deliveryAddress, deliveryLat, deliveryLng]);

  // Fit bounds helper: Focused and smart zoom
  const fitMapBounds = (map: any, google: any) => {
    if (!map || !google || !destCoords) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(destCoords);

    if (riderCoords && orderStatus === "out_for_delivery") {
      bounds.extend(riderCoords);
    } else {
      bounds.extend(STORE_LOCATION);
      if (riderCoords) bounds.extend(riderCoords);
    }

    map.fitBounds(bounds, { top: 60, bottom: 60, left: 50, right: 50 });
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
          zoom: 15,
          disableDefaultUI: true, // 🚫 Removes ALL default clutter buttons (StreetView, Map/Sat, Terms, etc.)
          gestureHandling: "greedy", // 🚀 One-finger smooth panning & pinch zoom on mobile! No 2-finger popup!
          clickableIcons: false, // 🚫 Disables clicking random POIs/businesses on map
          keyboardShortcuts: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          rotateControl: false,
          scaleControl: false,
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
            url: getRiderBikeSvg(),
            scaledSize: new google.maps.Size(56, 68),
            anchor: new google.maps.Point(28, 65),
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

        // Draw connecting road route path
        const startPoint = riderCoords || STORE_LOCATION;
        const fetchAndApplyRoadRoute = async () => {
          let roadPoints: { lat: number; lng: number }[] = [startPoint, destCoords];
          try {
            const res = await fetch(
              `https://router.project-osrm.org/route/v1/driving/${startPoint.lng},${startPoint.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`
            );
            if (res.ok) {
              const data = await res.json();
              if (data.code === "Ok" && data.routes && data.routes.length > 0) {
                roadPoints = data.routes[0].geometry.coordinates.map((c: [number, number]) => ({
                  lat: c[1],
                  lng: c[0],
                }));
              }
            }
          } catch (err) {
            console.warn("Road routing fetch failed, falling back to direct line:", err);
          }

          if (isCancelled) return;

          if (routePolylineRef.current) {
            routePolylineRef.current.setPath(roadPoints);
          } else {
            const routePath = new google.maps.Polyline({
              path: roadPoints,
              geodesic: true,
              strokeColor: "#0F3D2E",
              strokeOpacity: 0.85,
              strokeWeight: 5,
              map,
            });
            routePolylineRef.current = routePath;
          }
        };

        fetchAndApplyRoadRoute();
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
          url: getRiderBikeSvg(),
          scaledSize: new google.maps.Size(56, 68),
          anchor: new google.maps.Point(28, 65),
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
        fetch(
          `https://router.project-osrm.org/route/v1/driving/${riderCoords.lng},${riderCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`
        )
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.code === "Ok" && data.routes?.[0]) {
              const roadPoints = data.routes[0].geometry.coordinates.map((c: [number, number]) => ({
                lat: c[1],
                lng: c[0],
              }));
              if (routePolylineRef.current) routePolylineRef.current.setPath(roadPoints);
            } else if (routePolylineRef.current) {
              routePolylineRef.current.setPath([riderCoords, destCoords]);
            }
          })
          .catch(() => {
            if (routePolylineRef.current) {
              routePolylineRef.current.setPath([riderCoords, destCoords]);
            }
          });
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
      <div className="relative w-full h-72 sm:h-84 md:h-96 bg-stone-100">
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

        <div
          ref={mapContainerRef}
          className="w-full h-full [&_.gm-style-cc]:hidden [&_.gmnoprint]:hidden [&_a[href^='https://maps.google.com/maps']]:hidden"
        />

        {/* Top Floating Live Status Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
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
        </div>

        {/* Floating Minimal Controls (Re-center & Smooth Zoom) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-auto">
          {/* Re-center button */}
          <button
            type="button"
            onClick={() => {
              if (mapInstanceRef.current && (window as any).google) {
                fitMapBounds(mapInstanceRef.current, (window as any).google);
              }
            }}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-stone-700 hover:text-[#0F3D2E] shadow-md border border-[#EADBCA] flex items-center justify-center transition-all active:scale-90 hover:bg-stone-50"
            title="Re-center on Route"
            aria-label="Re-center map"
          >
            <Crosshair size={17} />
          </button>

          {/* Zoom In button */}
          <button
            type="button"
            onClick={() => {
              if (mapInstanceRef.current) {
                const z = mapInstanceRef.current.getZoom() || 15;
                mapInstanceRef.current.setZoom(Math.min(z + 1, 20));
              }
            }}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-stone-700 hover:text-[#0F3D2E] shadow-md border border-[#EADBCA] flex items-center justify-center transition-all active:scale-90 hover:bg-stone-50"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>

          {/* Zoom Out button */}
          <button
            type="button"
            onClick={() => {
              if (mapInstanceRef.current) {
                const z = mapInstanceRef.current.getZoom() || 15;
                mapInstanceRef.current.setZoom(Math.max(z - 1, 10));
              }
            }}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-stone-700 hover:text-[#0F3D2E] shadow-md border border-[#EADBCA] flex items-center justify-center transition-all active:scale-90 hover:bg-stone-50"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
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
