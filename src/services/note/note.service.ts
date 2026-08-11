import prisma from "../../lib/prisma.ts";
import { NoteError } from "./note.utils.ts";

export class NoteService {
    static async create(userId: string, data: { title?: string; content: string; categoryId?: string; tags?: string[] }) {
        if (data.categoryId) {
            const category = await prisma.category.findFirst({
                where: { id: data.categoryId, userId }
            });
            if (!category) {
                throw new NoteError(404, "Category not found");
            }
        }

        const noteData: any = {
            userId,
            content: data.content,
        };
        if (data.title !== undefined) noteData.title = data.title;
        if (data.categoryId !== undefined) noteData.categoryId = data.categoryId;
        if (data.tags !== undefined) {
            noteData.tags = data.tags;
        } else {
            noteData.tags = [];
        }

        return prisma.note.create({
            data: noteData
        });
    }

    static async getAll(userId: string) {
        return prisma.note.findMany({
            where: { userId, isDeleted: false },
            include: {
                category: true
            }
        });
    }

    static async getOne(id: string, userId: string) {
        const note = await prisma.note.findFirst({
            where: { id, userId, isDeleted: false },
            include: {
                category: true
            }
        });
        if (!note) {
            throw new NoteError(404, "Note not found");
        }
        return note;
    }

    static async update(id: string, userId: string, data: { title?: string; content?: string; categoryId?: string; tags?: string[]; isPinned?: boolean; isArchived?: boolean }) {
        const note = await prisma.note.findFirst({
            where: { id, userId, isDeleted: false }
        });
        if (!note) {
            throw new NoteError(404, "Note not found");
        }

        if (data.categoryId && data.categoryId !== note.categoryId) {
            const category = await prisma.category.findFirst({
                where: { id: data.categoryId, userId }
            });
            if (!category) {
                throw new NoteError(404, "Category not found");
            }
        }

        const updateData: any = {};
        if (data.title !== undefined) updateData.title = data.title;
        if (data.content !== undefined) updateData.content = data.content;
        if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
        if (data.tags !== undefined) updateData.tags = data.tags;
        if (data.isPinned !== undefined) updateData.isPinned = data.isPinned;
        if (data.isArchived !== undefined) updateData.isArchived = data.isArchived;

        return prisma.note.update({
            where: { id },
            data: updateData
        });
    }

    static async delete(id: string, userId: string) {
        const note = await prisma.note.findFirst({
            where: { id, userId, isDeleted: false }
        });
        if (!note) {
            throw new NoteError(404, "Note not found");
        }

        return prisma.note.update({
            where: { id },
            data: { isDeleted: true }
        });
    }
}
