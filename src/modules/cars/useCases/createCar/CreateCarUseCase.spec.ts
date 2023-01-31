import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: ICarsRepository;

describe("Create car", () => {

    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carRepositoryInMemory)
    })

    it("Should be able to create a new car", async () => {

        await createCarUseCase.execute({
            name: "Test name", 
            description: "test description",
            daily_rate: 100,
            license_plate: "FSA-2131",
            fine_amount: 60,
            brand: "test brand",
            category_id: "category"
        })
    })

    it("Shouldn't be able to create a car with an already registered license plate", async () => {
        await createCarUseCase.execute({
            name: "random name",
            description: "random description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            brand: "random brand",
            category_id: "random category"
        })

        await expect(createCarUseCase.execute({
                name: "another random name",
                description: "another random description",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 10,
                brand: "random brand",
                category_id: "random category"
            })
        ).rejects.toEqual(new AppError('A car with this license plate already exists!'))
    })

    it("Should have availability as true upon car creation", async () => {
        const car = await createCarUseCase.execute({
        name: "nice name",
        description: "nice description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "nice brand",
        category_id: "nice category"
        })

        expect(car.available).toBe(true)
    })
})