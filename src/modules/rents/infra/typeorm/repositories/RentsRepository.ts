import dataSource from '@dataSource/index';
import { Repository } from 'typeorm';
import { IRentsRepository } from '../../../repositories/IRentsRepository';
import { ICreateRentDTO } from '../../../useCases/createRent/CreateRentDTO';
import { Rent } from '../entities/Rent';

class RentsRepository implements IRentsRepository {
    private rentsRepository: Repository<Rent>;

    constructor() {
        this.rentsRepository = dataSource.getRepository(Rent);
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
        id,
        end_date,
        total
    }: ICreateRentDTO): Promise<Rent> {
        const rent = this.rentsRepository.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            end_date,
            total
        });

        await this.rentsRepository.save(rent);

        return rent;
    }

    async findOpenRentByCar(car_id: string): Promise<Rent> {
        return await this.rentsRepository.findOne({
            where: { end_date: null, car_id }
        });
    }

    async findOpenRentByUser(user_id: string): Promise<Rent> {
        return await this.rentsRepository.findOne({
            where: { end_date: null, user_id }
        });
    }

    async findById(rent_id: string): Promise<Rent> {
        const rent = await this.rentsRepository.findOne({
            where: {
                id: rent_id
            }
        });
        return rent;
    }

    async findByUser(user_id: string): Promise<Rent[]> {
        const rents = await this.rentsRepository.find({
            where: { user_id },
            relations: {
                car: true
            }
        });

        return rents;
    }
}

export { RentsRepository };
