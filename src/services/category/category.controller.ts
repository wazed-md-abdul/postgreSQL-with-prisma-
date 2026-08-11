import type { Request, Response } from "express";
import { CategoryService } from "./category.service.ts";
import { CategoryError } from "./category.utils.ts";

export class CategoryController {
    static async create(req: Request, res: Response): Promise<any> {
        try {
            const category = await CategoryService.create(req.user!.id, req.body.name);
            return res.status(201).json({
                message: "Category created successfully",
                category
            });
        } catch (error) {
            if (error instanceof CategoryError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Create Category Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const categories = await CategoryService.getAll(req.user!.id);
            return res.status(200).json(categories);
        } catch (error) {
            console.error("Get Categories Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getOne(req: Request, res: Response): Promise<any> {
        try {
            const category = await CategoryService.getOne(req.params.id as string, req.user!.id);
            return res.status(200).json(category);
        } catch (error) {
            if (error instanceof CategoryError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Get Category Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async update(req: Request, res: Response): Promise<any> {
        try {
            const category = await CategoryService.update(req.params.id as string, req.user!.id, req.body.name);
            return res.status(200).json({
                message: "Category updated successfully",
                category
            });
        } catch (error) {
            if (error instanceof CategoryError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Update Category Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response): Promise<any> {
        try {
            await CategoryService.delete(req.params.id as string, req.user!.id);
            return res.status(200).json({
                message: "Category deleted successfully"
            });
        } catch (error) {
            if (error instanceof CategoryError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Delete Category Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
