import { NextFunction, Request, Response } from "express";
import {verify} from 'jsonwebtoken'
import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError("Token missing!", 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const {sub} = verify(token, auth.jwt_secret) as IPayload
        // Sub is the user id
        
        request.user = {
            id: sub
        }

        next()
    } catch {
        throw new AppError('Invalid token!', 401)
    }
}