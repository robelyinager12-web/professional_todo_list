import { useQuery } from "@tanstack/react-query";
import * as analyticsApi from "../lib/api/analytics";

export function useTaskSummary() {
  return useQuery({
    queryKey: ["analytics", "summary"],
    queryFn: analyticsApi.fetchSummary,
  });
}

export function useWeeklyProductivity() {
  return useQuery({
    queryKey: ["analytics", "weekly"],
    queryFn: analyticsApi.fetchWeeklyProductivity,
  });
}

export function useMonthlyProgress() {
  return useQuery({
    queryKey: ["analytics", "monthly"],
    queryFn: analyticsApi.fetchMonthlyProgress,
  });
}