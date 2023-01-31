import { Users_Tokens } from '@prisma/client';
import { User } from '../infra/typeorm/entities/User';
import { UserToken } from '../infra/typeorm/entities/UserToken';
import { ICreateRefreshTokenDTO } from '../useCases/createRefreshToken/ICreateRefreshTokenDTO';

interface IUserTokensRepository {
    create({
        user_id,
        expiration_date,
        refresh_token
    }: ICreateRefreshTokenDTO): Promise<UserToken | Users_Tokens>;

    findByUserIdAndToken(
        user_id: string,
        token: string
    ): Promise<UserToken | Users_Tokens>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(
        refresh_token: string
    ): Promise<UserToken | Users_Tokens>;
}

export { IUserTokensRepository };
