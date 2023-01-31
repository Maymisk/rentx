import { inject, injectable } from 'tsyringe';

import { UserMapper } from '../../mapper/UserMapper';

import { IUserResponse } from '../../mapper/IUserResponse';
import { IUsersRepository } from '../../repositories/IUsersRespository';

@injectable()
class UserProfileUseCase {
    constructor(
        @inject('TypeormUsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute(user_id: string): Promise<IUserResponse> {
        const user = await this.usersRepository.findById(user_id);
        return UserMapper.toDTO(user);
    }
}

export { UserProfileUseCase };
