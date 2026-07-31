"use client";

import { useTasks } from "../../hooks/useTasks";
import PriorityBadge from "../tasks/PriorityBadge";

export default function RecentTasks() {
  const { data: tasks, isLoading } = useTasks({ sortBy: "createdAt", order: "desc" });
  const recent = tasks?.slice(0, 5) ?? [];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Recent Tasks</h2>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : recent.length > 0 ? (
        <ul className="space-y-3">
          {recent.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-3">
              <span className="truncate text-sm text-foreground">{task.title}</span>
              <PriorityBadge priority={task.priority} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No tasks yet.</p>
      )}
    </div>
  );
}