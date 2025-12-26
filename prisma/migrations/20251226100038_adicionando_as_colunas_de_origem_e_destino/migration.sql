/*
  Warnings:

  - Added the required column `destino` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origem` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "destino" TEXT NOT NULL,
ADD COLUMN     "origem" TEXT NOT NULL;
