-- CreateTable
CREATE TABLE "tenants" (
    "id" VARCHAR(50) NOT NULL,
    "identifier" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "timezoneId" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timezones" (
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
CREATE TABLE "ledgers" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "tenantId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledgers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configs" (
    "ledger" VARCHAR(50) NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "value" VARCHAR(100) NOT NULL
);

-- CreateTable
CREATE TABLE "countries" (
    "code" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "comments" VARCHAR(150) NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "address" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "ledgerId" VARCHAR(50) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "metadata" (
    "targetId" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "assets" (
    "contract" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "symbol" VARCHAR NOT NULL,
    "ownerAcc" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "volumes" (
    "account" VARCHAR(50) NOT NULL,
    "asset" VARCHAR(10) NOT NULL,
    "in" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "out" DOUBLE PRECISION NOT NULL DEFAULT 0.00
);

-- CreateIndex
CREATE UNIQUE INDEX "configs_ledger_key_key" ON "configs"("ledger", "key");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_address_key" ON "accounts"("address");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_name_ledgerId_key" ON "accounts"("name", "ledgerId");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_targetId_key_key" ON "metadata"("targetId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "assets_contract_key" ON "assets"("contract");

-- CreateIndex
CREATE UNIQUE INDEX "volumes_account_asset_key" ON "volumes"("account", "asset");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_timezoneId_fkey" FOREIGN KEY ("timezoneId") REFERENCES "timezones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledgers" ADD CONSTRAINT "ledgers_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "ledgers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
