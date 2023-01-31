import { Categories } from '@prisma/client';
import {
    CreateCategoryDTO,
    ICategoriesRepository
} from 'modules/cars/repositories/ICategoriesRepository';
import { Category } from '../../typeorm/entities/Category';
import { Prisma } from '@prisma/client';
import client from '@prismaClient/index';

class CategoriesRepository implements ICategoriesRepository {
    private categories: Prisma.CategoriesDelegate<false>;

    constructor() {
        this.categories = client.categories;
    }

    async create({
        name,
        description
    }: CreateCategoryDTO): Promise<Category | Categories> {
        const category = await this.categories.create({
            data: {
                name,
                description
            }
        });

        return category;
    }

    async list(): Promise<Category[] | Categories[]> {
        const categories = await this.categories.findMany();

        return categories;
    }

    async findByName(name: string): Promise<Category | Categories> {
        const category = await this.categories.findUnique({
            where: {
                name
            }
        });

        return category;
    }
}

export { CategoriesRepository };
