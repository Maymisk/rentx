import { Router } from 'express';
import { UpdateCarSpecificationsController } from 'modules/cars/useCases/updateCarSpecifications/UpdateCarSpecificationsController';
import { CreateSpecificationsController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();
const createSpecificationsController = new CreateSpecificationsController();

specificationsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createSpecificationsController.handle
);

const updateCarSpecificationsController =
	new UpdateCarSpecificationsController();
specificationsRoutes.post(
	'/:id',
	ensureAuthenticated,
	ensureAdmin,
	updateCarSpecificationsController.handle
);

export { specificationsRoutes };
