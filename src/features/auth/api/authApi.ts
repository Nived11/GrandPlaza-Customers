import axiosInstance from "@/lib/axios";

export const loginApi = async (phone_number: string) => {
  const response = await axiosInstance.post("/accounts/send-otp", {
    phone_number
  });
  return response.data;
};

export const VerifyOTPApi = async (data: {  phone_number: string;  otp: string;}) => {
  const response = await axiosInstance.post("/accounts/verify-otp",data);
  return response.data;
};