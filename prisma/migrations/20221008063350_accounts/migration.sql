/*
  Warnings:

  - You are about to alter the column `name` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.
  - You are about to alter the column `name` on the `assets` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(20)`.
  - You are about to alter the column `symbol` on the `assets` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(4)`.
  - You are about to alter the column `ownerAcc` on the `assets` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.
  - You are about to alter the column `targetId` on the `configuration` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.
  - You are about to alter the column `key` on the `configuration` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.
  - You are about to alter the column `value` on the `configuration` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(100)`.
  - You are about to alter the column `targetId` on the `metadata` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.
  - You are about to alter the column `key` on the `metadata` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(50)`.
  - You are about to alter the column `value` on the `metadata` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "assets" ALTER COLUMN "name" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "symbol" SET DATA TYPE VARCHAR(4),
ALTER COLUMN "ownerAcc" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "configuration" ALTER COLUMN "targetId" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "key" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "value" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "metadata" ALTER COLUMN "targetId" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "key" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "value" SET DATA TYPE VARCHAR(100);
