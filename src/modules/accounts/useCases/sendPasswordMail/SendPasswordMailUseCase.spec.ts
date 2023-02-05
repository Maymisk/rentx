import { DayJsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayJsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/provider/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '../../repositories/in-memory/UserTokensRepositoryInMemory';
import { SendPasswordMailUseCase } from './SendPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepository: UserTokensRepositoryInMemory;

let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

let sendPasswordMailUseCase: SendPasswordMailUseCase;

describe('Send password mail use case', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		userTokensRepository = new UserTokensRepositoryInMemory();

		dateProvider = new DayJsDateProvider();
		mailProvider = new MailProviderInMemory();

		sendPasswordMailUseCase = new SendPasswordMailUseCase(
			usersRepositoryInMemory,
			userTokensRepository,
			dateProvider,
			mailProvider
		);
	});

	it('Should be able to send a password redefinition email to an user', async () => {
		const sendMail = jest.spyOn(mailProvider, 'sendMail');

		await usersRepositoryInMemory.create({
			name: 'Hunter Jackson',
			email: 'vo@vov.cx',
			driver_license: '653944',
			password: '1234',
		});

		await sendPasswordMailUseCase.execute('vo@vov.cx');

		expect(sendMail).toHaveBeenCalled();
	});

	it("Shouldn't be able to send an email to a nonexistent user", async () => {
		await expect(
			sendPasswordMailUseCase.execute('some@email.com')
		).rejects.toEqual(new AppError("This user doesn't exist!"));
	});

	it('Should create a new link access token to the user upon sending the email', async () => {
		const createToken = jest.spyOn(userTokensRepository, 'create');

		await usersRepositoryInMemory.create({
			name: 'Jose Murray',
			email: 'cema@mubfak.pe',
			driver_license: '795831',
			password: '1234',
		});

		await sendPasswordMailUseCase.execute('cema@mubfak.pe');

		expect(createToken).toHaveBeenCalled();
	});
});
