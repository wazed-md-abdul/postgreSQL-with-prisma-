import { Router } from "express";
import { AuthController } from "../services/auth/auth.controller.js";
import { validateRegister, validateLogin } from "../services/auth/auth.validation.js";
import { getSession } from "../services/session/session.service.js";
import { authMiddleWare } from "../services/auth/auth.middleware.js";
import { logout } from "../services/logout/logout.service.js";

const router = Router();

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);
router.use("/logout", authMiddleWare, logout);
router.use("/session", authMiddleWare, getSession);

export default router;
