import { ICreateUserDTO } from '../../useCases/createUser/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRespository';

class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];

	async create(data: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, data);

		this.users.push(user);
	}
	async findByEmail(email: string): Promise<User> {
		const user = this.users.find(user => user.email === email);

		return user;
	}
	async findById(id: string): Promise<User> {
		const user = this.users.find(user => user.id === id);

		return user;
	}

	async updateAvatar(user_id: string, avatar: string): Promise<void> {
		const userIndex = this.users.findIndex(user => user.id === user_id);

		this.users[userIndex].avatar = avatar;
	}

	async updatePassword(user_id: string, password: string): Promise<void> {
		const userIndex = this.users.findIndex(user => user.id === user_id);

		this.users[userIndex].password = password;
	}
}

export { UsersRepositoryInMemory };
