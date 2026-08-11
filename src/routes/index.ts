import { Router } from "express";
import noteRouter from "./note.routes.ts";
import userRouter from "./user.routes.ts";
import categoryRouter from "./category.routes.ts";

const router = Router();

router.use("/notes", noteRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

export default router;
