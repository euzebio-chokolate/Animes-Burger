import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const produtoService = {
  async listarTudo() {
    return await prisma.produto.findMany({
      where: { 
        deletadoEm: null
      },
      include: {
        categoria: true
      }
    });
  },

  async criar(data) {
    return await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao ?? null, 
        preco: parseFloat(data.preco),
        disponivel: data.disponivel === "true" || data.disponivel === true ? true : false,
        categoriaId: data.categoriaId ? Number(data.categoriaId) : null,
        imagemUrl: data.imagemUrl ?? null,
        ingredientes: data.ingredientes ?? null
      },
      include: { categoria: true }
    })
  }

};