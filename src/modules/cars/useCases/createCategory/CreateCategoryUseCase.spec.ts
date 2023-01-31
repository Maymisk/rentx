import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()    
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: "category test",
            description: "category description test"
        }

        await createCategoryUseCase.execute(category)

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id")
    })

    it("Should not be able to create a new category with an already existing name", async () => { 
        const category = {
            name: "category test",
            description: "category description test"
        }

        await createCategoryUseCase.execute(category)
        await expect(
            createCategoryUseCase.execute(category)
        ).rejects.toEqual(new AppError("This category already exists!"))
    })


})