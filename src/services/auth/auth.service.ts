import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";
import { AuthError } from "./auth.utils.js";
import type { RegisterInput, LoginInput, AuthUserResponse } from "./auth.types.js";
import { createToken } from "../../utils/jwt.js";

export class AuthService {

    static async register(input: RegisterInput): Promise<Omit<AuthUserResponse, "token">> {
        const { name, username, email, password } = input;

        // 1. Check if username already exists
        const existingUsername = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUsername) {
            throw new AuthError(409, "Username already taken");
        }

        // 2. Check if email already exists
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (existingEmail) {
            throw new AuthError(409, "Email already registered, try login");
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Create user
        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword
            }
        });

        // 5. Return user without password
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        };
    }

    static async login(input: LoginInput): Promise<AuthUserResponse> {
        const { email, password } = input;

        // 1. Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new AuthError(404, "User not found");
        }

        // 2. Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new AuthError(401, "Invalid credentials");
        }
        const token = createToken({

            id: user.id,
            email: user.email,
            role: user.role

        });


        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            token
        };
    }
}
