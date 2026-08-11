import prisma from "../../lib/prisma.js";
import { UserError } from "./user.utils.js";

export class UserService {
    static async getProfile(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                avatar: true
            }
        });
        if (!user) {
            throw new UserError(404, "User not found");
        }
        return user;
    }
}
