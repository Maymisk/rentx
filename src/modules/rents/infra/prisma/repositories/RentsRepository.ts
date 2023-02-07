import { IRentsRepository } from 'modules/rents/repositories/IRentsRepository';
import { Prisma, Rents } from '@prisma/client';
import client from '@prismaClient/index';
import { ICreateRentDTO } from 'modules/rents/useCases/createRent/CreateRentDTO';
import { Rent } from '../../typeorm/entities/Rent';

class RentsRepository implements IRentsRepository {
	private rents: Prisma.RentsDelegate<false>;

	constructor() {
		this.rents = client.rents;
	}
	async create({
		user_id,
		car_id,
		expected_return_date,
	}: ICreateRentDTO): Promise<Rent | Rents> {
		const rent = await this.rents.create({
			data: {
				user_id,
				car_id,
				expected_return_date,
			},
		});

		return rent;
	}

	async findOpenRentByCar(car_id: string): Promise<Rent | Rents> {
		const rent = await this.rents.findFirst({
			where: {
				car_id,
				end_date: null,
			},
		});

		return rent;
	}

	async findOpenRentByUser(user_id: string): Promise<Rent | Rents> {
		const rent = await this.rents.findFirst({
			where: {
				user_id,
				end_date: null,
			},
		});

		return rent;
	}

	async findById(rent_id: string): Promise<Rent | Rents> {
		const rent = await this.rents.findUnique({
			where: {
				id: rent_id,
			},
		});

		return rent;
	}

	async findByUser(user_id: string): Promise<Rent[] | Rents[]> {
		const rent = await this.rents.findMany({
			where: {
				user_id,
			},
		});

		return rent;
	}
}

export { RentsRepository };
