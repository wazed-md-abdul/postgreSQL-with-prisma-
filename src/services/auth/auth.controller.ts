import type { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";
import { AuthError } from "./auth.utils.ts";

export class AuthController {
    static async register(req: Request, res: Response): Promise<any> {
        try {

            const user = await AuthService.register(req.body);
            return res.status(201).json({
                message: "Registration successful",
                user
            });
        } catch (error) {
            if (error instanceof AuthError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Register Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async login(req: Request, res: Response): Promise<any> {
        try {
            const user = await AuthService.login(req.body);
            res.cookie("token", user.token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.status(200).json({
                message: "Login successful",
                user,

            });
        } catch (error) {
            if (error instanceof AuthError) {
                return res.status(error.status).json({ message: error.message });
            }
            console.error("Login Error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
