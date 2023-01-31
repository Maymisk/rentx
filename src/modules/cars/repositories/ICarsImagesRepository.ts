import { Cars_Images } from '@prisma/client';
import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage | Cars_Images>;
}

export { ICarsImagesRepository };
