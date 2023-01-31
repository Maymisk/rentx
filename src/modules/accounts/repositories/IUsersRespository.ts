import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';
import { Users } from '@prisma/client';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User | Users>;
    findById(id: string): Promise<User | Users>;
}

export { IUsersRepository };
