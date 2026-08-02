import api from "./axios";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  taskId?: string | null;
}

export interface NotificationsResponse {
  notifications: AppNotification[];
  unreadCount: number;
}

export async function fetchNotifications(): Promise<NotificationsResponse> {
  const { data } = await api.get<NotificationsResponse>("/notifications");
  return data;
}

export async function markNotificationRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.patch("/notifications/read-all");
}