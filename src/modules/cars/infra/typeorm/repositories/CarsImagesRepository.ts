import dataSource from '@dataSource/index';
import { Repository } from 'typeorm';
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
    private carsImagesRepository: Repository<CarImage>;

    constructor() {
        this.carsImagesRepository = dataSource.getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.carsImagesRepository.create({
            car_id,
            image_name
        });

        await this.carsImagesRepository.save(carImage);

        return carImage;
    }
}

export { CarsImagesRepository };
