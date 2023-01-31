import dataSource from '@dataSource/index';
import {
    ICreateSpecificationDTO,
    ISpecificationRespository
} from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';
import { Repository } from 'typeorm';

class SpecificationsRepository implements ISpecificationRespository {
    private specificationRepository: Repository<Specification>;

    constructor() {
        this.specificationRepository = dataSource.getRepository(Specification);
    }

    async create({
        name,
        description
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.specificationRepository.create({
            name,
            description
        });

        await this.specificationRepository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specificationRepository.findOne({
            where: {
                name: name
            }
        });

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.specificationRepository.findByIds(
            ids
        );

        return specifications;
    }
}

export { SpecificationsRepository };
