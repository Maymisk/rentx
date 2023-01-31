import { container } from "tsyringe"
import { IDateProvider } from "./DateProvider/IDateProvider"
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider"
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider"
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider"

container.registerSingleton<IDateProvider>("DayJsDateProvider", DayJsDateProvider)

const disk = {
    local: LocalStorageProvider,
    S3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>("StorageProvider", disk[process.env.disk])