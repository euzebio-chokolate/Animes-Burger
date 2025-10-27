import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const produtoService = {
  async listarTudo() {
    return await prisma.produto.findMany({
      include: {categoria: true}
    });
  },

  async criar(data) {
    return await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao ?? null, 
        preco: parseFloat(data.preco),
        disponivel: data.disponivel ?? true,
        categoriaId: data.categoriaId ? Number(data.categoriaId) : null
      },
      include: { categoria: true }
    })
  }

};