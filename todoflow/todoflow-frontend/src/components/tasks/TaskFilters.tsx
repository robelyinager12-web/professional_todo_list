"use client";

import { useCategories } from "../../hooks/useCategories";
import type { Priority, TaskStatus } from "../../types/task";

interface TaskFiltersProps {
  status?: TaskStatus;
  priority?: Priority;
  categoryId?: string;
  onStatusChange: (status?: TaskStatus) => void;
  onPriorityChange: (priority?: Priority) => void;
  onCategoryChange: (categoryId?: string) => void;
}

export default function TaskFilters({
  status,
  priority,
  categoryId,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}: TaskFiltersProps) {
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={status ?? ""}
        onChange={(e) => onStatusChange((e.target.value || undefined) as TaskStatus | undefined)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
      >
        <option value="">All Statuses</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        value={priority ?? ""}
        onChange={(e) => onPriorityChange((e.target.value || undefined) as Priority | undefined)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
      >
        <option value="">All Priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <select
        value={categoryId ?? ""}
        onChange={(e) => onCategoryChange(e.target.value || undefined)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}