import { Router } from "express";
import { AuthController } from "./auth.controller.ts";
import { validateRegister, validateLogin } from "./auth.validation.ts";

const router = Router();

router.post("/register", validateRegister, AuthController.register);
router.post("/login", validateLogin, AuthController.login);

export default router;
