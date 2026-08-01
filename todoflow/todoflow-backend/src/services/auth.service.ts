import { prisma } from "../config/db";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { signToken } from "../utils/jwt";
import type { RegisterInput, LoginInput } from "../validators/auth.validator";

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: input.email }, { username: input.username }] },
  });

  if (existing) {
    throw new Error("Email or username already in use");
  }

  const hashed = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      username: input.username,
      email: input.email,
      password: hashed,
    },
  });

  const token = signToken({ userId: user.id });

  return { token, user: sanitizeUser(user) };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(input.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = signToken({ userId: user.id });

  return { token, user: sanitizeUser(user) };
}

function sanitizeUser(user: { password: string; [key: string]: unknown }) {
  const { password, ...safe } = user;
  return safe;
}
