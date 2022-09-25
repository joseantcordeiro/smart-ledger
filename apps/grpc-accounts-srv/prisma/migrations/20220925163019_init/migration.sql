-- CreateTable
CREATE TABLE "accounts" (
    "address" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "metadata" (
    "account" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_address_key" ON "accounts"("address");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_name_key" ON "accounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "metadata_account_key_key" ON "metadata"("account", "key");

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_account_fkey" FOREIGN KEY ("account") REFERENCES "accounts"("name") ON DELETE CASCADE ON UPDATE CASCADE;
