import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
  categoryId: z.string().uuid().optional(),
  dueDate: z.coerce.date().optional(),
  reminderAt: z.coerce.date().optional(),
  colorLabel: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional(),
});

export const taskQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  categoryId: z.string().uuid().optional(),
  sortBy: z.enum(["dueDate", "createdAt", "priority", "title"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQuery = z.infer<typeof taskQuerySchema>;
