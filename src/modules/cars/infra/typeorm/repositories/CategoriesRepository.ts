import dataSource from '@dataSource/index';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import {
    CreateCategoryDTO,
    ICategoriesRepository
} from '../../../repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = dataSource.getRepository(Category);
    }

    async create({ name, description }: CreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            name,
            description
        });

        await this.repository.save(category);

        return category;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({
            where: {
                name: name
            }
        });

        return category;
    }
}

export { CategoriesRepository };
