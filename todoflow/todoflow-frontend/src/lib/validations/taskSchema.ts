import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  categoryId: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;