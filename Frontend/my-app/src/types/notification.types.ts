export interface Notification {
    _id: string;
    recipient: string;
    type: string; // 'APPLICATION_VIEWED', 'JOB_MATCH', etc.
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NotificationsResponse {
    success: boolean;
    count: number;
    data: Notification[];
}

export interface NotificationResponse {
    success: boolean;
    data: Notification;
}
