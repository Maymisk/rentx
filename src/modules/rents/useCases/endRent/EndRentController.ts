import { Request, Response } from "express";
import { container } from "tsyringe";
import { Rent } from "../../infra/typeorm/entities/Rent";
import { EndRentUseCase } from "./EndRentUseCase.";


class EndRentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const {id: user_id} = request.user
        
        const endRentUseCase = container.resolve(EndRentUseCase)
        
        const rent = await endRentUseCase.execute({rent_id: id})

        return response.status(200).json(rent)

    }

}

export {EndRentController}