import { Router } from "express";
import multer from "multer";
import uploadConfig from '../../../../config/upload'
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { CreateListAvailableCarsController } from "../../../../modules/cars/useCases/listCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UplloadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";



const carsRoutes = Router()

const upload = multer(uploadConfig)

const createCarController = new CreateCarController()
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

const createListAvailableCarsController = new CreateListAvailableCarsController()
carsRoutes.get('/available', createListAvailableCarsController.handle)

const createCarSpecificationController = new CreateCarSpecificationController()
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

const uploadCarImagesController = new UploadCarImageController()
carsRoutes.post('/images', ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)

export {carsRoutes}