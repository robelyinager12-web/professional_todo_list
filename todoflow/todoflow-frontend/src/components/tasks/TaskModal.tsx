"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { taskFormSchema, type TaskFormValues } from "../../lib/validations/taskSchema";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";
import type { Task } from "../../types/task";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

export default function TaskModal({ open, onClose, task }: TaskModalProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { priority: "MEDIUM" },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        categoryId: task.categoryId ?? "",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        tags: task.tags.join(", "),
      });
    } else {
      reset({ title: "", description: "", priority: "MEDIUM", categoryId: "", dueDate: "", tags: "" });
    }
  }, [task, reset]);

  const onSubmit = (values: TaskFormValues) => {
    const payload = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      categoryId: values.categoryId || undefined,
      dueDate: values.dueDate || undefined,
      tags: values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };

    if (task) {
      updateTask.mutate({ id: task.id, input: payload }, { onSuccess: onClose });
    } else {
      createTask.mutate(payload, { onSuccess: onClose });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {task ? "Edit Task" : "Create Task"}
              </h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Title</label>
                <input
                  {...register("title")}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                  placeholder="e.g. Finish quarterly report"
                />
                {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                  placeholder="Optional details"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Priority</label>
                  <select
                    {...register("priority")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Due Date</label>
                  <input
                    type="date"
                    {...register("dueDate")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Tags</label>
                <input
                  {...register("tags")}
                  placeholder="work, urgent, client"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                disabled={createTask.isPending || updateTask.isPending}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {task ? "Save Changes" : "Create Task"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}