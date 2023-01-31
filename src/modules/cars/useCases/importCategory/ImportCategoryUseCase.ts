import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('PrismaCategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            const categories: IImportCategory[] = [];

            stream.pipe(parseFile);
            parseFile
                .on('data', line => {
                    const [name, description] = line;

                    categories.push({
                        name,
                        description
                    });
                })
                .on('end', () => {
                    resolve(categories);
                })
                .on('error', err => {
                    fs.promises.unlink(file.path);
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async category => {
            const { name, description } = category;

            const categoryExists = await this.categoriesRepository.findByName(
                name
            );

            if (!categoryExists) {
                this.categoriesRepository.create(category);
            }
        });
    }
}

export { ImportCategoryUseCase };
