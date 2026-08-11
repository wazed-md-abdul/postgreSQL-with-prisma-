import prisma from "../../lib/prisma.ts";
import type { Request, Response } from "express";

export const getSession =
    async (req: Request, res: Response) => {

        const user =
            await prisma.user.findUnique({

                where: {
                    id: req.user!.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true
                }
            });

        res.json(user);

    }
