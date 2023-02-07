import { Rents } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { Rent } from '../../infra/typeorm/entities/Rent';
import { IRentsRepository } from '../../repositories/IRentsRepository';

@injectable()
class ListRentByUserUseCase {
	constructor(
		@inject('PrismaRentsRepository')
		private rentsRepository: IRentsRepository
	) {}

	async execute(user_id: string): Promise<Rent[] | Rents[]> {
		const rents = await this.rentsRepository.findByUser(user_id);

		return rents;
	}
}

export { ListRentByUserUseCase };
