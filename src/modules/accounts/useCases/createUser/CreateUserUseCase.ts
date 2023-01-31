import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from './ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRespository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('PrismaUsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError('An user with this email already exists!');
        }

        const hashPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
            driver_license
        });
    }
}

export { CreateUserUseCase };
