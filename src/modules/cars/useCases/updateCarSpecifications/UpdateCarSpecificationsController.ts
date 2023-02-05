import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCarSpecificationUseCase } from './UpdateCarSpecificationsUseCase';

class UpdateCarSpecificationsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { specification_ids } = request.body;

		const updateCarSpecificationUseCase = container.resolve(
			UpdateCarSpecificationUseCase
		);

		const car = await updateCarSpecificationUseCase.execute({
			car_id: id,
			specification_ids,
		});

		return response.json(car);
	}
}

export { UpdateCarSpecificationsController };
