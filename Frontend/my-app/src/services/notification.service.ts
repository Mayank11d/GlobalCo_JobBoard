import axiosInstance from "../lib/Axios";
import { API } from "../lib/api.list";
import { NotificationsResponse, NotificationResponse } from "../types/notification.types";

export const notificationService = {
    getNotifications: async (): Promise<NotificationsResponse> => {
        const response = await axiosInstance.get(API.GET_NOTIFICATIONS);
        return response.data;
    },
    markAsRead: async (id: string): Promise<NotificationResponse> => {
        const response = await axiosInstance.patch(API.MARK_NOTIFICATION_READ(id));
        return response.data;
    },
    markAllAsRead: async (): Promise<any> => {
        const response = await axiosInstance.patch(API.MARK_ALL_NOTIFICATIONS_READ);
        return response.data;
    }
};
