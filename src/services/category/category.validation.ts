import type { Request, Response, NextFunction } from "express";

export function validateCreateCategory(req: Request, res: Response, next: NextFunction): any {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Category name is required." });
    }

    next();
}

export function validateUpdateCategory(req: Request, res: Response, next: NextFunction): any {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Category name is required." });
    }

    next();
}
