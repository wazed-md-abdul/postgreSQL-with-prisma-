import type { Request, Response, NextFunction } from "express";

export function validateCreateNote(req: Request, res: Response, next: NextFunction): any {
    const { title, content, categoryId, tags } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
        return res.status(400).json({ message: "Content is required." });
    }

    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
        return res.status(400).json({ message: "Title must be a non-empty string." });
    }

    if (categoryId !== undefined && (typeof categoryId !== "string" || categoryId.trim() === "")) {
        return res.status(400).json({ message: "CategoryId must be a non-empty string." });
    }

    if (tags !== undefined && !Array.isArray(tags)) {
        return res.status(400).json({ message: "Tags must be an array of strings." });
    }

    if (tags !== undefined) {
        for (const tag of tags) {
            if (typeof tag !== "string") {
                return res.status(400).json({ message: "Each tag must be a string." });
            }
        }
    }

    next();
}

export function validateUpdateNote(req: Request, res: Response, next: NextFunction): any {
    const { title, content, categoryId, tags, isPinned, isArchived } = req.body;

    if (content !== undefined && (typeof content !== "string" || content.trim() === "")) {
        return res.status(400).json({ message: "Content must be a non-empty string." });
    }

    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
        return res.status(400).json({ message: "Title must be a non-empty string." });
    }

    if (categoryId !== undefined && categoryId !== null && (typeof categoryId !== "string" || categoryId.trim() === "")) {
        return res.status(400).json({ message: "CategoryId must be a non-empty string or null." });
    }

    if (tags !== undefined && !Array.isArray(tags)) {
        return res.status(400).json({ message: "Tags must be an array of strings." });
    }

    if (tags !== undefined) {
        for (const tag of tags) {
            if (typeof tag !== "string") {
                return res.status(400).json({ message: "Each tag must be a string." });
            }
        }
    }

    if (isPinned !== undefined && typeof isPinned !== "boolean") {
        return res.status(400).json({ message: "isPinned must be a boolean." });
    }

    if (isArchived !== undefined && typeof isArchived !== "boolean") {
        return res.status(400).json({ message: "isArchived must be a boolean." });
    }

    next();
}
