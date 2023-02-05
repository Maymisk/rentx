import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';
import { sign, verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { UserToken } from '../../infra/typeorm/entities/UserToken';

interface IPayload {
	email: string;
	sub: string;
}

interface ITokenReturn {
	token: string;
	refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject('PrismaUserTokensRepository')
		private userTokensRepository: IUserTokensRepository,
		@inject('DayJsDateProvider')
		private dateProvider: IDateProvider
	) {}

	async execute(token: string): Promise<ITokenReturn> {
		const { sub } = verify(token, auth.refreshJWT_secret) as IPayload;
		const user_id = sub;

		const oldRefreshToken =
			await this.userTokensRepository.findByUserIdAndToken(
				user_id,
				token
			);

		if (!oldRefreshToken) {
			throw new AppError('Refresh token is invalid or has expired!');
		}

		const accessToken = sign({}, auth.jwt_secret, {
			subject: user_id,
			expiresIn: auth.jwt_expiresIn,
		});

		const newRefreshToken = sign({}, auth.refreshJWT_secret, {
			subject: user_id,
			expiresIn: auth.refreshJWT_expiresIn,
		});
		const newRefreshTokenExpirationDate = this.dateProvider.addDays(
			auth.refreshJWT_expiresDays
		);

		await this.userTokensRepository.deleteById(oldRefreshToken.id);

		await this.userTokensRepository.create({
			user_id,
			refresh_token: newRefreshToken,
			expiration_date: newRefreshTokenExpirationDate,
		});

		return {
			token: accessToken,
			refresh_token: newRefreshToken,
		};
	}
}

export { RefreshTokenUseCase };
