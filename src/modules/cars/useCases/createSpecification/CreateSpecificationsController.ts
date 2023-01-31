import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateSpecificationUseCase } from "./CreateSpecificationsUseCase"


class CreateSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
    const {name, description} = request.body

    const SpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    await SpecificationUseCase.execute({name, description})

    return response.status(201).send()
    }
}

export {CreateSpecificationsController}