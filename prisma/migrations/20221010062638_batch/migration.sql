/*
  Warnings:

  - Made the column `batchId` on table `postings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "postings" ALTER COLUMN "batchId" SET NOT NULL;
