import type { Request, Response } from "express";
import { updateProfileSchema, changePasswordSchema } from "../validators/user.validator";
import * as userService from "../services/user.service";

function getUserId(req: Request) {
  return (req as Request & { userId: string }).userId;
}

export async function updateProfile(req: Request, res: Response) {
  const parsed = updateProfileSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const user = await userService.updateProfile(getUserId(req), parsed.data);
  res.status(200).json({ user });
}

export async function changePassword(req: Request, res: Response) {
  const parsed = changePasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    await userService.changePassword(getUserId(req), parsed.data);
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function uploadAvatar(req: Request, res: Response) {
  const file = (req as Request & { file?: Express.Multer.File }).file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const avatarUrl = `/uploads/avatars/${file.filename}`;
  const user = await userService.updateProfile(getUserId(req), { avatarUrl });
  res.status(200).json({ user });
}

export async function deleteAccount(req: Request, res: Response) {
  await userService.deleteAccount(getUserId(req));
  res.status(204).send();
}