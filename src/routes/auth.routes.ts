import { Router } from "express";
import { AuthController } from "../services/auth/auth.controller.ts";
import { validateRegister, validateLogin } from "../services/auth/auth.validation.ts";
import { getSession } from "../services/session/session.service.ts";
import { authMiddleWare } from "../services/auth/auth.middleware.ts";
import { logout } from "../services/logout/logout.service.ts";

const router = Router();

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);
router.use("/logout", authMiddleWare, logout);
router.use("/session", authMiddleWare, getSession);

export default router;
