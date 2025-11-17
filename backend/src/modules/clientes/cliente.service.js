import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const clienteService = {

  async obterPerfil(usuarioId) {
    return prisma.cliente.findUnique({
      where: { usuarioId },
      include: {
        usuario: {
          select: { id: true, nome: true, email: true }
        },
        endereco: true
      }
    });
  },

  async atualizarTelefone(usuarioId, telefone) {
    return prisma.cliente.update({
      where: { usuarioId },
      data: { telefone }
    });
  },

  async salvarEndereco(usuarioId, data) {
    const cliente = await prisma.cliente.findUnique({ where: { usuarioId } });

    if (!cliente) throw new Error("Cliente não encontrado");

    const existeEndereco = await prisma.endereco.findUnique({
      where: { clienteId: cliente.id }
    });

    if (existeEndereco) {
      return prisma.endereco.update({
        where: { clienteId: cliente.id },
        data
      });
    } else {
      return prisma.endereco.create({
        data: {
          clienteId: cliente.id,
          ...data
        }
      });
    }
  },

  async listarPedidos(usuarioId) {
    const cliente = await prisma.cliente.findUnique({ where: { usuarioId } });

    if (!cliente) throw new Error("Cliente não encontrado");

    return prisma.pedido.findMany({
      where: { clienteId: cliente.id },
      include: {
        itens: {
          include: { produto: true }
        }
      },
      orderBy: { data_hora: "desc" }
    });
  }

};
