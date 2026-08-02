import { prisma } from "../config/db";
import type { CreateTaskInput, UpdateTaskInput, TaskQuery } from "../validators/task.validator";

async function getAccessibleCategoryIds(userId: string): Promise<string[]> {
  const categories = await prisma.category.findMany({
    where: { OR: [{ userId }, { members: { some: { userId } } }] },
    select: { id: true },
  });
  return categories.map((c) => c.id);
}

async function buildAccessWhere(userId: string) {
  const categoryIds = await getAccessibleCategoryIds(userId);
  return {
    OR: [{ userId }, { categoryId: { in: categoryIds } }],
  };
}

export async function listTasks(userId: string, query: TaskQuery) {
  const accessWhere = await buildAccessWhere(userId);

  return prisma.task.findMany({
    where: {
      AND: [
        accessWhere,
        {
          isArchived: query.status === "ARCHIVED" ? true : false,
          status: query.status && query.status !== "ARCHIVED" ? query.status : undefined,
          priority: query.priority,
          categoryId: query.categoryId,
          title: query.search ? { contains: query.search, mode: "insensitive" } : undefined,
        },
      ],
    },
    orderBy: { [query.sortBy]: query.order },
    include: { category: true },
  });
}

export async function getTaskById(userId: string, taskId: string) {
  const accessWhere = await buildAccessWhere(userId);

  return prisma.task.findFirst({
    where: { AND: [{ id: taskId }, accessWhere] },
    include: { category: true },
  });
}

export async function createTask(userId: string, input: CreateTaskInput) {
  if (input.categoryId) {
    const categoryIds = await getAccessibleCategoryIds(userId);
    if (!categoryIds.includes(input.categoryId)) {
      throw new Error("You don't have access to that category");
    }
  }

  return prisma.task.create({
    data: { ...input, userId },
  });
}

export async function updateTask(userId: string, taskId: string, input: UpdateTaskInput) {
  const accessWhere = await buildAccessWhere(userId);
  const existing = await prisma.task.findFirst({ where: { AND: [{ id: taskId }, accessWhere] } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: input,
  });
}

export async function deleteTask(userId: string, taskId: string) {
  const accessWhere = await buildAccessWhere(userId);
  const existing = await prisma.task.findFirst({ where: { AND: [{ id: taskId }, accessWhere] } });
  if (!existing) return null;

  return prisma.task.delete({ where: { id: taskId } });
}

export async function markComplete(userId: string, taskId: string) {
  const accessWhere = await buildAccessWhere(userId);
  const existing = await prisma.task.findFirst({ where: { AND: [{ id: taskId }, accessWhere] } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: { status: "COMPLETED", completedAt: new Date() },
  });
}

export async function archiveTask(userId: string, taskId: string) {
  const accessWhere = await buildAccessWhere(userId);
  const existing = await prisma.task.findFirst({ where: { AND: [{ id: taskId }, accessWhere] } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: { isArchived: true, status: "ARCHIVED" },
  });
}

export async function restoreTask(userId: string, taskId: string) {
  const accessWhere = await buildAccessWhere(userId);
  const existing = await prisma.task.findFirst({ where: { AND: [{ id: taskId }, accessWhere] } });
  if (!existing) return null;

  return prisma.task.update({
    where: { id: taskId },
    data: { isArchived: false, status: "PENDING" },
  });
}

export async function duplicateTask(userId: string, taskId: string) {
  const accessWhere = await buildAccessWhere(userId);
  const existing = await prisma.task.findFirst({ where: { AND: [{ id: taskId }, accessWhere] } });
  if (!existing) return null;

  const { id, createdAt, updatedAt, completedAt, ...rest } = existing;

  return prisma.task.create({
    data: { ...rest, userId, title: `${rest.title} (copy)`, status: "PENDING", completedAt: null },
  });
}