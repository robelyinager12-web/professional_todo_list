"use client";

import { useTasks } from "../../hooks/useTasks";

export default function UpcomingDeadlines() {
  const { data: tasks, isLoading } = useTasks({ sortBy: "dueDate", order: "asc" });
  const upcoming = (tasks ?? []).filter((t) => t.dueDate && t.status !== "COMPLETED").slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Upcoming Deadlines</h2>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : upcoming.length > 0 ? (
        <ul className="space-y-3">
          {upcoming.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-3">
              <span className="truncate text-sm text-foreground">{task.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {new Date(task.dueDate!).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Nothing due soon.</p>
      )}
    </div>
  );
}