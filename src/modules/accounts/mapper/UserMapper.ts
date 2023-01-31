import 'reflect-metadata';

import { IUserResponse } from './IUserResponse';

import { classToClassFromExist } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import { Users } from '@prisma/client';

class UserMapper {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url
    }: IUserResponse): IUserResponse {
        const user = classToClassFromExist(
            {
                email,
                name,
                id,
                avatar,
                driver_license,
                avatar_url
            },
            {}
        );

        return user as Users | User;
    }
}

export { UserMapper };
