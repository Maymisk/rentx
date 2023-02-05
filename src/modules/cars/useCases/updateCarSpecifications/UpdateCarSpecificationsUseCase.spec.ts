import { AppError } from '../../../../shared/errors/AppError';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpecificationsRepository';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { UpdateCarSpecificationUseCase } from './UpdateCarSpecificationsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let updateCarSpecificationUseCase: UpdateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory =
			new SpecificationRepositoryInMemory();
		updateCarSpecificationUseCase = new UpdateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);
	});

	it('Should be able to add a new specification to the car', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'test name',
			description: 'whatever description',
			daily_rate: 100,
			license_plate: 'XXX-0000',
			fine_amount: 60,
			brand: 'brand nubian',
			category_id: 'category_id',
		});

		const specification = await specificationsRepositoryInMemory.create({
			name: 'test specification name',
			description: 'test specification description',
		});

		const specification_ids = [specification.id];

		await updateCarSpecificationUseCase.execute({
			car_id: car.id,
			specification_ids,
		});
	});

	it("Should not be able to update a non-existing car's specifications", async () => {
		const car_id = '1234';
		const specification_ids = ['54321'];
		await expect(
			updateCarSpecificationUseCase.execute({ car_id, specification_ids })
		).rejects.toBeInstanceOf(AppError);
	});
});
