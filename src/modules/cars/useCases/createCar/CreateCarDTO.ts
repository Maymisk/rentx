import { Specifications_Cars } from '@prisma/client';
import { Specification } from '../../infra/typeorm/entities/Specification';

interface ICreateCarDTO {
    name: string;

    description: string;

    daily_rate: number;

    license_plate: string;

    fine_amount: number;

    brand: string;

    category_id: string;

    specifications?: Specification[] | Specifications_Cars[];

    id?: string;
}

export { ICreateCarDTO };
