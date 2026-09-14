import axiosInstance from "@/lib/axios";

export const createOrderApi = async (data: {
  address_id: number;
}) => {
  const response = await axiosInstance.post(
    "/orders/checkout",
    data
  );

  return response.data;
};