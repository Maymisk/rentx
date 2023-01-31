import { Cars_Images } from '@prisma/client';
import { ICarsImagesRepository } from 'modules/cars/repositories/ICarsImagesRepository';
import { CarImage } from '../../typeorm/entities/CarImage';
import { Prisma } from '@prisma/client';
import client from '@prismaClient/index';

class CarsImagesRepository implements ICarsImagesRepository {
    private carsImages: Prisma.Cars_ImagesDelegate<false>;

    constructor() {
        this.carsImages = client.cars_Images;
    }

    async create(
        car_id: string,
        image_name: string
    ): Promise<CarImage | Cars_Images> {
        const car_image = await this.carsImages.create({
            data: {
                car_id,
                image_name
            }
        });

        return car_image;
    }
}

export { CarsImagesRepository };
