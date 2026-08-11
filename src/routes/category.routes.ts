import { Router } from "express";
import { CategoryController } from "../services/category/category.controller.ts";
import { validateCreateCategory, validateUpdateCategory } from "../services/category/category.validation.ts";
import { authMiddleWare } from "../services/auth/auth.middleware.ts";

const router = Router();

// Apply authentication middleware to all category routes
router.use(authMiddleWare);

router.post("/", validateCreateCategory, CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.put("/:id", validateUpdateCategory, CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
