import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import * as taskController from "../controllers/task.controller";

const router = Router();

router.use(requireAuth);

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id/complete", taskController.completeTask);
router.patch("/:id/archive", taskController.archiveTask);
router.patch("/:id/restore", taskController.restoreTask);
router.post("/:id/duplicate", taskController.duplicateTask);

export default router;