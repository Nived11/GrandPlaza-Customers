"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getMenuItemsApi } from "../api/menuApi";
import { extractErrorMessages } from "@/utils/extractErrorMessages";
import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

export interface MenuCategory {
  id: number;
  name: string;
}

export const useMenuHook = () => {
  const [menuItems, setMenuItems] = useState<HomeMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMenuItemsApi();

      console.log("MENU API RESPONSE:", response);

      // Earlier sample response was a raw array. Falling back to
      // response.data in case this ever gets wrapped like Home's
      // { status, data } shape.
      const items: HomeMenuItem[] = Array.isArray(response)
        ? response
        : response?.data ?? [];

      setMenuItems(items);
    } catch (err: any) {
      console.error("Error fetching menu data:", err);

      const message = extractErrorMessages(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Derived from the item list itself (category id + category_name).
  // There's no confirmed standalone categories-with-image endpoint for
  // Menu yet — if one exists (matching HomeCategory { id, name, image }
  // the way homeData.categories does for CravingSection), swap this out
  // for that instead.
  const categories: MenuCategory[] = useMemo(() => {
    const seen = new Map<number, string>();
    menuItems.forEach((item) => {
      if (!seen.has(item.category)) {
        seen.set(item.category, item.category_name);
      }
    });
    return Array.from(seen, ([id, name]) => ({ id, name }));
  }, [menuItems]);

  return { menuItems, categories, loading, error, fetchMenu };
};
