import dayjs from "dayjs"
import { DayJsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayJsDateProvider"

import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentsRepositoryInMemory } from "../../repositories/inMemory/RentsRepositoryInMemory"
import { CreateRentUseCase } from "./CreateRentUseCase"

let rentsRepositoryInMemory: RentsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory

let createRentUseCase: CreateRentUseCase
let dayJsDateProvider: DayJsDateProvider

const add24Hours = dayjs().add(1, 'day').toDate()

describe("Create rent", () => {

    beforeEach(() => {
        rentsRepositoryInMemory = new RentsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        dayJsDateProvider = new DayJsDateProvider()
        createRentUseCase = new CreateRentUseCase(rentsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory)
    })

    it("Should be able to create a new rent", async () => {
        await carsRepositoryInMemory.create({
            id: "121212",
            brand: "some brand",
            description: "cool car",
            daily_rate: 100,
            fine_amount: 50,
            license_plate: "cool plate",
            name: "test car",
            category_id: "some category"
        })

        const rent = await createRentUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: add24Hours
        })

        expect(rent).toHaveProperty("id")
        expect(rent).toHaveProperty("start_date")
    })

    it("Shouldn't be able to create a new rent if the user already has an active rent", async () => {
        await rentsRepositoryInMemory.create({
            user_id: '0000',
            car_id: '123131',
            expected_return_date: add24Hours
        })

        await expect(
            createRentUseCase.execute({
                user_id: "0000",
                car_id: "11111",
                expected_return_date: add24Hours
            })
        ).rejects.toEqual(new AppError("This user already has a rented car!"))
    })

    it("Shouldn't be able to create a new rent if the car isn't available", async () => {
        
        await carsRepositoryInMemory.create({
            id: "4444",
            brand: "whatever",
            description: "nice car",
            daily_rate: 100,
            fine_amount: 50,
            license_plate: "test plate",
            name: "test car",
            category_id: "some category"
        })

        await createRentUseCase.execute({
            user_id: "0000",
            car_id: "4444",
            expected_return_date: add24Hours
        })

        await expect(
            createRentUseCase.execute({
                user_id: "2222",
                car_id: "4444",
                expected_return_date: add24Hours
            })
        ).rejects.toEqual(new AppError("This car is not available for rent!"))
    })

    it("Shouldn't be able to create a rent with expected return time smaller than 24 hours", async () => {
        await expect(
            createRentUseCase.execute({
                user_id: "121212",
                car_id: "131313",
                expected_return_date: dayJsDateProvider.dateNow()
            })
        ).rejects.toEqual(new AppError("The minimum rent time is 24 hours!"))
    })
})