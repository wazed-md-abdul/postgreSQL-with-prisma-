import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";
export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token =
            req.cookies.token;
        if (!token) {
            return res.status(401).json({

                message: "Unauthorized"

            });
        }
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            );
        req.user = decoded as any;
        next();

    } catch (error) {
        return res.status(401).json({

            message: "Invalid token"
        });
    }
}