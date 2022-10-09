/*
  Warnings:

  - You are about to alter the column `identifier` on the `tenants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - The `in` column on the `volumes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `out` column on the `volumes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `value` on the `postings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "postings" ADD COLUMN     "batchId" VARCHAR(50),
DROP COLUMN "value",
ADD COLUMN     "value" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "identifier" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "volumes" DROP COLUMN "in",
ADD COLUMN     "in" MONEY NOT NULL DEFAULT 0.00,
DROP COLUMN "out",
ADD COLUMN     "out" MONEY NOT NULL DEFAULT 0.00;
