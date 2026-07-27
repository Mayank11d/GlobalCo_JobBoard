import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { SavedJob, SavedJobsResponse, SavedJobResponse } from "../types/savedJob.types";

export const savedJobService = {
    getUserSavedJobs: async (): Promise<SavedJobsResponse> => {
        const response = await axiosInstance.get(API.GET_SAVED_JOBS);
        return response.data;
    },
    saveJob: async (data: { jobId: string }): Promise<SavedJobResponse> => {
        const response = await axiosInstance.post(API.SAVE_JOB, data);
        return response.data;
    },
    removeSavedJob: async (id: string): Promise<any> => {
        const response = await axiosInstance.delete(API.REMOVE_SAVED_JOB(id));
        return response.data;
    }
};
