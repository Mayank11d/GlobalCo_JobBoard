export const API = {
    // Auth
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    GET_ME: "/api/v1/auth/me",
    CHANGE_PASSWORD: "/api/v1/auth/change-password",
    UPDATE_PROFILE: "/api/v1/auth/profile",

    // Companies
    GET_COMPANIES: "/api/v1/companies",
    CREATE_COMPANY: "/api/v1/companies",
    GET_MY_COMPANY: "/api/v1/companies/my",
    GET_COMPANY_BY_ID: (id: string) => `/api/v1/companies/${id}`,
    UPDATE_COMPANY: (id: string) => `/api/v1/companies/${id}`,
    DELETE_COMPANY: (id: string) => `/api/v1/companies/${id}`,

    // Jobs
    GET_JOBS: "/api/v1/jobs",
    CREATE_JOB: "/api/v1/jobs",
    GET_JOB_BY_ID: (id: string) => `/api/v1/jobs/${id}`,
    UPDATE_JOB: (id: string) => `/api/v1/jobs/${id}`,
    DELETE_JOB: (id: string) => `/api/v1/jobs/${id}`,

    // Applications
    GET_USER_APPLICATIONS: "/api/v1/applications",
    CREATE_APPLICATION: "/api/v1/applications",
    GET_RECRUITER_APPLICATIONS: "/api/v1/applications/recruiter",
    GET_APPLICATIONS_FOR_JOB: (jobId: string) => `/api/v1/applications/job/${jobId}`,
    UPDATE_APPLICATION_STATUS: (id: string) => `/api/v1/applications/${id}/status`,

    // Saved Jobs
    GET_SAVED_JOBS: "/api/v1/saved-jobs",
    SAVE_JOB: "/api/v1/saved-jobs",
    REMOVE_SAVED_JOB: (id: string) => `/api/v1/saved-jobs/${id}`,

    // Dashboard
    GET_DASHBOARD_STATS: "/api/v1/dashboard/stats",

    // Notifications
    GET_NOTIFICATIONS: "/api/v1/notifications",
    MARK_NOTIFICATION_READ: (id: string) => `/api/v1/notifications/${id}/read`,
    MARK_ALL_NOTIFICATIONS_READ: "/api/v1/notifications/read-all",
};
