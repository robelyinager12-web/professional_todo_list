import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import * as userController from "../controllers/user.controller";

const router = Router();

router.use(requireAuth);

router.patch("/me", userController.updateProfile);
router.patch("/me/password", userController.changePassword);
router.delete("/me", userController.deleteAccount);

export default router;