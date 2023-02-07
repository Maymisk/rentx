import { Rents } from '@prisma/client';
import { Rent } from '../infra/typeorm/entities/Rent';
import { ICreateRentDTO } from '../useCases/createRent/CreateRentDTO';

interface IRentsRepository {
	create({
		user_id,
		car_id,
		expected_return_date,
	}: ICreateRentDTO): Promise<Rent | Rents>;
	findOpenRentByCar(car_id: string): Promise<Rent | Rents>;
	findOpenRentByUser(user_id: string): Promise<Rent | Rents>;
	findById(rent_id: string): Promise<Rent | Rents>;
	findByUser(user_id: string): Promise<Rent[] | Rents[]>;
}

export { IRentsRepository };
