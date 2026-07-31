"use client";

import { useTaskSummary } from "../../hooks/useAnalytics";

const cards = [
  { key: "pending", label: "Pending" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "archived", label: "Archived" },
] as const;

export default function TaskSummary() {
  const { data: summary, isLoading } = useTaskSummary();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map(({ key, label }) => (
        <div key={key} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {isLoading ? "—" : summary?.[key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}