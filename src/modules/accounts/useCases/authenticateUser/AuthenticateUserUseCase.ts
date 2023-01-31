import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRespository';

import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';
import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('PrismaUsersRepository')
        private usersRepository: IUsersRepository,
        @inject('PrismaUserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DayJsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect!');
        }

        const token = sign({}, auth.jwt_secret, {
            subject: user.id,
            expiresIn: auth.jwt_expiresIn
        });

        const refresh_token = sign({ email }, auth.refreshJWT_secret, {
            subject: user.id,
            expiresIn: auth.refreshJWT_expiresIn
        });

        const refreshTokenExpiryDate = this.dateProvider.addDays(
            auth.refreshJWT_expiresDays
        );

        await this.userTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expiration_date: refreshTokenExpiryDate
        });

        const returnObject: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        };

        return returnObject;
    }
}

export { AuthenticateUserUseCase };
