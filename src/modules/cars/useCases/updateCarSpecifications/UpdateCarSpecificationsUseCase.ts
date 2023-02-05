import { Cars, Prisma } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ISpecificationRespository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
	car_id: string;
	specification_ids: string[];
}

@injectable()
class UpdateCarSpecificationUseCase {
	constructor(
		@inject('PrismaCarsRepository')
		private carsRepository: ICarsRepository,

		@inject('PrismaSpecificationsRepository')
		private specificationsRepository: ISpecificationRespository
	) {}

	async execute({
		car_id,
		specification_ids,
	}: IRequest): Promise<Car | Cars> {
		const carExists = await this.carsRepository.findById(car_id);

		if (!carExists) {
			throw new AppError("This car doesn't exist!");
		}

		const specifications = await this.specificationsRepository.findByIds(
			specification_ids
		);

		const updatedCar = await this.carsRepository.updateSpecifications(
			carExists.id,
			specifications
		);

		return updatedCar;
	}
}

export { UpdateCarSpecificationUseCase };
