-- CreateTable
CREATE TABLE "Destaque" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Destaque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destaque_produtoId_key" ON "Destaque"("produtoId");

-- AddForeignKey
ALTER TABLE "Destaque" ADD CONSTRAINT "Destaque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
