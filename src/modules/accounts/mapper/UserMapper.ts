import { resolveImageURL } from '../../../utils/resolveImageURL';
import { User } from '../infra/typeorm/entities/User';
import { IUserResponse } from './IUserResponse';

class UserMapper {
	static toDTO({
		email,
		name,
		id,
		avatar,
		driver_license,
	}: User): IUserResponse {
		const user = {
			email,
			name,
			id,
			avatar,
			driver_license,
			avatar_url: avatar ? resolveImageURL(avatar, 'avatar') : null,
		};

		return user;
	}
}

export { UserMapper };
