import { Cars, Prisma, Specifications_Cars } from '@prisma/client';
import client from '@prismaClient/index';
import { ICarsRepository } from 'modules/cars/repositories/ICarsRepository';
import { ICreateCarDTO } from 'modules/cars/useCases/createCar/CreateCarDTO';
import { Car } from '../../typeorm/entities/Car';
import { Specification } from '../../typeorm/entities/Specification';

class CarsRepository implements ICarsRepository {
	private cars: Prisma.CarsDelegate<false>;

	constructor() {
		this.cars = client.cars;
	}

	async create({
		id,
		brand,
		daily_rate,
		description,
		category_id,
		fine_amount,
		license_plate,
		name,
	}: ICreateCarDTO): Promise<Car | Cars> {
		const car = await this.cars.create({
			data: {
				brand,
				daily_rate,
				description,
				fine_amount,
				license_plate,
				name,
				category_id,
			},
		});

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car | Cars> {
		const car = await this.cars.findUnique({
			where: {
				license_plate,
			},
		});

		return car;
	}

	async findAvailable(
		name?: string,
		brand?: string,
		category_id?: string
	): Promise<Car[] | Cars[]> {
		const cars = await this.cars.findMany({
			where: {
				AND: [
					{
						name,
					},
					{
						brand,
					},
					{
						category_id,
					},
				],
				available: true,
			},
		});

		return cars;
	}

	async findById(car_id: string): Promise<
		| Car
		| (Cars & {
				specifications: Specifications_Cars[];
		  })
	> {
		const car = await this.cars.findFirst({
			where: {
				id: car_id,
			},
			include: {
				specifications: true,
			},
		});

		return car;
	}

	async updateAvailable(car_id: string, state: boolean): Promise<void> {
		await this.cars.update({
			data: {
				available: state,
			},
			where: {
				id: car_id,
			},
		});
	}

	async updateSpecifications(
		car_id: string,
		specifications: Specification[]
	): Promise<Cars | Car> {
		const data = specifications.map(specification => {
			return { specification_id: specification.id };
		});

		const car = await this.cars.update({
			where: {
				id: car_id,
			},
			data: {
				specifications: {
					deleteMany: {},
					createMany: {
						data,
					},
				},
			},
			include: {
				specifications: true,
			},
		});

		return car;
	}
}

export { CarsRepository };
