import type { Request, Response } from "express";
import { createCategorySchema, updateCategorySchema, shareCategorySchema } from "../validators/category.validator";
import * as categoryService from "../services/category.service";

function getUserId(req: Request) {
  return (req as Request & { userId: string }).userId;
}

export async function getCategories(req: Request, res: Response) {
  const categories = await categoryService.listCategories(getUserId(req));
  res.status(200).json({ categories });
}

export async function createCategory(req: Request, res: Response) {
  const parsed = createCategorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    const category = await categoryService.createCategory(getUserId(req), parsed.data);
    res.status(201).json({ category });
  } catch (err) {
    res.status(409).json({ message: (err as Error).message });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const parsed = updateCategorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const category = await categoryService.updateCategory(getUserId(req), req.params.id, parsed.data);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ category });
}

export async function deleteCategory(req: Request, res: Response) {
  const category = await categoryService.deleteCategory(getUserId(req), req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(204).send();
}

export async function shareCategory(req: Request, res: Response) {
  const parsed = shareCategorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    const member = await categoryService.shareCategory(getUserId(req), req.params.id, parsed.data.email);
    res.status(201).json({ member });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function removeMember(req: Request, res: Response) {
  try {
    await categoryService.removeMember(getUserId(req), req.params.id, req.params.userId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}