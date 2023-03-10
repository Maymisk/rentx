import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRespository';

interface IRequest {
	id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject('PrismaUsersRepository')
		private usersRepository: IUsersRepository,
		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}

	async execute({ id, avatar_file }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(id);

		if (user.avatar) {
			await this.storageProvider.delete(user.avatar, 'avatar');
		}

		await this.storageProvider.save(avatar_file, 'avatar');

		await this.usersRepository.updateAvatar(user.id, avatar_file);
	}
}

export { UpdateUserAvatarUseCase };
