import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as taskApi from "../lib/api/tasks";
import type { TaskQuery, TaskInput } from "../lib/api/tasks";

const TASKS_KEY = ["tasks"];

export function useTasks(query: TaskQuery = {}) {
  return useQuery({
    queryKey: [...TASKS_KEY, query],
    queryFn: () => taskApi.fetchTasks(query),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TaskInput) => taskApi.createTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task created");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not create task");
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TaskInput> }) =>
      taskApi.updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task updated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not update task");
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task deleted");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not delete task");
    },
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.completeTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task marked complete");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not complete task");
    },
  });
}

export function useArchiveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.archiveTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task archived");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not archive task");
    },
  });
}

export function useDuplicateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.duplicateTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_KEY });
      toast.success("Task duplicated");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Could not duplicate task");
    },
  });
}