import {
	ICreateSpecificationDTO,
	ISpecificationRespository,
} from 'modules/cars/repositories/ISpecificationsRepository';
import { Prisma, Specifications } from '@prisma/client';
import client from '@prismaClient/index';
import { Specification } from '../../typeorm/entities/Specification';

class SpecificationsRepository implements ISpecificationRespository {
	private specifications: Prisma.SpecificationsDelegate<false>;

	constructor() {
		this.specifications = client.specifications;
	}
	async create({
		name,
		description,
	}: ICreateSpecificationDTO): Promise<Specification | Specifications> {
		const specification = await this.specifications.create({
			data: {
				name,
				description,
			},
		});

		return specification;
	}

	async findByName(name: string): Promise<Specification | Specifications> {
		const specification = await this.specifications.findUnique({
			where: {
				name,
			},
		});

		return specification;
	}

	async findByIds(
		ids: string[]
	): Promise<Specification[] | Specifications[]> {
		const specifications = await this.specifications.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		return specifications;
	}
}

export { SpecificationsRepository };
