import { Router } from "express";
import { NoteController } from "../services/note/note.controller.js";
import { validateCreateNote, validateUpdateNote } from "../services/note/note.validation.js";
import { authMiddleWare } from "../services/auth/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all note routes
router.use(authMiddleWare);

router.post("/", validateCreateNote, NoteController.create);
router.get("/", NoteController.getAll);
router.get("/:id", NoteController.getOne);
router.put("/:id", validateUpdateNote, NoteController.update);
router.delete("/:id", NoteController.delete);

export default router;
