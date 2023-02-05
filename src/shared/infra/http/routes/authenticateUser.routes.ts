import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticationRoutes.post('/session', authenticateUserController.handle);

const createRefreshTokenController = new RefreshTokenController();
authenticationRoutes.post(
	'/refresh-token',
	createRefreshTokenController.handle
);
export { authenticationRoutes };
