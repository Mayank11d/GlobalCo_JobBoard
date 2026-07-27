import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    withCredentials: true,
});

// Request interceptor to add token
axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: Handle token refresh or auto-logout here
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
