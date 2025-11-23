import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const adminService = {
  
  //DASHBOARD
  async getDashboardResumo() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const vendasHoje = await prisma.pedido.aggregate({
      _sum: { valor_total: true },
      where: { data_hora: { gte: hoje } }
    });

    const pedidosHoje = await prisma.pedido.count({
      where: { data_hora: { gte: hoje } }
    });

    const maisVendidos = await prisma.itemPedido.groupBy({
      by: ["produtoId"],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: "desc" } },
      take: 5
    });

    const produtosDetalhes = await Promise.all(
      maisVendidos.map(async (item) => {
        const p = await prisma.produto.findUnique({ where: { id: item.produtoId } });
        return {
          produto: p.nome,
          quantidade: item._sum.quantidade
        };
      })
    );

    return {
      pedidosHoje,
      vendasHoje: vendasHoje._sum.valor_total ?? 0,
      maisVendidos: produtosDetalhes
    };
  },

  //PEDIDOS
  async listarPedidos() {
    return await prisma.pedido.findMany({
      orderBy: { data_hora: "desc" },
      include: {
        cliente: { include: { usuario: true } },
        itens: { include: { produto: true } }
      }
    });
  },

  async atualizarStatus(pedidoId, status) {
    return await prisma.pedido.update({
      where: { id: pedidoId },
      data: { status }
    });
  },

  //PRODUTOS
  async criarProduto(data) {
    return await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao ?? null,
        preco: parseFloat(data.preco),
        disponivel: data.disponivel === "true" || data.disponivel === true,
        categoriaId: data.categoriaId ? Number(data.categoriaId) : null,
        imagemUrl: data.imagemUrl ?? null,
        ingredientes: data.ingredientes ?? null
      },
      include: { categoria: true }
    });
  },

  async editarProduto(id, data) {
    const dadosParaAtualizar = {
      nome: data.nome,
      descricao: data.descricao ?? null,
      preco: parseFloat(data.preco), 
      disponivel: data.disponivel === "true" || data.disponivel === true, 
      categoriaId: data.categoriaId ? Number(data.categoriaId) : null,
      ingredientes: data.ingredientes ?? null
    };

    if (data.imagemUrl) {
      dadosParaAtualizar.imagemUrl = data.imagemUrl;
    }

    return await prisma.produto.update({
      where: { id: Number(id) },
      data: dadosParaAtualizar
    });
  },

  async removerProduto(id) {
    return await prisma.produto.delete({ where: { id } });
  },

  //CLIENTES
  async listarClientes() {
    return await prisma.cliente.findMany({
      include: { usuario: true }
    });
  },

  async promoverUsuario(usuarioId) {
    return await prisma.usuario.update({
      where: { id: Number(usuarioId) },
      data: { role: 'admin' }
    });
  },
  
  async rebaixarUsuario(usuarioId) {
    // (Opcional) Impedir que o usuário rebaixe a si mesmo ou o "super admin"
    // Mas para simplificar, vamos permitir a alteração direta.
    return await prisma.usuario.update({
      where: { id: Number(usuarioId) },
      data: { role: 'user' }
    });
  },

  //CATEGORIAS
  async listarCategorias() {
    return await prisma.categoria.findMany({
      orderBy: { nome: 'asc' }
    });
  },

  async criarCategoria(nome) {
    return await prisma.categoria.create({
      data: { nome }
    });
  },

  async atualizarCategoria(id, nome) {
    return await prisma.categoria.update({
      where: { id: Number(id) },
      data: { nome }
    });
  },

  async removerCategoria(id) {
    const produtos = await prisma.produto.count({
      where: { categoriaId: Number(id) }
    });

    if (produtos > 0) {
      throw new Error("Não é possível remover. Esta categoria está sendo usada por produtos.");
    }

    return await prisma.categoria.delete({
      where: { id: Number(id) }
    });
  },
};
