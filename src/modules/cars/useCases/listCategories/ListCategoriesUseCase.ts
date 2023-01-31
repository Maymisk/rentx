import { Categories } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoryUseCase {
    constructor(
        @inject('PrismaCategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[] | Categories[]> {
        const categoriesList = await this.categoriesRepository.list();
        return categoriesList;
    }
}

export { ListCategoryUseCase };
