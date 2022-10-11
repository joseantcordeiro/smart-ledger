/*
  Warnings:

  - You are about to alter the column `value` on the `postings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "batches" ADD COLUMN     "counter" SMALLINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "postings" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);
