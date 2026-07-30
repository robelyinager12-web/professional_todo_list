import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import * as analyticsController from "../controllers/analytics.controller";

const router = Router();

router.use(requireAuth);

router.get("/summary", analyticsController.getSummary);
router.get("/weekly", analyticsController.getWeeklyProductivity);
router.get("/monthly", analyticsController.getMonthlyProgress);

export default router;