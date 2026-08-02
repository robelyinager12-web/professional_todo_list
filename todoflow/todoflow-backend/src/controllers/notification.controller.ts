import type { Request, Response } from "express";
import * as notificationService from "../services/notification.service";

function getUserId(req: Request) {
  return (req as Request & { userId: string }).userId;
}

export async function getNotifications(req: Request, res: Response) {
  const [notifications, unreadCount] = await Promise.all([
    notificationService.listNotifications(getUserId(req)),
    notificationService.countUnread(getUserId(req)),
  ]);

  res.status(200).json({ notifications, unreadCount });
}

export async function markRead(req: Request, res: Response) {
  const notification = await notificationService.markRead(getUserId(req), req.params.id);

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  res.status(200).json({ notification });
}

export async function markAllRead(req: Request, res: Response) {
  await notificationService.markAllRead(getUserId(req));
  res.status(200).json({ message: "All notifications marked as read" });
}