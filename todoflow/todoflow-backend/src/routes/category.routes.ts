import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import * as categoryController from "../controllers/category.controller";

const router = Router();

router.use(requireAuth);

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.post("/:id/share", categoryController.shareCategory);
router.delete("/:id/members/:userId", categoryController.removeMember);

export default router;