import type { Request, Response } from "express";
import {
  createTaskSchema,
  updateTaskSchema,
  taskQuerySchema,
} from "../validators/task.validator";
import * as taskService from "../services/task.service";

function getUserId(req: Request) {
  return (req as Request & { userId: string }).userId;
}

export async function getTasks(req: Request, res: Response) {
  const parsed = taskQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const tasks = await taskService.listTasks(getUserId(req), parsed.data);
  res.status(200).json({ tasks });
}

export async function getTask(req: Request, res: Response) {
  const task = await taskService.getTaskById(getUserId(req), req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ task });
}

export async function createTask(req: Request, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const task = await taskService.createTask(getUserId(req), parsed.data);
  res.status(201).json({ task });
}

export async function updateTask(req: Request, res: Response) {
  const parsed = updateTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const task = await taskService.updateTask(getUserId(req), req.params.id, parsed.data);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ task });
}

export async function deleteTask(req: Request, res: Response) {
  const task = await taskService.deleteTask(getUserId(req), req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(204).send();
}

export async function completeTask(req: Request, res: Response) {
  const task = await taskService.markComplete(getUserId(req), req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ task });
}

export async function archiveTask(req: Request, res: Response) {
  const task = await taskService.archiveTask(getUserId(req), req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ task });
}

export async function restoreTask(req: Request, res: Response) {
  const task = await taskService.restoreTask(getUserId(req), req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ task });
}

export async function duplicateTask(req: Request, res: Response) {
  const task = await taskService.duplicateTask(getUserId(req), req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(201).json({ task });
}
