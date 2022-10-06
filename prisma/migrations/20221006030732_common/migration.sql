/*
  Warnings:

  - You are about to drop the column `active` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ledgerId,symbol]` on the table `assets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ledgerId` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'SUSPEND', 'BANNED', 'DELETED');

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "active",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "ledgerId" VARCHAR(50) NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "assets_ledgerId_symbol_key" ON "assets"("ledgerId", "symbol");

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "ledgers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
