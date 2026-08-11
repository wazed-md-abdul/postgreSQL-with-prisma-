import { Router } from "express";
import { CategoryController } from "../services/category/category.controller.js";
import { validateCreateCategory, validateUpdateCategory } from "../services/category/category.validation.js";
import { authMiddleWare } from "../services/auth/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all category routes
router.use(authMiddleWare);

router.post("/", validateCreateCategory, CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.put("/:id", validateUpdateCategory, CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
