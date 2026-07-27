import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { DashboardStatsResponse } from "../types/dashboard.types";

export const dashboardService = {
    getStats: async (): Promise<DashboardStatsResponse> => {
        const response = await axiosInstance.get(API.GET_DASHBOARD_STATS);
        return response.data;
    }
};
