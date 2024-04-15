-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dateOfPurchase" TIMESTAMP(3) NOT NULL,
    "purchaserName" TEXT NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "extraAgreements" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "invoiceNumber" ON "invoices"("invoiceNumber");

-- CreateIndex
CREATE INDEX "email" ON "invoices"("email");

-- CreateIndex
CREATE INDEX "purchaserName" ON "invoices"("purchaserName");
