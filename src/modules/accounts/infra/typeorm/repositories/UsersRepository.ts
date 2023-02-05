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
		id,
	}: ICreateUserDTO): Promise<void> {
		const user = this.usersRepository.create({
			name,
			email,
			password,
			driver_license,
			id,
		});

		await this.usersRepository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.usersRepository.findOne({
			where: {
				email: email,
			},
		});
		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.usersRepository.findOne({
			where: {
				id: id,
			},
		});

		return user;
	}

	async updateAvatar(user_id: string, avatar: string): Promise<void> {
		const user = await this.usersRepository.findOne({
			where: { id: user_id },
		});

		user.avatar = avatar;

		await this.usersRepository.save(user);
	}

	async updatePassword(user_id: string, password: string): Promise<void> {
		const user = await this.usersRepository.findOne({
			where: {
				id: user_id,
			},
		});

		user.password = password;

		await this.usersRepository.save(user);
	}
}

export { UsersRepository };
