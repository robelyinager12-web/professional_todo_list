"use client";

import PriorityBadge from "../tasks/PriorityBadge";
import type { Task } from "../../types/task";

interface DraggableTaskChipProps {
  task: Task;
  onClick: () => void;
}

const priorityDot: Record<Task["priority"], string> = {
  LOW: "bg-emerald-500",
  MEDIUM: "bg-amber-500",
  HIGH: "bg-rose-500",
};

export default function DraggableTaskChip({ task, onClick }: DraggableTaskChipProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/task-id", task.id);
  };

  return (
    <button
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className={`flex w-full items-center gap-1.5 truncate rounded-md px-1.5 py-1 text-left text-xs transition hover:bg-muted ${
        task.status === "COMPLETED" ? "text-muted-foreground line-through" : "text-foreground"
      }`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDot[task.priority]}`} />
      <span className="truncate">{task.title}</span>
    </button>
  );
}