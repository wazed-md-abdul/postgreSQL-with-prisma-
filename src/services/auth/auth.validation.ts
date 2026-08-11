import type { Request, Response, NextFunction } from "express";

export function validateRegister(req: Request, res: Response, next: NextFunction): any {
    const { name, username, email, password } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Name is required." });
    }
    if (!username || typeof username !== "string" || username.trim() === "") {
        return res.status(400).json({ message: "Username is required." });
    }
    if (!email || typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "Email is required." });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    if (!password || typeof password !== "string" || password.trim() === "") {
        return res.status(400).json({ message: "Password is required." });
    }

    next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction): any {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ message: "Email is required." });
    }
    if (!password || typeof password !== "string" || password.trim() === "") {
        return res.status(400).json({ message: "Password is required." });
    }

    next();
}
