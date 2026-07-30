import type { Request, Response } from "express";
import * as analyticsService from "../services/analytics.service";

function getUserId(req: Request) {
  return (req as Request & { userId: string }).userId;
}

export async function getSummary(req: Request, res: Response) {
  const summary = await analyticsService.getTaskSummary(getUserId(req));
  res.status(200).json({ summary });
}

export async function getWeeklyProductivity(req: Request, res: Response) {
  const data = await analyticsService.getWeeklyProductivity(getUserId(req));
  res.status(200).json({ data });
}

export async function getMonthlyProgress(req: Request, res: Response) {
  const data = await analyticsService.getMonthlyProgress(getUserId(req));
  res.status(200).json({ data });
}