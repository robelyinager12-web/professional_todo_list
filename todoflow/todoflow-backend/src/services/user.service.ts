import { prisma } from "../config/db";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import type { UpdateProfileInput, ChangePasswordInput } from "../validators/user.validator";

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  return prisma.user.update({
    where: { id: userId },
    data: input,
    select: {
      id: true,
      fullName: true,
      username: true,
      email: true,
      avatarUrl: true,
      darkMode: true,
      language: true,
    },
  });
}

export async function changePassword(userId: string, input: ChangePasswordInput) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(input.currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashed = await hashPassword(input.newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });
}

export async function deleteAccount(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
}