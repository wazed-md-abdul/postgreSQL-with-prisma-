import { Router } from "express";
import { UserController } from "../services/user/user.controller.js";
import { authMiddleWare } from "../services/auth/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all user routes
router.use(authMiddleWare);

router.get("/me", UserController.getMe);

export default router;
