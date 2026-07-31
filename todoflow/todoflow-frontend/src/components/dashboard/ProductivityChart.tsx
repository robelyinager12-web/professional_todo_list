"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useWeeklyProductivity } from "../../hooks/useAnalytics";

export default function ProductivityChart() {
  const { data, isLoading } = useWeeklyProductivity();

  const chartData = Object.entries(data ?? {}).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString(undefined, { weekday: "short" }),
    completed: count,
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Weekly Productivity</h2>

      {isLoading ? (
        <div className="h-48 animate-pulse rounded-lg bg-muted" />
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" fontSize={12} stroke="currentColor" />
            <YAxis allowDecimals={false} fontSize={12} stroke="currentColor" />
            <Tooltip />
            <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-muted-foreground">Complete a few tasks to see your trend.</p>
      )}
    </div>
  );
}