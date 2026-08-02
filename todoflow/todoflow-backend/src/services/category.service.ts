import { prisma } from "../config/db";
import type { CreateCategoryInput, UpdateCategoryInput } from "../validators/category.validator";

export function listCategories(userId: string) {
  return prisma.category.findMany({
    where: {
      OR: [{ userId }, { members: { some: { userId } } }],
    },
    include: {
      user: { select: { id: true, fullName: true, email: true } },
      members: { include: { user: { select: { id: true, fullName: true, email: true, avatarUrl: true } } } },
    },
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

export async function shareCategory(ownerId: string, categoryId: string, email: string) {
  const category = await prisma.category.findFirst({ where: { id: categoryId, userId: ownerId } });
  if (!category) {
    throw new Error("Category not found");
  }

  const targetUser = await prisma.user.findUnique({ where: { email } });
  if (!targetUser) {
    throw new Error("No user found with that email");
  }

  if (targetUser.id === ownerId) {
    throw new Error("You already own this category");
  }

  const existing = await prisma.categoryMember.findUnique({
    where: { categoryId_userId: { categoryId, userId: targetUser.id } },
  });
  if (existing) {
    throw new Error("This person already has access");
  }

  return prisma.categoryMember.create({
    data: { categoryId, userId: targetUser.id },
    include: { user: { select: { id: true, fullName: true, email: true, avatarUrl: true } } },
  });
}

export async function removeMember(ownerId: string, categoryId: string, memberUserId: string) {
  const category = await prisma.category.findFirst({ where: { id: categoryId, userId: ownerId } });
  if (!category) {
    throw new Error("Category not found");
  }

  await prisma.categoryMember.deleteMany({ where: { categoryId, userId: memberUserId } });
}
