import prisma from "../../lib/prisma.js";
import { CategoryError } from "./category.utils.js";

export class CategoryService {
    static async create(userId: string, name: string) {
        const existing = await prisma.category.findFirst({
            where: { userId, name }
        });
        if (existing) {
            throw new CategoryError(409, "Category with this name already exists");
        }

        return prisma.category.create({
            data: {
                userId,
                name
            }
        });
    }

    static async getAll(userId: string) {
        return prisma.category.findMany({
            where: { userId }
        });
    }

    static async getOne(id: string, userId: string) {
        const category = await prisma.category.findFirst({
            where: { id, userId }
        });
        if (!category) {
            throw new CategoryError(404, "Category not found");
        }
        return category;
    }

    static async update(id: string, userId: string, name: string) {
        const category = await prisma.category.findFirst({
            where: { id, userId }
        });
        if (!category) {
            throw new CategoryError(404, "Category not found");
        }

        const existing = await prisma.category.findFirst({
            where: { userId, name, NOT: { id } }
        });
        if (existing) {
            throw new CategoryError(409, "Category with this name already exists");
        }

        return prisma.category.update({
            where: { id },
            data: { name }
        });
    }

    static async delete(id: string, userId: string) {
        const category = await prisma.category.findFirst({
            where: { id, userId }
        });
        if (!category) {
            throw new CategoryError(404, "Category not found");
        }

        return prisma.category.delete({
            where: { id }
        });
    }
}
