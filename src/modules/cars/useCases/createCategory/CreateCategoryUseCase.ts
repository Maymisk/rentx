import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Category } from '../../infra/typeorm/entities/Category';
import { Categories } from '@prisma/client';

interface IRequest {
	name: string;
	description: string;
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('PrismaCategoriesRepository')
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute({
		name,
		description,
	}: IRequest): Promise<Category | Categories> {
		const categoryExists = await this.categoriesRepository.findByName(name);

		if (categoryExists) {
			throw new AppError('This category already exists!');
		}

		const category = await this.categoriesRepository.create({
			name,
			description,
		});

		return category;
	}
}

export { CreateCategoryUseCase };
