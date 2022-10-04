-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "accounts";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ledgers";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tenants";

-- CreateTable
CREATE TABLE "tenants"."tenants" (
    "id" VARCHAR(50) NOT NULL,
    "identifier" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "timezone_id" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants"."timezones" (
    "id" SMALLSERIAL NOT NULL,
    "value" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(10) NOT NULL,
    "offset" DOUBLE PRECISION NOT NULL,
    "isdst" BOOLEAN NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "utc" TEXT[],

    CONSTRAINT "timezones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledgers"."ledgers" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "volumeIn" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "volumeOut" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "tenantId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledgers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledgers"."configs" (
    "ledger" VARCHAR(50) NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "value" VARCHAR(100) NOT NULL
);

-- CreateTable
CREATE TABLE "tenants"."countries" (
    "code" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "comments" VARCHAR(150) NOT NULL
);

-- CreateTable
CREATE TABLE "accounts"."accounts" (
    "address" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "volumeIn" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "volumeOut" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "ledgerId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "accounts"."metadata" (
    "account" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "configs_ledger_key_key" ON "ledgers"."configs"("ledger", "key");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "tenants"."countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_address_key" ON "accounts"."accounts"("address");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_name_key" ON "accounts"."accounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_account_key_key" ON "accounts"."metadata"("account", "key");

-- AddForeignKey
ALTER TABLE "tenants"."tenants" ADD CONSTRAINT "tenants_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "tenants"."countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants"."tenants" ADD CONSTRAINT "tenants_timezone_id_fkey" FOREIGN KEY ("timezone_id") REFERENCES "tenants"."timezones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledgers"."ledgers" ADD CONSTRAINT "ledgers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"."tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts"."accounts" ADD CONSTRAINT "accounts_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "ledgers"."ledgers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts"."metadata" ADD CONSTRAINT "metadata_account_fkey" FOREIGN KEY ("account") REFERENCES "accounts"."accounts"("name") ON DELETE CASCADE ON UPDATE CASCADE;
