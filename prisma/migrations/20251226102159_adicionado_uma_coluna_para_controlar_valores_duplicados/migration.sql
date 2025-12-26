/*
  Warnings:

  - A unique constraint covering the columns `[tripId]` on the table `location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "tripId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "location_tripId_key" ON "location"("tripId");
