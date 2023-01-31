import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRefreshTokenUseCase } from "./CreateRefreshTokenUseCase";

class CreateRefreshTokenController {
    async handle(request: Request, response: Response) {
        const token = request.body.token || request.headers["x-access-token"] || request.query.token

        const createRefreshTokenUseCase = container.resolve(CreateRefreshTokenUseCase)
        const refreshToken = await createRefreshTokenUseCase.execute(token)

        return response.json(refreshToken)
    }

}

export {CreateRefreshTokenController}