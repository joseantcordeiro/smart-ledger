/*
  Warnings:

  - You are about to drop the column `ownerAcc` on the `assets` table. All the data in the column will be lost.
  - Added the required column `owner` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" DROP COLUMN "ownerAcc",
ADD COLUMN     "owner" VARCHAR(50) NOT NULL;
