"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getMenuItemsApi,
  getMenuCategoriesApi,
} from "../api/menuApi";

import { extractErrorMessages } from "@/utils/extractErrorMessages";

export interface MenuVariant {
  id: number;
  size_name: string;
  actual_price: string;
  offer_price: string;
  is_available: boolean;
}

export interface MenuItem {
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
  variants: MenuVariant[];
}

export interface MenuCategory {
  id: number;
  name: string;
  image: string;
}

interface UseMenuHookParams {
  category?: string;
  search?: string;
  diet?: string;
  section?: string;
}

export const useMenuHook = ({
  category = "ALL",
  search = "",
  diet = "ALL",
  section = "ALL",
}: UseMenuHookParams = {}) => {

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>([]);

  const [categories, setCategories] =
    useState<MenuCategory[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await getMenuItemsApi({
          category:
            category !== "ALL"
              ? category
              : undefined,

          search:
            search.trim() || undefined,

          diet:
            diet !== "ALL"
              ? diet
              : undefined,

          section:
            section !== "ALL"
              ? section
              : undefined,
        });

      setMenuItems(
        Array.isArray(response)
          ? response
          : []
      );

    } catch (err: any) {
      console.error(
        "Error fetching menu items:",
        err
      );

      const message =
        extractErrorMessages(err);

      setError(message);
      toast.error(message);

      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response =
        await getMenuCategoriesApi();

      setCategories(
        Array.isArray(response)
          ? response
          : response?.data ?? []
      );

    } catch (err: any) {
      console.error(
        "Error fetching menu categories:",
        err
      );

      const message =
        extractErrorMessages(err);

      toast.error(message);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [
    category,
    search,
    diet,
    section,
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    menuItems,
    categories,
    loading,
    error,
    fetchMenuItems,
    fetchCategories,
  };
};