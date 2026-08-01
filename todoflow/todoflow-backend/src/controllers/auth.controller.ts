import type { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { registerUser, loginUser } from "../services/auth.service";
import { prisma } from "../config/db";

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    const { token, user } = await registerUser(parsed.data);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(409).json({ message: (err as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    const { token, user } = await loginUser(parsed.data);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
}

export async function me(req: Request, res: Response) {
  const userId = (req as Request & { userId: string }).userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
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

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
}
