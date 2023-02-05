import { Car } from '../infra/typeorm/entities/Car';
import { Cars, Specifications_Cars } from '@prisma/client';
import { ICreateCarDTO } from '../useCases/createCar/CreateCarDTO';
import { Specification } from '../infra/typeorm/entities/Specification';

interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car | Cars>;
	findByLicensePlate(license_plate: string): Promise<Car | Cars>;
	findAvailable(
		name?: string,
		brand?: string,
		category_id?: string
	): Promise<Car[] | Cars[]>;
	findById(car_id: string): Promise<
		| Car
		| (Cars & {
				specifications: Specifications_Cars[];
		  })
	>;
	updateAvailable(car_id: string, state: boolean): Promise<void>;
	updateSpecifications(
		car_id: string,
		specifications: Specification[]
	): Promise<Car | Cars>;
}

export { ICarsRepository };
