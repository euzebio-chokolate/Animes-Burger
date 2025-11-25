/*
  Warnings:

  - You are about to drop the column `deletadoEm` on the `Pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "deletadoEm";

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "deletadoEm" TIMESTAMP(3);
