import { Router } from "express";
import { CreateRentController } from "../../../../modules/rents/useCases/createRent/CreateRentController";
import { EndRentController } from "../../../../modules/rents/useCases/endRent/EndRentController";
import { ListRentsByUserController } from "../../../../modules/rents/useCases/listRentsByUser/ListRentsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const rentsRoutes = Router()

const createRentController = new CreateRentController()
rentsRoutes.post("/", ensureAuthenticated, createRentController.handle)

const endRentController = new EndRentController()
rentsRoutes.post("/end/:id", ensureAuthenticated, endRentController.handle)

const listRentsByUserController = new ListRentsByUserController()
rentsRoutes.get('/user', ensureAuthenticated, listRentsByUserController.handle)

export {rentsRoutes}