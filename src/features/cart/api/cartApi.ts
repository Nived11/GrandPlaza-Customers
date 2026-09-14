import axiosInstance from "@/lib/axios";

export const addToCartApi = async (data: { menu_item_id: number; variant_id: number | null; quantity: number }) => {
  const response = await axiosInstance.post("/orders/cart/items", data);
  return response.data;
};

export const getCartApi = async () => {
  const response = await axiosInstance.get("/orders/cart");
  return response.data;
};

export const updateCartApi = async (data: {  menu_item_id: number;  variant_id: number | null;  quantity: number;}) => {
  const response = await axiosInstance.patch(`/orders/cart/items/${data.menu_item_id}`, data);
  return response.data;
};

export const deleteCartApi = async ( menu_item_id: number) => {
  const response = await axiosInstance.delete(`/orders/cart/items/${menu_item_id}`);
  return response.data;
};

export const clearCartApi = async () => {
  const response = await axiosInstance.delete('/orders/cart/clear');
  return response.data;
};

export const checkoutApi = async (data:{address_id: number}) => {
  const response = await axiosInstance.post('/orders/checkout',data);
  return response.data;
};