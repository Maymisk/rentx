import { Rent } from "../../infra/typeorm/entities/Rent";
import { ICreateRentDTO } from '../../useCases/createRent/CreateRentDTO';
import { IRentsRepository } from "../IRentsRepository";

 

 class RentsRepositoryInMemory implements IRentsRepository {
     private rentsRepository: Rent[] = []

     async create({ user_id, car_id, expected_return_date }: ICreateRentDTO): Promise<Rent> {
         const rent = new Rent()

         Object.assign(rent, {
             user_id, 
             car_id, 
             expected_return_date,
             start_date: new Date()
         })

         this.rentsRepository.push(rent)

         return rent
     }

     async findOpenRentByCar(car_id: string): Promise<Rent> {
         return this.rentsRepository.find(rent => rent.car_id === car_id && !rent.end_date)
     }

     async findOpenRentByUser(user_id: string): Promise<Rent> {
         return this.rentsRepository.find(rent => rent.user_id === user_id && !rent.end_date)
     }

    async findById(rent_id: string): Promise<Rent> {
        const rent = this.rentsRepository.find(rent => rent.id === rent_id)
        
        return rent
    }

    async findByUser(user_id: string): Promise<Rent[]> {
        const rents = this.rentsRepository.filter(rent => rent.user_id === user_id )

        return rents
    }
   

 }

export {RentsRepositoryInMemory}