import { IUsersRepository } from 'modules/accounts/repositories/IUsersRespository';
import { ICreateUserDTO } from 'modules/accounts/useCases/createUser/ICreateUserDTO';
import { User } from '../../typeorm/entities/User';
import client from '@prismaClient/index';
import { Prisma, Users } from '@prisma/client';

class UsersRepository implements IUsersRepository {
    private users: Prisma.UsersDelegate<false>;

    constructor() {
        this.users = client.users;
    }

    async create(data: ICreateUserDTO): Promise<void> {
        await this.users.create({
            data
        });
    }

    async findByEmail(email: string): Promise<Users | User> {
        const user = await this.users.findUnique({
            where: {
                email: email
            }
        });

        return user;
    }

    async findById(id: string): Promise<Users | User> {
        const user = await this.users.findUnique({
            where: {
                id: id
            }
        });

        return user;
    }
}

export { UsersRepository };
