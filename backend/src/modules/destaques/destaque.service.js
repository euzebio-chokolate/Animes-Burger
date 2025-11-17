import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const destaqueService = {
  async listar() {
    return await prisma.destaque.findMany({
      include: { produto: true },
    });
  },

  async adicionar(produtoId) {
    const total = await prisma.destaque.count();
    if (total >= 3) {
      throw new Error("Limite de 3 destaques atingido.");
    }

    const existe = await prisma.destaque.findUnique({
      where: { produtoId: Number(produtoId) }
    });

    if (existe) throw new Error("Este produto já é um destaque.");

    return await prisma.destaque.create({
      data: {
        produtoId: Number(produtoId)
      }
    });
  },

  async remover(produtoId) {
    return await prisma.destaque.delete({
      where: { produtoId: Number(produtoId) }
    });
  }
};
