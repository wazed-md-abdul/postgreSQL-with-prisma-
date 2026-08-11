import { Router } from "express";
import noteRouter from "./note.routes.js";
import userRouter from "./user.routes.js";
import categoryRouter from "./category.routes.js";

const router = Router();

router.use("/notes", noteRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

export default router;
