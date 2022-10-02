-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "accounts";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tenants";

-- CreateTable
CREATE TABLE "tenants"."tenants" (
    "id" TEXT NOT NULL,
    "identifier" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timezone_id" INTEGER NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants"."timezones" (
    "id" SMALLSERIAL NOT NULL,
    "value" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(10) NOT NULL,
    "offset" FLOAT4 NOT NULL,
    "isdst" BOOLEAN NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "utc" TEXT[],

    CONSTRAINT "timezones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants"."countries" (
    "country_code" VARCHAR(2) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "comments" VARCHAR(150) NOT NULL
);

-- CreateTable
CREATE TABLE "accounts"."accounts" (
    "address" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "accounts"."metadata" (
    "account" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_code_key" ON "tenants"."countries"("country_code");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_address_key" ON "accounts"."accounts"("address");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_name_key" ON "accounts"."accounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_account_key_key" ON "accounts"."metadata"("account", "key");

-- AddForeignKey
ALTER TABLE "tenants"."tenants" ADD CONSTRAINT "tenants_timezone_id_fkey" FOREIGN KEY ("timezone_id") REFERENCES "tenants"."timezones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenants"."tenants" ADD CONSTRAINT "tenants_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "tenants"."countries"("country_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts"."metadata" ADD CONSTRAINT "metadata_account_fkey" FOREIGN KEY ("account") REFERENCES "accounts"."accounts"("name") ON DELETE CASCADE ON UPDATE CASCADE;
