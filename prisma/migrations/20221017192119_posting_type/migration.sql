/*
  Warnings:

  - The `type` column on the `postings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "postings" DROP COLUMN "type",
ADD COLUMN     "type" VARCHAR(10) NOT NULL DEFAULT 'TRANSFER';
