export interface Application {
    _id: string;
    jobId: string | any; // Could be populated job object
    candidateId: string | any; // Could be populated user object
    status: "pending" | "reviewing" | "interviewing" | "rejected" | "hired";
    resumeUrl: string;
    coverLetter?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApplicationResponse {
    success: boolean;
    message: string;
    data: Application;
}

export interface ApplicationsResponse {
    success: boolean;
    message: string;
    count: number;
    data: Application[];
}
