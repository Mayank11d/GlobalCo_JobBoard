import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { CompaniesResponse, CompanyResponse } from "../types/company.types";

export const companyService = {
    getCompanies: async (): Promise<CompaniesResponse> => {
        const response = await axiosInstance.get(API.GET_COMPANIES);
        return response.data;
    },
    getMyCompany: async (): Promise<CompanyResponse> => {
        const response = await axiosInstance.get(API.GET_MY_COMPANY);
        return response.data;
    },
    getCompanyById: async (id: string): Promise<CompanyResponse> => {
        const response = await axiosInstance.get(API.GET_COMPANY_BY_ID(id));
        return response.data;
    },
    createCompany: async (data: any): Promise<CompanyResponse> => {
        const response = await axiosInstance.post(API.CREATE_COMPANY, data);
        return response.data;
    },
    updateCompany: async ({ id, data }: { id: string; data: any }): Promise<CompanyResponse> => {
        const response = await axiosInstance.patch(API.UPDATE_COMPANY(id), data);
        return response.data;
    },
    deleteCompany: async (id: string): Promise<any> => {
        const response = await axiosInstance.delete(API.DELETE_COMPANY(id));
        return response.data;
    }
};
