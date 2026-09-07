"use client";

import { useEffect, useState } from "react";
import { getHomeApi } from "../api/homeApi";
import { toast } from "sonner";
import { extractErrorMessages } from "@/utils/extractErrorMessages";

export interface HomeVariant {
  id: number;
  size_name: string;
  actual_price: string;
  offer_price: string;
  is_available: boolean;
}

export interface HomeMenuItem {
  id: number;
  category: number;
  category_name: string;
  section: string;
  name: string;
  description: string;
  image: string | null;
  banner_image: string | null;
  dietary_preference: string;
  has_variants: boolean;
  actual_price: string | null;
  offer_price: string | null;
  is_available: boolean;
  created_at: string;
  variants: HomeVariant[];
}

export interface HomeCategory {
  id: number;
  name: string;
  image: string;
}

export interface HomeData {
  banners: HomeMenuItem[];
  categories: HomeCategory[];
  best_sellers: HomeMenuItem[];
  combo_menu: HomeMenuItem[];
  todays_special: HomeMenuItem[];
}

export interface HomeResponse {
  status: boolean;
  data: HomeData;
}

export const useHomeHook = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHome = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: HomeResponse = await getHomeApi();

      console.log("HOME API RESPONSE:", response);

      if (response?.status && response?.data) {
        setHomeData(response.data);
      } else {
        setHomeData(null);
      }
    } catch (err: any) {
      console.error("Error fetching home data:", err);

      const message = extractErrorMessages(err);

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return {
    homeData,
    loading,
    error,
    fetchHome,
  };
};