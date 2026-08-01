"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTasks, useUpdateTask } from "../../hooks/useTasks";
import DraggableTaskChip from "./DraggableTaskChip";
import TaskModal from "../tasks/TaskModal";
import type { Task } from "../../types/task";

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export default function WeekView() {
  const [cursor, setCursor] = useState(() => new Date());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const { data: tasks } = useTasks();
  const updateTask = useUpdateTask();

  const weekStart = useMemo(() => startOfWeek(cursor), [cursor]);
  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return d;
      }),
    [weekStart]
  );

  const tasksByDay = useMemo(() => {
    const map = new Map<string, Task[]>();
    (tasks ?? []).forEach((task) => {
      if (!task.dueDate) return;
      const key = task.dueDate.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(task);
    });
    return map;
  }, [tasks]);

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    setDragOverKey(null);
    const taskId = e.dataTransfer.getData("text/task-id");
    if (!taskId) return;
    updateTask.mutate({ id: taskId, input: { dueDate: toDateKey(date) } });
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const today = toDateKey(new Date());

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Week of {weekStart.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 7))}
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
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 7))}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border">
        {days.map((date) => {
          const key = toDateKey(date);
          const dayTasks = tasksByDay.get(key) ?? [];
          const isToday = key === today;
          const isDragOver = dragOverKey === key;

          return (
            <div
              key={key}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverKey(key);
              }}
              onDragLeave={() => setDragOverKey((k) => (k === key ? null : k))}
              onDrop={(e) => handleDrop(e, date)}
              className={`min-h-[220px] bg-card p-2 transition ${isDragOver ? "bg-primary/10" : ""}`}
            >
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {date.toLocaleDateString(undefined, { weekday: "short" })}{" "}
                <span
                  className={`ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${
                    isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {date.getDate()}
                </span>
              </p>

              <div className="space-y-0.5">
                {dayTasks.map((task) => (
                  <DraggableTaskChip key={task.id} task={task} onClick={() => openEdit(task)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}