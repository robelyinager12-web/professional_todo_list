import api from "./axios";

export interface TaskSummary {
  completed: number;
  pending: number;
  inProgress: number;
  archived: number;
}

export async function fetchSummary(): Promise<TaskSummary> {
  const { data } = await api.get<{ summary: TaskSummary }>("/analytics/summary");
  return data.summary;
}

export async function fetchWeeklyProductivity(): Promise<Record<string, number>> {
  const { data } = await api.get<{ data: Record<string, number> }>("/analytics/weekly");
  return data.data;
}

export async function fetchMonthlyProgress(): Promise<Record<string, number>> {
  const { data } = await api.get<{ data: Record<string, number> }>("/analytics/monthly");
  return data.data;
}