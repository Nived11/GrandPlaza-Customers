import axiosInstance from "@/lib/axios";

// Mirrors homeApi.ts's pattern (shared axiosInstance from "@/lib/axios").
// Endpoint confirmed earlier: GET /api/menu/public/menu-items
export const getMenuItemsApi = async () => {
  const response = await axiosInstance.get("/menu/public/menu-items");
  return response.data;
};
