import axiosInstance from "@/lib/axios";

export const addToCartApi = async (data: { menu_item_id: number; variant_id: number | null; quantity: number }) => {
  const response = await axiosInstance.post("/orders/cart/items", data);
  return response.data;
};

export const getCartApi = async () => {
  const response = await axiosInstance.get("/orders/cart");
  return response.data;
};