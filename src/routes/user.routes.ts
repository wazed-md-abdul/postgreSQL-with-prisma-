import { Router } from "express";
import { UserController } from "../services/user/user.controller.ts";
import { authMiddleWare } from "../services/auth/auth.middleware.ts";

const router = Router();

// Apply authentication middleware to all user routes
router.use(authMiddleWare);

router.get("/me", UserController.getMe);

export default router;
