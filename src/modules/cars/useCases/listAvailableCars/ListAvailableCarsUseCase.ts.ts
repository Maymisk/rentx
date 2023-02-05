import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
    name?: string;
    brand?: string;
    category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('PrismaCarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ name, brand, category_id }: IRequest) {
        const cars = await this.carsRepository.findAvailable(
            name,
            brand,
            category_id
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase };
