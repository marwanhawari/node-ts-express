import { Request, Response, NextFunction } from "express";
import { User, UserPathParameter } from "./users.model";

export default async function validateUser(
    req: Request<UserPathParameter, {}, User>,
    res: Response,
    next: NextFunction
) {
    if (!req.body?.firstName || !req.body?.lastName || req.body.age < 1) {
        res.status(400).json({
            message: "Could not create user. Invalid request body.",
        });
        return;
    }

    next();
}
