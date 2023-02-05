import client from '@prismaClient/index';
import { Prisma, Users_Tokens } from '@prisma/client';
import { IUserTokensRepository } from 'modules/accounts/repositories/IUserTokensRepository';
import { ICreateRefreshTokenDTO } from 'modules/accounts/useCases/refreshToken/IRefreshTokenDTO';
import { UserToken } from '../../typeorm/entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
	private userTokens: Prisma.Users_TokensDelegate<false>;

	constructor() {
		this.userTokens = client.users_Tokens;
	}

	async create({
		user_id,
		expiration_date,
		refresh_token,
	}: ICreateRefreshTokenDTO): Promise<UserToken | Users_Tokens> {
		const userToken = await this.userTokens.create({
			data: {
				user_id,
				expiration_date,
				refresh_token,
			},
		});

		return userToken;
	}

	async findByUserIdAndToken(
		user_id: string,
		token: string
	): Promise<UserToken | Users_Tokens> {
		const userToken = await this.userTokens.findFirst({
			where: {
				user_id,
				refresh_token: token,
			},
		});

		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		await this.userTokens.delete({
			where: {
				id,
			},
		});
	}

	async findByRefreshToken(
		refresh_token: string
	): Promise<UserToken | Users_Tokens> {
		const userToken = await this.userTokens.findFirst({
			where: {
				refresh_token,
			},
		});

		return userToken;
	}
}

export { UserTokensRepository };
