import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import {Request, Response} from 'express'
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import {container} from 'tsyringe'


class createCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const categoriesUseCase = container.resolve(CreateCategoryUseCase)

    const category = await categoriesUseCase.execute({name, description})

    return response.status(201).json(category)
    }
}

export { createCategoryController }