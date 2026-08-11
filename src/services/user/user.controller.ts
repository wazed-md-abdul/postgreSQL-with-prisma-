import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { UserError } from "./user.utils.js";

export class UserController {
    static async getMe(req: Request, res: Response): Promise<any> {
        try {
            const user = await UserService.getProfile(req.user!.id);
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof UserError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("GetMe Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
