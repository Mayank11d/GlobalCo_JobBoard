"use client";

import * as React from "react"
import toast from "react-hot-toast"

import { CandidateSidebar } from "@/components/dashboard/CandidateSidebar"
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/hooks/useNotification"

const iconMap: Record<string, string> = {
  APPLICATION_VIEWED: "mark_email_read",
  JOB_MATCH: "work",
  STATUS_CHANGE: "update",
  DEFAULT: "notifications",
};
const colorMap: Record<string, string> = {
  APPLICATION_VIEWED: "bg-primary-container text-primary",
  JOB_MATCH: "bg-secondary-container text-secondary",
  STATUS_CHANGE: "bg-tertiary-container text-tertiary",
  DEFAULT: "bg-surface-container-high text-on-surface-variant",
};

export default function CandidateNotificationsPage() {
  const { data, isLoading } = useNotifications();
  const markRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsAsRead();

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const handleMarkRead = async (id: string) => {
    try {
      await markRead.mutateAsync(id);
    } catch { }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead.mutateAsync(undefined);
      toast.success("All notifications marked as read");
    } catch { }
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <CandidateSidebar />

      <main className="flex-1 md:ml-64 p-md md:p-xl lg:p-xxl max-w-container-max mx-auto w-full mb-16 md:mb-0">
        <header className="mb-xl flex justify-between items-center">
          <div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Notifications</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Updates on your applications and job alerts.</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={markAllRead.isPending}
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              Mark all read
            </button>
          )}
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center p-xxl">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-surface border border-outline-variant rounded-xl p-xxl flex flex-col items-center justify-center gap-md text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl">notifications_off</span>
            <p className="font-body-md">No notifications yet.</p>
          </div>
        ) : (
          <section className="bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col divide-y divide-outline-variant">
            {notifications.map((n: any) => (
              <div
                key={n._id}
                className={`p-md hover:bg-surface-container-lowest transition-colors flex gap-md items-start cursor-pointer ${!n.read ? "bg-primary-fixed/5" : ""}`}
                onClick={() => !n.read && handleMarkRead(n._id)}
              >
                <div className={`w-10 h-10 rounded-full ${colorMap[n.type] || colorMap.DEFAULT} flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined text-[20px]">{iconMap[n.type] || iconMap.DEFAULT}</span>
                </div>
                <div className="flex-1">
                  <h4 className={`font-label-md text-on-surface ${!n.read ? "font-bold" : ""}`}>{n.title}</h4>
                  <p className="font-body-sm text-on-surface-variant mt-1">{n.message}</p>
                  <span className="font-label-sm text-on-surface-variant mt-2 block">{formatTime(n.createdAt)}</span>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" title="Unread"></div>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
