import { Rentals } from '@prisma/client';
import { Rent } from '../infra/typeorm/entities/Rent';
import { ICreateRentDTO } from '../useCases/createRent/CreateRentDTO';

interface IRentsRepository {
    create({
        user_id,
        car_id,
        expected_return_date
    }: ICreateRentDTO): Promise<Rent | Rentals>;
    findOpenRentByCar(car_id: string): Promise<Rent | Rentals>;
    findOpenRentByUser(user_id: string): Promise<Rent | Rentals>;
    findById(rent_id: string): Promise<Rent | Rentals>;
    findByUser(user_id: string): Promise<Rent[] | Rentals[]>;
}

export { IRentsRepository };
