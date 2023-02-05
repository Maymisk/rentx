import dataSource from '@dataSource/index';
import { Repository } from 'typeorm';
import { IUserTokensRepository } from '../../../repositories/IUserTokensRepository';
import { ICreateRefreshTokenDTO } from '../../../useCases/refreshToken/IRefreshTokenDTO';
import { User } from '../entities/User';
import { UserToken } from '../entities/UserToken';
import { UsersRepository } from './UsersRepository';

class UserTokensRepository implements IUserTokensRepository {
	private userTokensRepository: Repository<UserToken>;

	constructor() {
		this.userTokensRepository = dataSource.getRepository(UserToken);
	}

	async create({
		user_id,
		expiration_date,
		refresh_token,
	}: ICreateRefreshTokenDTO): Promise<UserToken> {
		const userToken = this.userTokensRepository.create({
			user_id,
			expiration_date,
			refresh_token,
		});

		await this.userTokensRepository.save(userToken);
		return userToken;
	}

	async findByUserIdAndToken(
		user_id: string,
		refresh_token: string
	): Promise<UserToken> {
		const userToken = await this.userTokensRepository.findOne({
			where: { user_id, refresh_token },
		});
		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		await this.userTokensRepository.delete(id);
	}

	async findByRefreshToken(refresh_token: string): Promise<UserToken> {
		const userToken = await this.userTokensRepository.findOne({
			where: {
				refresh_token: refresh_token,
			},
		});

		return userToken;
	}
}

export { UserTokensRepository };
