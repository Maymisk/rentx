import { Categories } from '@prisma/client';
import { Category } from '../infra/typeorm/entities/Category';

interface CreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({
        name,
        description
    }: CreateCategoryDTO): Promise<Category | Categories>;
    list(): Promise<Category[] | Categories[]>;
    findByName(name: string): Promise<Category | Categories>;
}

export { ICategoriesRepository, CreateCategoryDTO };
