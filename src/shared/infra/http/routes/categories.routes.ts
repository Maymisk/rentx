import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { extname } from 'path';

const categoriesRoutes = Router();

const upload = multer({
	dest: './tmp',
	fileFilter(req, file, callback) {
		const extension = extname(file.originalname);

		if (extension === '.csv') {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
});

// Create category
const createCategoryController = new CreateCategoryController();
categoriesRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createCategoryController.handle
);

// list all categories
const listCategoriesController = new ListCategoryController();
categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);

// Import categories from a file
const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
	'/import',
	ensureAuthenticated,
	ensureAdmin,
	upload.single('file'),
	importCategoryController.handle
);

export { categoriesRoutes };
