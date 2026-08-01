"use client";

import { ArrowUpDown } from "lucide-react";
import type { TaskQuery } from "../../lib/api/tasks";

interface TaskSortMenuProps {
  sortBy: TaskQuery["sortBy"];
  order: TaskQuery["order"];
  onChange: (sortBy: TaskQuery["sortBy"], order: TaskQuery["order"]) => void;
}

const options: { label: string; sortBy: TaskQuery["sortBy"]; order: TaskQuery["order"] }[] = [
  { label: "Newest first", sortBy: "createdAt", order: "desc" },
  { label: "Oldest first", sortBy: "createdAt", order: "asc" },
  { label: "Due date", sortBy: "dueDate", order: "asc" },
  { label: "Priority", sortBy: "priority", order: "desc" },
  { label: "Title (A-Z)", sortBy: "title", order: "asc" },
];

export default function TaskSortMenu({ sortBy, order, onChange }: TaskSortMenuProps) {
  const current = options.find((o) => o.sortBy === sortBy && o.order === order) ?? options[0];

  return (
    <div className="relative flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm">
      <ArrowUpDown size={14} className="text-muted-foreground" />
      <select
        value={current.label}
        onChange={(e) => {
          const opt = options.find((o) => o.label === e.target.value);
          if (opt) onChange(opt.sortBy, opt.order);
        }}
        className="bg-transparent text-sm outline-none"
      >
        {options.map((opt) => (
          <option key={opt.label} value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}