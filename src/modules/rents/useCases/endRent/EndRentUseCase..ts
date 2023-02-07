import { Rents } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rent } from '../../infra/typeorm/entities/Rent';
import { IRentsRepository } from '../../repositories/IRentsRepository';

interface IRequest {
	rent_id: string;
}

@injectable()
class EndRentUseCase {
	constructor(
		@inject('PrismaRentsRepository')
		private rentsRepository: IRentsRepository,

		@inject('PrismaCarsRepository')
		private carsRepository: ICarsRepository,

		@inject('DayJsDateProvider')
		private dateProvider: IDateProvider
	) {}

	async execute({ rent_id }: IRequest): Promise<Rent | Rents> {
		const rent = await this.rentsRepository.findById(rent_id);
		const car = await this.carsRepository.findById(rent.car_id);
		let total = 0;

		const dateNow = this.dateProvider.dateNow();

		let rentDays = this.dateProvider.compareInDays(
			rent.start_date,
			rent.expected_return_date
		);

		if (rentDays < 1) {
			rentDays = 1;
		}

		const delay = this.dateProvider.compareInDays(
			rent.expected_return_date,
			dateNow
		);

		if (delay > 0) {
			const fine = delay * car.fine_amount;
			total += fine;
		}

		total += rentDays * car.daily_rate;

		rent.end_date = dateNow;
		rent.total = total;

		await this.rentsRepository.create(rent);
		await this.carsRepository.updateAvailable(car.id, true);

		return rent;
	}
}

export { EndRentUseCase };
