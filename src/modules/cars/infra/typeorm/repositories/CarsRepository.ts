import dataSource from '@dataSource/index';
import { Repository } from 'typeorm';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { ICreateCarDTO } from '../../../useCases/createCar/CreateCarDTO';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
    private cars: Repository<Car>;

    constructor() {
        this.cars = dataSource.getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.cars.create(data);

        await this.cars.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.cars.findOne({
            where: {
                license_plate: license_plate
            }
        });

        return car;
    }

    async findAvailable(
        name: string,
        brand: string,
        category_id: string
    ): Promise<Car[]> {
        const carsQuery = this.cars
            .createQueryBuilder('c')
            .where('c.available = :available', { available: true });

        if (name) {
            carsQuery.andWhere('c.name = :carName', { carName: name });
        }

        if (brand) {
            carsQuery.andWhere('c.brand = :carBrand', { carBrand: brand });
        }

        if (category_id) {
            carsQuery.andWhere('c.category_id = :carCategory', {
                carCategory: category_id
            });
        }

        return await carsQuery.getMany();
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.cars.findOne({
            where: {
                id: car_id
            }
        });

        return car;
    }

    async updateAvailable(car_id: string, state: boolean): Promise<void> {
        const car = await this.cars.findOne({
            where: {
                id: car_id
            }
        });

        car.available = state;

        await this.cars.save(car);
    }
}

export { CarsRepository };
