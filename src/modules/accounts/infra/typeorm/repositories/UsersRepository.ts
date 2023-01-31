import dataSource from '@dataSource/index';
import { Repository } from 'typeorm';
import { ICreateUserDTO } from '../../../useCases/createUser/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../../../repositories/IUsersRespository';

class UsersRepository implements IUsersRepository {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = dataSource.getRepository(User);
    }

    async create({
        name,
        email,
        password,
        driver_license,
        avatar,
        id
    }: ICreateUserDTO): Promise<void> {
        const user = this.usersRepository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
            id
        });

        await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            }
        });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                id: id
            }
        });

        return user;
    }
}

export { UsersRepository };
