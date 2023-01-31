import { Specifications } from '@prisma/client';
import { Specification } from '../../cars/infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRespository {
    create({
        name,
        description
    }: ICreateSpecificationDTO): Promise<Specification | Specifications>;
    findByName(name: string): Promise<Specification | Specifications>;
    findByIds(ids: string[]): Promise<Specification[] | Specifications[]>;
}

export { ISpecificationRespository, ICreateSpecificationDTO };
