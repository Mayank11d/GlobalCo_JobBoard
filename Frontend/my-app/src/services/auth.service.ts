import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { AuthResponse, User } from "../types/auth.types";

export const authService = {
    register: async (data: any): Promise<AuthResponse> => {
        const response = await axiosInstance.post(API.REGISTER, data);
        return response.data;
    },
    login: async (data: any): Promise<AuthResponse> => {
        const response = await axiosInstance.post(API.LOGIN, data);
        return response.data;
    },
    logout: async (): Promise<void> => {
        await axiosInstance.post(API.LOGOUT);
    },
    getMe: async (): Promise<{ user: User }> => {
        const response = await axiosInstance.get(API.GET_ME);
        return response.data;
    },
    forgotPassword: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API.FORGOT_PASSWORD, data);
        return response.data;
    },
    resetPassword: async (data: any): Promise<any> => {
        const response = await axiosInstance.post(API.RESET_PASSWORD, data);
        return response.data;
    },
    changePassword: async (data: any): Promise<any> => {
        const response = await axiosInstance.patch(API.CHANGE_PASSWORD, data);
        return response.data;
    },
    updateProfile: async (data: any): Promise<{ user: User }> => {
        const response = await axiosInstance.patch(API.UPDATE_PROFILE, data);
        return response.data;
    }
};
