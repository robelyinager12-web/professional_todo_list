import api from "./axios";
import type { Task, Priority, TaskStatus } from "../../types/task";

export interface TaskQuery {
  search?: string;
  status?: TaskStatus;
  priority?: Priority;
  categoryId?: string;
  sortBy?: "dueDate" | "createdAt" | "priority" | "title";
  order?: "asc" | "desc";
}

export interface TaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  categoryId?: string;
  dueDate?: string;
  reminderAt?: string;
  colorLabel?: string;
  tags?: string[];
}

export async function fetchTasks(query: TaskQuery = {}): Promise<Task[]> {
  const { data } = await api.get<{ tasks: Task[] }>("/tasks", { params: query });
  return data.tasks;
}

export async function fetchTask(id: string): Promise<Task> {
  const { data } = await api.get<{ task: Task }>(`/tasks/${id}`);
  return data.task;
}

export async function createTask(input: TaskInput): Promise<Task> {
  const { data } = await api.post<{ task: Task }>("/tasks", input);
  return data.task;
}

export async function updateTask(id: string, input: Partial<TaskInput>): Promise<Task> {
  const { data } = await api.patch<{ task: Task }>(`/tasks/${id}`, input);
  return data.task;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export async function completeTask(id: string): Promise<Task> {
  const { data } = await api.patch<{ task: Task }>(`/tasks/${id}/complete`);
  return data.task;
}

export async function archiveTask(id: string): Promise<Task> {
  const { data } = await api.patch<{ task: Task }>(`/tasks/${id}/archive`);
  return data.task;
}

export async function restoreTask(id: string): Promise<Task> {
  const { data } = await api.patch<{ task: Task }>(`/tasks/${id}/restore`);
  return data.task;
}

export async function duplicateTask(id: string): Promise<Task> {
  const { data } = await api.post<{ task: Task }>(`/tasks/${id}/duplicate`);
  return data.task;
}