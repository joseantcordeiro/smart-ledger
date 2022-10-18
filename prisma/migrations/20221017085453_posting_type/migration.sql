-- CreateEnum
CREATE TYPE "postingType" AS ENUM ('TRANSFER', 'DEPOSIT', 'WITHDRAWAL');

-- AlterTable
ALTER TABLE "postings" ADD COLUMN     "type" "postingType" NOT NULL DEFAULT 'TRANSFER';
