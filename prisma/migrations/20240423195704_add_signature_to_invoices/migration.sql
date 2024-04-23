/*
  Warnings:

  - You are about to drop the column `type` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `bikeTypeId` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "type",
ADD COLUMN     "bikeTypeId" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "bike_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bike_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_bikeTypeId_fkey" FOREIGN KEY ("bikeTypeId") REFERENCES "bike_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
