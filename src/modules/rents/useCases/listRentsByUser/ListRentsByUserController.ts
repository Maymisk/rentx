import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentByUserUseCase } from "./ListRentsByUserUseCase";

class ListRentsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.user

        const listRentsByUserUseCase = container.resolve(ListRentByUserUseCase)
        const rents = await listRentsByUserUseCase.execute(id)

        return response.json(rents)
    }
}

export {ListRentsByUserController}