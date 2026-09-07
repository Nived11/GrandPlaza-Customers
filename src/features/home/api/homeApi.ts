import axiosInstance from "@/lib/axios";

export const getHomeApi = async () => {
  const response = await axiosInstance.get("/menu/public/home-data");
  return response.data;
};