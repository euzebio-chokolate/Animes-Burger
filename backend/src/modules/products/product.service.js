import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ProductService = {
  async listAll() {
    // Busca todos os produtos
    return await prisma.product.findMany();
  },
};
