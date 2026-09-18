"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  getMenuItemsApi,
  type MenuQueryParams,
} from "../api/menuApi";

import { extractErrorMessages } from "@/utils/extractErrorMessages";
import type { HomeMenuItem } from "@/features/home/hooks/useHomeHook";

export interface MenuCategory {
  id: number;
  name: string;
}

export type MenuDiet = "ALL" | "VEG" | "NON-VEG";

export type MenuSection =
  | "ALL"
  | "BEST SELLER"
  | "COMBO MENU"
  | "TODAY'S SPECIAL"
  | "OTHERS";

export interface UseMenuFilters {
  search?: string;
  category?: number | "ALL";
  diet?: MenuDiet;
  section?: MenuSection;
}

export const useMenuHook = (
  filters: UseMenuFilters = {}
) => {
  const [menuItems, setMenuItems] =
    useState<HomeMenuItem[]>([]);

  const [categories, setCategories] =
    useState<MenuCategory[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchMenu = async (
    customFilters: UseMenuFilters = filters
  ) => {
    setLoading(true);
    setError(null);

    try {
      const params: MenuQueryParams = {};

      if (
        customFilters.search &&
        customFilters.search.trim()
      ) {
        params.search =
          customFilters.search.trim();
      }

      params.category =
        customFilters.category ?? "ALL";

      if (
        customFilters.diet &&
        customFilters.diet !== "ALL"
      ) {
        params.diet = customFilters.diet;
      }

      if (
        customFilters.section &&
        customFilters.section !== "ALL"
      ) {
        params.section = customFilters.section;
      }

      const response = await getMenuItemsApi(params);

      /*
       * API returns the array directly.
       *
       * [
       *   { id, category, category_name, ... }
       * ]
       */
      const items: HomeMenuItem[] =
        Array.isArray(response)
          ? response
          : [];

      setMenuItems(items);

      /*
       * Build categories from the API response.
       */
      const categoryMap =
        new Map<number, string>();

      items.forEach((item) => {
        if (
          !categoryMap.has(item.category)
        ) {
          categoryMap.set(
            item.category,
            item.category_name
          );
        }
      });

      setCategories(
        Array.from(
          categoryMap,
          ([id, name]) => ({
            id,
            name,
          })
        )
      );
    } catch (err: any) {
      console.error(
        "Error fetching menu data:",
        err
      );

      const message =
        extractErrorMessages(err);

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMenu(filters);
    }, 350);

    return () => clearTimeout(timer);
  }, [
    filters.search,
    filters.category,
    filters.diet,
    filters.section,
  ]);

  return {
    menuItems,
    categories,
    loading,
    error,
    fetchMenu,
  };
};