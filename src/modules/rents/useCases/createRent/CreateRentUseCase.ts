import { Rents } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';

import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rent } from '../../infra/typeorm/entities/Rent';
import { IRentsRepository } from '../../repositories/IRentsRepository';

interface IRequest {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
}

dayjs.extend(utc);

@injectable()
class CreateRentUseCase {
	constructor(
		@inject('PrismaRentsRepository')
		private rentsRepository: IRentsRepository,
		@inject('DayJsDateProvider')
		private dateProvider: IDateProvider,
		@inject('PrismaCarsRepository')
		private carsRepository: ICarsRepository
	) {}

	async execute({
		user_id,
		car_id,
		expected_return_date,
	}: IRequest): Promise<Rent | Rents> {
		const carUnavailable = await this.rentsRepository.findOpenRentByCar(
			car_id
		);

		if (carUnavailable) {
			throw new AppError('This car is not available for rent!');
		}

		const userHasOpenRent = await this.rentsRepository.findOpenRentByUser(
			user_id
		);

		if (userHasOpenRent) {
			throw new AppError('This user already has a rented car!');
		}

		const now = this.dateProvider.dateNow();
		const compare = this.dateProvider.compareInHours(
			now,
			expected_return_date
		);
		const invalidRentTime = compare < 24 ? true : false;

		if (invalidRentTime) {
			throw new AppError('The minimum rent time is 24 hours!');
		}

		const rent = await this.rentsRepository.create({
			user_id,
			car_id,
			expected_return_date,
		});

		await this.carsRepository.updateAvailable(car_id, false);

		return rent;
	}
}

export { CreateRentUseCase };
