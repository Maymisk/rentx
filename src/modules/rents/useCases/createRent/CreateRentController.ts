import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentUseCase } from "./CreateRentUseCase";


class CreateRentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body
        const { id } = request.user

        const createRentUseCase = container.resolve(CreateRentUseCase)
        const rent = await createRentUseCase.execute({user_id: id, car_id, expected_return_date})

        return response.status(201).json(rent)
    }
}

export {CreateRentController}