import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { QUERY_KEYS } from "../lib/constant";

export const useDashboardStats = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.DASHBOARD_STATS],
        queryFn: dashboardService.getStats,
    });
};
