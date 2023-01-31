import { inject, injectable, injectWithTransform } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRespository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';

import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetUserPasswordUseCase {
    constructor(
        @inject('PrismaUsersRepository')
        private usersRepository: IUsersRepository,
        @inject('PrismaUserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DayJsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({ token, password }: IRequest) {
        const userToken = await this.userTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError('Invalid token!');
        }

        const now = this.dateProvider.dateNow();

        if (this.dateProvider.checkIfBefore(userToken.expiration_date, now)) {
            throw new AppError('Your link has expired');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.userTokensRepository.deleteById(userToken.id);
    }
}

export { ResetUserPasswordUseCase };
