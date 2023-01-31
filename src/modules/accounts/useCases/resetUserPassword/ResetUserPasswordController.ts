import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";


class ResetUserPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {token} = request.query
        const { password } = request.body

        const resetPasswordUseCase = container.resolve(ResetUserPasswordUseCase)
        await resetPasswordUseCase.execute({token: String(token), password})

        return response.json({message: "Your password has been successfully modified!"})
    }
}

export {ResetUserPasswordController}