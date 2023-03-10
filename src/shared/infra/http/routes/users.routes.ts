import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UserProfileController } from '../../../../modules/accounts/useCases/userProfile/UserProfileController';

const usersRoutes = Router();

const { storage, tmpFolder } = uploadConfig;
const uploadAvatar = multer({
	dest: tmpFolder + '/avatar',
	storage,
});

const createUserController = new CreateUserController();
usersRoutes.post('/', createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch(
	'/avatar',
	ensureAuthenticated,
	uploadAvatar.single('avatar'),
	updateUserAvatarController.handle
);

const userProfileController = new UserProfileController();
usersRoutes.get('/profile', ensureAuthenticated, userProfileController.handle);

export { usersRoutes };
