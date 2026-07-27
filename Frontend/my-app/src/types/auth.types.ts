export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "candidate" | "recruiter" | "admin";
    avatarUrl?: string;
    headline?: string;
    bio?: string;
    resumeUrl?: string;
    skills?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AuthData {
    user: User;
    token: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: AuthData;
}

export interface MeResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    };
}
