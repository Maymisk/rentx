import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../createUser/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { UserTokensRepositoryInMemory } from '../../repositories/in-memory/UserTokensRepositoryInMemory';
import { DayJsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayJsDateProvider';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('Should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'Test name',
            password: '1234',
            email: 'test@test.com',
            driver_license: '000123'
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute(user);

        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('refresh_token');
    });

    it("Shouldn't be able to authenticate a nonexisting user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '348348'
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });

    it("Shouldn't be able to authenticate with incorrect password or email", async () => {
        const user: ICreateUserDTO = {
            name: 'test name',
            password: '81401840104',
            email: 'anothertest@email.com',
            driver_license: '2814018'
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
});
