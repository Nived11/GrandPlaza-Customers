"use client";

import { useEffect } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
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

/*
 * =========================================================
 * QUERY KEY
 * =========================================================
 */

const getMenuQueryKey = ({
  category = "ALL",
  search = "",
  diet = "ALL",
  section = "ALL",
}: {
  category?: string;
  search?: string;
  diet?: string;
  section?: string;
}) => [
  "menu-items",
  {
    category,
    search: search.trim(),
    diet,
    section,
  },
];

/*
 * =========================================================
 * MENU REQUEST
 * =========================================================
 */

const fetchMenuItems = async ({
  category = "ALL",
  search = "",
  diet = "ALL",
  section = "ALL",
  signal,
}: {
  category?: string;
  search?: string;
  diet?: string;
  section?: string;
  signal?: AbortSignal;
}): Promise<MenuItem[]> => {
  const response = await getMenuItemsApi(
    {
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
    },
    signal
  );

  return Array.isArray(response)
    ? response
    : [];
};

export const useMenuHook = ({
  category = "ALL",
  search = "",
  diet = "ALL",
  section = "ALL",
}: UseMenuHookParams = {}) => {
  const queryClient = useQueryClient();

  /*
   * =========================================================
   * MENU ITEMS
   * =========================================================
   */

  const menuQuery = useQuery({
    queryKey: getMenuQueryKey({
      category,
      search,
      diet,
      section,
    }),

    queryFn: ({ signal }) =>
      fetchMenuItems({
        category,
        search,
        diet,
        section,
        signal,
      }),

    /*
     * Keep previous products visible while
     * another filter result is loading.
     */
    placeholderData: keepPreviousData,

    /*
     * Cache menu results for 5 minutes.
     */
    staleTime: 1000 * 60 * 5,

    retry: false,
  });

  /*
   * =========================================================
   * MENU CATEGORIES
   * =========================================================
   */

  const categoryQuery = useQuery({
    queryKey: ["menu-categories"],

    queryFn: async ({ signal }) => {
      const response =
        await getMenuCategoriesApi(signal);

      return Array.isArray(response)
        ? response
        : response?.data ?? [];
    },

    staleTime: 1000 * 60 * 10,

    retry: false,
  });

  /*
   * =========================================================
   * PREFETCH CATEGORY
   * =========================================================
   */

  const prefetchCategory = async (
    categoryId: number
  ) => {
    const categoryValue =
      String(categoryId);

    await queryClient.prefetchQuery({
      queryKey: getMenuQueryKey({
        category: categoryValue,
        search,
        diet,
        section,
      }),

      queryFn: ({ signal }) =>
        fetchMenuItems({
          category: categoryValue,
          search,
          diet,
          section,
          signal,
        }),

      staleTime: 1000 * 60 * 5,
    });
  };

  /*
   * =========================================================
   * ERROR HANDLING
   * =========================================================
   */

  useEffect(() => {
    if (!menuQuery.error) return;

    if (
      axios.isCancel(menuQuery.error)
    ) {
      return;
    }

    console.error(
      "Error fetching menu items:",
      menuQuery.error
    );

    const message =
      extractErrorMessages(
        menuQuery.error
      );

    toast.error(message);
  }, [menuQuery.error]);

  useEffect(() => {
    if (!categoryQuery.error) return;

    if (
      axios.isCancel(
        categoryQuery.error
      )
    ) {
      return;
    }

    console.error(
      "Error fetching menu categories:",
      categoryQuery.error
    );

    const message =
      extractErrorMessages(
        categoryQuery.error
      );

    toast.error(message);
  }, [categoryQuery.error]);

  /*
   * =========================================================
   * RETURN
   * =========================================================
   */

  return {
    menuItems: menuQuery.data ?? [],

    categories:
      categoryQuery.data ?? [],

    loading:
      menuQuery.isLoading ||
      categoryQuery.isLoading,

    error: menuQuery.error
      ? extractErrorMessages(
          menuQuery.error
        )
      : categoryQuery.error
      ? extractErrorMessages(
          categoryQuery.error
        )
      : null,

    fetchMenuItems:
      menuQuery.refetch,

    fetchCategories:
      categoryQuery.refetch,

    isFetching:
      menuQuery.isFetching,

    isCategoriesFetching:
      categoryQuery.isFetching,

    prefetchCategory,
  };
};