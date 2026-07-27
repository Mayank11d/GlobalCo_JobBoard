import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { ApplicationsResponse, ApplicationResponse } from "../types/application.types";

export const applicationService = {
    getUserApplications: async (): Promise<ApplicationsResponse> => {
        const response = await axiosInstance.get(API.GET_USER_APPLICATIONS);
        return response.data;
    },
    createApplication: async (data: any): Promise<ApplicationResponse> => {
        const response = await axiosInstance.post(API.CREATE_APPLICATION, data);
        return response.data;
    },
    getApplicationsForJob: async (jobId: string): Promise<ApplicationsResponse> => {
        const response = await axiosInstance.get(API.GET_APPLICATIONS_FOR_JOB(jobId));
        return response.data;
    },
    getRecruiterApplications: async (): Promise<ApplicationsResponse> => {
        const response = await axiosInstance.get(API.GET_RECRUITER_APPLICATIONS);
        return response.data;
    },
    updateApplicationStatus: async ({ id, status }: { id: string; status: string }): Promise<ApplicationResponse> => {
        const response = await axiosInstance.patch(API.UPDATE_APPLICATION_STATUS(id), { status });
        return response.data;
    }
};
