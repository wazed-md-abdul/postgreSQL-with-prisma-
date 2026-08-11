
import type { Request, Response } from "express";


export const logout =
    (req: Request, res: Response) => {


        res.clearCookie("token");


        res.json({

            message: "Logout successful"

        });


    };