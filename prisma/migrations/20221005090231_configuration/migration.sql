/*
  Warnings:

  - You are about to drop the `configs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "configs";

-- CreateTable
CREATE TABLE "configuration" (
    "targetId" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "configuration_targetId_key_key" ON "configuration"("targetId", "key");
