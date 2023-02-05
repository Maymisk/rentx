import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase.ts"

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car1",
            description: "car1 description",
            daily_rate: 100,
            license_plate: "BAC-1231",
            fine_amount: 50,
            brand: "car1 brand",
            category_id: "category_id"
        })

        const cars = await listCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car2",
            description: "car2 description",
            daily_rate: 100,
            license_plate: "BAC-1231",
            fine_amount: 50,
            brand: "special test brand",
            category_id: "category_id"
        })

        const cars = await listCarsUseCase.execute({brand: car.brand})

        expect(cars).toEqual([car])
    })

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car3",
            description: "car3 description",
            daily_rate: 100,
            license_plate: "BAC-1231",
            fine_amount: 50,
            brand: "car3 brand",
            category_id: "12345"
        })

        const cars = await listCarsUseCase.execute({category_id: car.category_id})

        expect(cars).toEqual([car])
    })

    
})