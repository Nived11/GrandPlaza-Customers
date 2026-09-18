import axiosInstance from "@/lib/axios";

export interface MenuQueryParams {
  search?: string;
  category?: number | "ALL";
  diet?: "VEG" | "NON-VEG";
  section?:
    | "ALL"
    | "BEST SELLER"
    | "COMBO MENU"
    | "TODAY'S SPECIAL"
    | "OTHERS";
}

export const getMenuItemsApi = async (
  params?: MenuQueryParams
) => {
  const response = await axiosInstance.get(
    "/menu/public/menu-items",
    {
      params,
    }
  );

  return response.data;
};