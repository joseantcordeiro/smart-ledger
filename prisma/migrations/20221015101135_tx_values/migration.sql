/*
  Warnings:

  - You are about to alter the column `value` on the `postings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `in` on the `volumes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `out` on the `volumes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Made the column `status` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "postings" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "volumes" ALTER COLUMN "in" DROP DEFAULT,
ALTER COLUMN "in" SET DATA TYPE INTEGER,
ALTER COLUMN "out" DROP DEFAULT,
ALTER COLUMN "out" SET DATA TYPE INTEGER;
