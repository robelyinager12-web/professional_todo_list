import { prisma } from "../config/db";

export function listNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export function countUnread(userId: string) {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

export async function markRead(userId: string, notificationId: string) {
  const existing = await prisma.notification.findFirst({ where: { id: notificationId, userId } });
  if (!existing) return null;

  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

export function markAllRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}

export async function generateDueReminders() {
  const now = new Date();

  const dueTasks = await prisma.task.findMany({
    where: {
      reminderAt: { lte: now },
      reminderSent: false,
      isArchived: false,
    },
    select: { id: true, title: true, userId: true },
  });

  if (dueTasks.length === 0) return 0;

  await prisma.$transaction([
    ...dueTasks.map((task) =>
      prisma.notification.create({
        data: {
          userId: task.userId,
          taskId: task.id,
          title: "Task reminder",
          message: `"${task.title}" is due soon`,
        },
      })
    ),
    prisma.task.updateMany({
      where: { id: { in: dueTasks.map((t) => t.id) } },
      data: { reminderSent: true },
    }),
  ]);

  return dueTasks.length;
}