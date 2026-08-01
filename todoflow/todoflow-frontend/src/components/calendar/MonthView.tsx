"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useTasks, useUpdateTask } from "../../hooks/useTasks";
import DraggableTaskChip from "./DraggableTaskChip";
import TaskModal from "../tasks/TaskModal";
import type { Task } from "../../types/task";

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView() {
  const [cursor, setCursor] = useState(() => new Date());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const { data: tasks } = useTasks();
  const updateTask = useUpdateTask();

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const today = toDateKey(new Date());

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

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          {cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
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
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border">
        {WEEKDAYS.map((day) => (
          <div key={day} className="bg-muted px-2 py-1.5 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {grid.map((date) => {
          const key = toDateKey(date);
          const dayTasks = tasksByDay.get(key) ?? [];
          const inMonth = date.getMonth() === month;
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
              className={`min-h-[100px] bg-card p-1.5 transition ${
                !inMonth ? "opacity-40" : ""
              } ${isDragOver ? "bg-primary/10" : ""}`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {date.getDate()}
                </span>
              </div>

              <div className="space-y-0.5">
                {dayTasks.slice(0, 3).map((task) => (
                  <DraggableTaskChip key={task.id} task={task} onClick={() => openEdit(task)} />
                ))}
                {dayTasks.length > 3 && (
                  <p className="px-1.5 text-xs text-muted-foreground">+{dayTasks.length - 3} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Plus size={12} />
        Drag a task onto a different day to reschedule it
      </p>

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}