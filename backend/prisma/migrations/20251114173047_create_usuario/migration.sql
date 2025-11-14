/*
  Warnings:

  - You are about to drop the column `data_cadastro` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Cliente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "data_cadastro",
DROP COLUMN "email",
DROP COLUMN "nome",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usuarioId_key" ON "Cliente"("usuarioId");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
