import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendPasswordMailUseCase } from "./SendPasswordMailUseCase";


class SendPasswordMailController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { email } = request.body

        const sendPasswordMailUseCase = container.resolve(SendPasswordMailUseCase)
        await sendPasswordMailUseCase.execute(email)

        return response.status(201).send()
    }
}

export {SendPasswordMailController}