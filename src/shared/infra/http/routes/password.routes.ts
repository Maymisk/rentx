import { Router } from "express";
import { ResetUserPasswordController } from "../../../../modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendPasswordMailController } from "../../../../modules/accounts/useCases/sendPasswordMail/SendPasswordMailController";

const passwordRoutes = Router()

const sendPasswordMailController = new SendPasswordMailController()
passwordRoutes.post("/forgot", sendPasswordMailController.handle)

const resetUserPasswordController = new ResetUserPasswordController()
passwordRoutes.post("/reset", resetUserPasswordController.handle)

export { passwordRoutes }