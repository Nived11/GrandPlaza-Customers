import axiosInstance from "@/lib/axios";

interface MenuParams {
  search?: string;
  category?: string;
  diet?: string;
  section?: string;
}

export const getMenuItemsApi = async (
  params?: MenuParams
) => {
  const response =
    await axiosInstance.get(
      "/menu/public/menu-items",
      {
        params,
      }
    );

  return response.data;
};

export const getMenuCategoriesApi = async () => {
  const response = await axiosInstance.get("/menu/public/categories");
  return response.data;
};