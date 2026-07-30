import { prisma } from "../config/db";

export async function getTaskSummary(userId: string) {
  const [completed, pending, inProgress, archived] = await Promise.all([
    prisma.task.count({ where: { userId, status: "COMPLETED" } }),
    prisma.task.count({ where: { userId, status: "PENDING" } }),
    prisma.task.count({ where: { userId, status: "IN_PROGRESS" } }),
    prisma.task.count({ where: { userId, isArchived: true } }),
  ]);

  return { completed, pending, inProgress, archived };
}

export async function getWeeklyProductivity(userId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      status: "COMPLETED",
      completedAt: { gte: sevenDaysAgo },
    },
    select: { completedAt: true },
  });

  const dayCounts: Record<string, number> = {};

  for (const task of tasks) {
    if (!task.completedAt) continue;
    const day = task.completedAt.toISOString().split("T")[0];
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  }

  return dayCounts;
}

export async function getMonthlyProgress(userId: string) {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      status: "COMPLETED",
      completedAt: { gte: startOfYear },
    },
    select: { completedAt: true },
  });

  const monthCounts: Record<string, number> = {};

  for (const task of tasks) {
    if (!task.completedAt) continue;
    const month = task.completedAt.toISOString().slice(0, 7);
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  }

  return monthCounts;
}