import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CategoriaService = {
    async listarTudo() {
        return await prisma.categoria.findMany();
    }, 

    async criar(data) {
        return await prisma.categoria.create({
            data: {
                nome: data.nome
            }
        })
    }
}