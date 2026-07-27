export interface SavedJob {
    _id: string;
    candidate: string;
    job: string | any;
    createdAt: string;
    updatedAt: string;
}

export interface SavedJobResponse {
    success: boolean;
    data: SavedJob;
}

export interface SavedJobsResponse {
    success: boolean;
    count: number;
    data: SavedJob[];
}
