import { prisma } from "../config/db";
import type { CreateTaskInput, UpdateTaskInput, TaskQuery } from "../validators/task.validator";

export function listTasks(userId: string, query: TaskQuery) {
  return prisma.task.findMany({
    where: {
      userId,
      isArchived: query.status === "ARCHIVED" ? true : false,
      status: query.status && query.status !== "ARCHIVED" ? query.status : undefined,
      priority: query.priority,
      categoryId: query.categoryId,
      title: query.search ? { contains: query.search, mode: "insensitive" } : undefined,
    },
    orderBy: { [query.sortBy]: query.order },
    include: { category: true },
  });
}

export function getTaskById(userId: string, taskId: string) {
  return prisma.task.findFirst({
    where: { id: taskId, userId },
    include: { category: true },
  });
}

export function createTask(userId: string, input: CreateTaskInput) {
  return prisma.task.create({
    data: { ...input, userId },
  });
}

export async function updateTask(userId: string, taskId: string, input: UpdateTaskInput) {
  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: input,
  });
}

export async function deleteTask(userId: string, taskId: string) {
  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return null;

  return prisma.task.delete({ where: { id: taskId } });
}

export async function markComplete(userId: string, taskId: string) {
  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: { status: "COMPLETED", completedAt: new Date() },
  });
}

export async function archiveTask(userId: string, taskId: string) {
  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: { isArchived: true, status: "ARCHIVED" },
  });
}

export async function restoreTask(userId: string, taskId: string) {
  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: { isArchived: false, status: "PENDING" },
  });
}

export async function duplicateTask(userId: string, taskId: string) {
  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return null;

  const { id, createdAt, updatedAt, completedAt, ...rest } = existing;

  return prisma.task.create({
    data: { ...rest, title: `${rest.title} (copy)`, status: "PENDING", completedAt: null },
  });
}
