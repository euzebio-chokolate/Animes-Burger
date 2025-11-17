/*
  Warnings:

  - You are about to drop the `ComposicaoProduto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingrediente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ComposicaoProduto" DROP CONSTRAINT "ComposicaoProduto_ingredienteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ComposicaoProduto" DROP CONSTRAINT "ComposicaoProduto_produtoId_fkey";

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "ingredientes" TEXT;

-- DropTable
DROP TABLE "public"."ComposicaoProduto";

-- DropTable
DROP TABLE "public"."Ingrediente";
