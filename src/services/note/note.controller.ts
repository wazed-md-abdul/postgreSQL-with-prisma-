import type { Request, Response } from "express";
import { NoteService } from "./note.service.ts";
import { NoteError } from "./note.utils.ts";

export class NoteController {
    static async create(req: Request, res: Response): Promise<any> {
        try {
            const note = await NoteService.create(req.user!.id, req.body);
            return res.status(201).json({
                message: "Note created successfully",
                note
            });
        } catch (error) {
            if (error instanceof NoteError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Create Note Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const notes = await NoteService.getAll(req.user!.id);
            return res.status(200).json(notes);
        } catch (error) {
            console.error("Get Notes Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getOne(req: Request, res: Response): Promise<any> {
        try {
            const note = await NoteService.getOne(req.params.id as string, req.user!.id);
            return res.status(200).json(note);
        } catch (error) {
            if (error instanceof NoteError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Get Note Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async update(req: Request, res: Response): Promise<any> {
        try {
            const note = await NoteService.update(req.params.id as string, req.user!.id, req.body);
            return res.status(200).json({
                message: "Note updated successfully",
                note
            });
        } catch (error) {
            if (error instanceof NoteError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Update Note Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response): Promise<any> {
        try {
            await NoteService.delete(req.params.id as string, req.user!.id);
            return res.status(200).json({
                message: "Note deleted successfully"
            });
        } catch (error) {
            if (error instanceof NoteError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Delete Note Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
