import axiosInstance from "@/lib/axios";

// Mirrors homeApi.ts's pattern (shared axiosInstance from "@/lib/axios").
// Address endpoints already live in features/address/api/AddressApi.ts —
// reuse those via useAddressHook instead of duplicating them here.

// ---- Profile ----
export const getProfileApi = async () => {
  const response = await axiosInstance.get("/accounts/profile");
  return response.data;
};

export const updateProfileApi = async (payload: {
  first_name: string;
  email: string;
  phone_number: string;
}) => {
  const response = await axiosInstance.patch("/accounts/profile", payload);
  return response.data;
};

// ---- Orders ----
// GET /orders/my-orders
// Returns a DRF-style paginated payload: { count, next, previous, results: Order[] }
export const getOrdersApi = async () => {
  const response = await axiosInstance.get("/orders/my-orders");
  return response.data;
};

// GET /orders/my-orders/:id
// Returns a single Order object directly (not paginated, not wrapped).
export const getOrderDetailApi = async (orderId: number) => {
  const response = await axiosInstance.get(`/orders/my-orders/${orderId}`);
  return response.data;
};

// ---- Auth ----
export const logoutApi = async () => {
  const response = await axiosInstance.post("/accounts/logout");
  return response.data;
};
