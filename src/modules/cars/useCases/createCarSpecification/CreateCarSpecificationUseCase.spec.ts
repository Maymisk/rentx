import { AppError } from '../../../../shared/errors/AppError';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpecificationsRepository';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
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
            category_id: 'category_id'
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: 'test specification name',
            description: 'test specification description'
        });

        const specifications_id = [specification.id];

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });
    });

    it('Should not be able to add a new specification to a non-existing car', async () => {
        const car_id = '1234';
        const specifications_id = ['54321'];
        await expect(
            createCarSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toBeInstanceOf(AppError);
    });
});
