/*
  Warnings:

  - You are about to alter the column `daily_rate` on the `cars` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fine_amount` on the `cars` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `rentals` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[license_plate]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `specifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driver_license]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "FKCarRental";

-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "FKUserRental";

-- DropIndex
DROP INDEX "specifications_cars_car_id_key";

-- DropIndex
DROP INDEX "specifications_cars_specification_id_key";

-- AlterTable
ALTER TABLE "cars" ALTER COLUMN "daily_rate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fine_amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "cars_images" ALTER COLUMN "car_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "specifications_cars" ALTER COLUMN "car_id" DROP NOT NULL,
ALTER COLUMN "specification_id" DROP NOT NULL;

-- DropTable
DROP TABLE "rentals";

-- CreateTable
CREATE TABLE "Rents" (
    "id" TEXT NOT NULL,
    "car_id" TEXT,
    "user_id" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "expected_return_date" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "specifications_name_key" ON "specifications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_driver_license_key" ON "users"("driver_license");

-- AddForeignKey
ALTER TABLE "Rents" ADD CONSTRAINT "FKCarRental" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Rents" ADD CONSTRAINT "FKUserRental" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE SET NULL;
