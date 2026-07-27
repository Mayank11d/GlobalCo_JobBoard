import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../services/notification.service";
import { QUERY_KEYS } from "../lib/constant";

export const useNotifications = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
        queryFn: notificationService.getNotifications,
    });
};

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: notificationService.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
        },
    });
};

export const useMarkAllNotificationsAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: notificationService.markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
        },
    });
};
