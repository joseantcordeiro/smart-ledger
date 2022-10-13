/*
  Warnings:

  - You are about to drop the column `receipt` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "receipt",
ADD COLUMN     "status" BOOLEAN;
