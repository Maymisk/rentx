import {
    ICreateSpecificationDTO,
    ISpecificationRespository
} from '../../repositories/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('PrismaSpecificationsRepository')
        private specificationsRepository: ISpecificationRespository
    ) {}

    async execute({
        name,
        description
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = await this.specificationsRepository.findByName(
            name
        );

        if (specification) {
            throw new AppError('Specification already exists!');
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
