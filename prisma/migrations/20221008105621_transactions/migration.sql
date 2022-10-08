-- CreateEnum
CREATE TYPE "batchStatus" AS ENUM ('CREATED', 'FINISHED', 'PROCESSING');

-- CreateTable
CREATE TABLE "batches" (
    "id" VARCHAR(50) NOT NULL,
    "postings" JSONB NOT NULL,
    "status" "batchStatus" NOT NULL DEFAULT 'CREATED',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ledgerId" VARCHAR(50) NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postings" (
    "id" VARCHAR(50) NOT NULL,
    "source" VARCHAR(50) NOT NULL,
    "destination" VARCHAR(50) NOT NULL,
    "asset" VARCHAR(4) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "txId" VARCHAR(50),
    "ledgerId" VARCHAR(50) NOT NULL,

    CONSTRAINT "postings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" VARCHAR(50) NOT NULL,
    "hash" VARCHAR NOT NULL,
    "receipt" VARCHAR NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ledgerId" VARCHAR(50) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
