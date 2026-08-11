import { Router } from "express";
import { authMiddleWare } from "../services/auth/auth.middleware.ts";
import { getSession } from "../services/session/session.service.ts";


const router = Router();


router.use("/session", authMiddleWare, getSession);


export default router;

