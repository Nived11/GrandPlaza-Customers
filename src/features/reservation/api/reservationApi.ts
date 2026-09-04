import axiosInstance from "@/lib/axios";

export const submitTableReservation = async (payload: any) => {
  const response = await axiosInstance.post("/accounts/table-bookings", payload);
  return response.data;
};