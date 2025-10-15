import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const clienteService = {
    async listarTudo(){
        return await prisma.cliente.findMany();
    },

    async criar(data) {
        return await prisma.cliente.criar({
            data: {
                nome: data.nome,
                telefone: data.telefone,
                email: data.email ?? null
            }
        })
    }
}