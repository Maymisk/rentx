import { Car } from "../../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../useCases/createCar/CreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
    constructor(private cars: Car[] = []){}

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car()
        
        Object.assign(car, data)
        
        this.cars.push(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async findAvailable(name: string, brand: string, category_id: string): Promise<Car[]> {
        const cars = this.cars.filter(car => {
            if(
                (car.available && (
                    (name && car.name === name) ||
                    (brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id)
                )) ||
                car.available
            ) {
                return car
            }
        })
        
        return cars
    }

    async findById(car_id: string): Promise<Car> {
        const car = this.cars.find(car => car.id === car_id)

        return car
    }

    async updateAvailable(car_id: string, state: boolean): Promise<void> {
        const carIndex = this.cars.findIndex(car => car.id === car_id)

        this.cars[carIndex].available = state
    }
    
}

export {CarsRepositoryInMemory}