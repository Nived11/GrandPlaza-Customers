import axiosInstance from "@/lib/axios";

export interface AddressPayload {
    address_type: string;
    full_name: string;
    phone_number: string;
    address_line: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
}

export const addAddressApi = async (data: AddressPayload) => {
    const response = await axiosInstance.post("/accounts/addresses", data);
    return response.data;
};

export const editAddressApi = async (id: string, data: Partial<AddressPayload>) => {
    const response = await axiosInstance.patch(`/accounts/addresses/${id}`, data);
    return response.data;
};

export const getAddressesApi = async () => {
    const response = await axiosInstance.get("/accounts/addresses");
    return response.data;
};

export const deleteAddressApi = async (id: string) => {
    const response = await axiosInstance.delete(`/accounts/addresses/${id}`);
    return response.data;
};
