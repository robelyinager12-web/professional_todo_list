"use client";

import { motion } from "framer-motion";
import { Check, Copy, Archive, Trash2, Pencil } from "lucide-react";
import type { Task } from "../../types/task";
import PriorityBadge from "./PriorityBadge";
import { useCompleteTask, useArchiveTask, useDeleteTask, useDuplicateTask } from "../../hooks/useTasks";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const complete = useCompleteTask();
  const archive = useArchiveTask();
  const remove = useDeleteTask();
  const duplicate = useDuplicateTask();

  const isDone = task.status === "COMPLETED";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => complete.mutate(task.id)}
            disabled={isDone}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
              isDone ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
            }`}
          >
            {isDone && <Check size={12} />}
          </button>

          <div>
            <p className={`text-sm font-medium ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <PriorityBadge priority={task.priority} />
              {task.category && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: `${task.category.color}20`, color: task.category.color }}
                >
                  {task.category.name}
                </span>
              )}
              {task.dueDate && (
                <span className="text-xs text-muted-foreground">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <button onClick={() => onEdit(task)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Pencil size={14} />
          </button>
          <button onClick={() => duplicate.mutate(task.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Copy size={14} />
          </button>
          <button onClick={() => archive.mutate(task.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Archive size={14} />
          </button>
          <button onClick={() => remove.mutate(task.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}