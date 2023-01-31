import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRespository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationRespository {
    specificationsRepository: Specification[] = []
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
          const specification = new Specification()

          Object.assign(specification, {
              name, description
          })

          this.specificationsRepository.push(specification)

          return specification
    }

    async findByName(name: string): Promise<Specification> {
       const specification = this.specificationsRepository.find(specification => specification.name === name)

       return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specificationsRepository.filter(specification => ids.includes(specification.id))
        
        return specifications
    }
}

export {SpecificationRepositoryInMemory}