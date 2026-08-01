"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import PriorityBadge from "../tasks/PriorityBadge";
import TaskModal from "../tasks/TaskModal";
import type { Task } from "../../types/task";

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function DayView() {
  const [cursor, setCursor] = useState(() => new Date());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: tasks } = useTasks();

  const dayTasks = useMemo(() => {
    const key = toDateKey(cursor);
    return (tasks ?? []).filter((t) => t.dueDate?.slice(0, 10) === key);
  }, [tasks, cursor]);

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {cursor.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1))}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCursor(new Date())}
            className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Today
          </button>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1))}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {dayTasks.length > 0 ? (
        <div className="space-y-2">
          {dayTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => openEdit(task)}
              className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-left transition hover:bg-muted"
            >
              <span
                className={`text-sm ${task.status === "COMPLETED" ? "text-muted-foreground line-through" : "text-foreground"}`}
              >
                {task.title}
              </span>
              <PriorityBadge priority={task.priority} />
            </button>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-muted-foreground">Nothing scheduled for this day.</p>
      )}

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}