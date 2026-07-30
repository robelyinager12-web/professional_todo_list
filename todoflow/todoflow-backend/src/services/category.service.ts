import { prisma } from "../config/db";
import type { CreateCategoryInput, UpdateCategoryInput } from "../validators/category.validator";

export function listCategories(userId: string) {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });
}

export async function createCategory(userId: string, input: CreateCategoryInput) {
  const existing = await prisma.category.findFirst({
    where: { userId, name: input.name },
  });

  if (existing) {
    throw new Error("Category with this name already exists");
  }

  return prisma.category.create({
    data: { ...input, userId },
  });
}

export async function updateCategory(userId: string, categoryId: string, input: UpdateCategoryInput) {
  const existing = await prisma.category.findFirst({ where: { id: categoryId, userId } });
  if (!existing) return null;

  return prisma.category.update({
    where: { id: categoryId },
    data: input,
  });
}

export async function deleteCategory(userId: string, categoryId: string) {
  const existing = await prisma.category.findFirst({ where: { id: categoryId, userId } });
  if (!existing) return null;

  return prisma.category.delete({ where: { id: categoryId } });
}