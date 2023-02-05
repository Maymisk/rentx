import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UpdateCarSpecificationsController } from '../../../../modules/cars/useCases/updateCarSpecifications/UpdateCarSpecificationsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UplloadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
carsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle
);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.get('/available', listAvailableCarsController.handle);

const updateCarSpecificationsController =
	new UpdateCarSpecificationsController();
carsRoutes.post(
	'/specifications/:id',
	ensureAuthenticated,
	ensureAdmin,
	updateCarSpecificationsController.handle
);

const uploadCarImagesController = new UploadCarImageController();
carsRoutes.post(
	'/images/:id',
	ensureAuthenticated,
	ensureAdmin,
	upload.array('images'),
	uploadCarImagesController.handle
);

export { carsRoutes };
