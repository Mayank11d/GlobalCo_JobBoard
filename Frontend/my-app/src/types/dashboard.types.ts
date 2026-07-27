export interface DashboardStats {
    jobs?: number;
    companies?: number;
    applications?: number;
    [key: string]: any;
}

export interface DashboardStatsResponse {
    success: boolean;
    message: string;
    data: DashboardStats;
}
