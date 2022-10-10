/*
  Warnings:

  - You are about to alter the column `value` on the `postings` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `in` on the `volumes` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `out` on the `volumes` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "postings" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "volumes" ALTER COLUMN "in" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "out" SET DATA TYPE DECIMAL(65,30);
