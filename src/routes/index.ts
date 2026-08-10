import { Router } from "express";
import orders from "../services/orders.ts";


const router = Router();

router.use("/orders", orders)


export default router;
