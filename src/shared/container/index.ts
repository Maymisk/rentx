import 'reflect-metadata';
import { container } from 'tsyringe';

import { CategoriesRepository as TypeormCategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository as TypeormSpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { UsersRepository as TypeormUsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { RentsRepository as TypeormRentsRepository } from '../../modules/rents/infra/typeorm/repositories/RentsRepository';
import { CarsImagesRepository as TypeormCarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository as TypeormCarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { UserTokensRepository as TypeormUserTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UserTokensRepository';

import { CategoriesRepository as PrismaCategoriesRepository } from '../../modules/cars/infra/prisma/repositories/CategoriesRepository';
import { SpecificationsRepository as PrismaSpecificationsRepository } from '../../modules/cars/infra/prisma/repositories/SpecificationsRepository';
import { UsersRepository as PrismaUsersRepository } from '../../modules/accounts/infra/prisma/repositories/UsersRepository';
import { RentsRepository as PrismaRentsRepository } from '../../modules/rents/infra/prisma/repositories/RentsRepository';
import { CarsImagesRepository as PrismaCarsImagesRepository } from '../../modules/cars/infra/prisma/repositories/CarsImagesRepository';
import { CarsRepository as PrismaCarsRepository } from '../../modules/cars/infra/prisma/repositories/CarsRepository';
import { UserTokensRepository as PrismaUserTokensRepository } from '../../modules/accounts/infra/prisma/repositories/UserTokensRepository';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRespository } from '../../modules/cars/repositories/ISpecificationsRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRespository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository';
import { IRentsRepository } from '../../modules/rents/repositories/IRentsRepository';
import { IUserTokensRepository } from '../../modules/accounts/repositories/IUserTokensRepository';

// typeorm

container.registerSingleton<ICategoriesRepository>(
	'TypeormCategoriesRepository',
	TypeormCategoriesRepository
);

container.registerSingleton<ISpecificationRespository>(
	'TypeormSpecificationsRepository',
	TypeormSpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
	'TypeormUsersRepository',
	TypeormUsersRepository
);

container.registerSingleton<ICarsRepository>(
	'TypeormCarsRepository',
	TypeormCarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
	'TypeormCarsImagesRepository',
	TypeormCarsImagesRepository
);

container.registerSingleton<IRentsRepository>(
	'TypeormRentsRepository',
	TypeormRentsRepository
);

container.registerSingleton<IUserTokensRepository>(
	'TypeormUserTokensRepository',
	TypeormUserTokensRepository
);

// prisma

container.registerSingleton<ICategoriesRepository>(
	'PrismaCategoriesRepository',
	PrismaCategoriesRepository
);

container.registerSingleton<ISpecificationRespository>(
	'PrismaSpecificationsRepository',
	PrismaSpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
	'PrismaUsersRepository',
	PrismaUsersRepository
);

container.registerSingleton<ICarsRepository>(
	'PrismaCarsRepository',
	PrismaCarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
	'PrismaCarsImagesRepository',
	PrismaCarsImagesRepository
);

container.registerSingleton<IRentsRepository>(
	'PrismaRentsRepository',
	PrismaRentsRepository
);

container.registerSingleton<IUserTokensRepository>(
	'PrismaUserTokensRepository',
	PrismaUserTokensRepository
);
