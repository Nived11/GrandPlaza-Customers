import axiosInstance from "@/lib/axios";

export const getHomeApi = async (params?: {search?: string;}) => {
  const response = await axiosInstance.get("/menu/public/home-data",{ params });
  return response.data;
};