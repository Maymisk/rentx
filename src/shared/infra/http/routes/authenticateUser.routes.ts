import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateRefreshTokenController } from "../../../../modules/accounts/useCases/createRefreshToken/CreateRefreshTokenController";

const authenticationRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
authenticationRoutes.post('/session', authenticateUserController.handle)

const createRefreshTokenController = new CreateRefreshTokenController()
authenticationRoutes.post("/refresh-token", createRefreshTokenController.handle)
export { authenticationRoutes }