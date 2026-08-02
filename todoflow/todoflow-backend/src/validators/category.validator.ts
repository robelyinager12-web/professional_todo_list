import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().default("#6366f1"),
});

export const updateCategorySchema = createCategorySchema.partial();

export const shareCategorySchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type ShareCategoryInput = z.infer<typeof shareCategorySchema>;
