export interface Job {
    _id: string;
    title: string;
    description: string;
    companyId: string | any; // Could be populated company object
    recruiterId: string | any;
    location: string;
    jobType: "full-time" | "part-time" | "contract" | "freelance" | "internship";
    workMode: "remote" | "onsite" | "hybrid";
    status: "draft" | "published" | "closed";
    salaryMin?: number;
    salaryMax?: number;
    requirements?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface JobResponse {
    success: boolean;
    message: string;
    data: Job;
}

export interface JobsResponse {
    success: boolean;
    message: string;
    count: number;
    data: Job[];
}
