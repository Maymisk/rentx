import {Router} from 'express'
import { CreateSpecificationsController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const specificationsRoutes = Router()
const specificationsController = new CreateSpecificationsController()

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, specificationsController.handle)

export {specificationsRoutes}