import axiosInstance from "@/lib/axios";

interface MenuParams {
  search?: string;
  category?: string;
  diet?: string;
  section?: string;
}

export const getMenuItemsApi = async (
  params?: MenuParams,
  signal?: AbortSignal
) => {
  const response = await axiosInstance.get(
    "/menu/public/menu-items",
    {
      params,
      signal,
    }
  );

  return response.data;
};

export const getMenuCategoriesApi = async (
  signal?: AbortSignal
) => {
  const response = await axiosInstance.get(
    "/menu/public/categories",
    {
      signal,
    }
  );

  return response.data;
};