import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../lib/prisma.ts";


const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true
            }
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
});


export default router;