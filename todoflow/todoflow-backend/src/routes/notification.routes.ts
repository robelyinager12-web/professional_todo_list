import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import * as notificationController from "../controllers/notification.controller";

const router = Router();

router.use(requireAuth);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", notificationController.markRead);
router.patch("/read-all", notificationController.markAllRead);

export default router;