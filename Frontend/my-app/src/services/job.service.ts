import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { Job, JobsResponse, JobResponse } from "../types/job.types";

export const jobService = {
    getJobs: async (): Promise<JobsResponse> => {
        const response = await axiosInstance.get(API.GET_JOBS);
        return response.data;
    },
    getJobById: async (id: string): Promise<JobResponse> => {
        const response = await axiosInstance.get(API.GET_JOB_BY_ID(id));
        return response.data;
    },
    createJob: async (data: any): Promise<JobResponse> => {
        const response = await axiosInstance.post(API.CREATE_JOB, data);
        return response.data;
    },
    updateJob: async ({ id, data }: { id: string; data: any }): Promise<JobResponse> => {
        const response = await axiosInstance.patch(API.UPDATE_JOB(id), data);
        return response.data;
    },
    deleteJob: async (id: string): Promise<any> => {
        const response = await axiosInstance.delete(API.DELETE_JOB(id));
        return response.data;
    }
};
