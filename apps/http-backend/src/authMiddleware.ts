import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";

interface JwtPayload extends jwt.JwtPayload{
    userId: string
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload;

    if(decoded){
        req.userId = decoded.userId;
        next();
    }else{
        res.status(400).json({
            message: "Not a valid token"
        })
    }
}
