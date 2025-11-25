import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const adminService = {
  
  //DASHBOARD
  async getDashboardResumo() {
    const agora = new Date();

    const inicioHoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const inicioAno = new Date(agora.getFullYear(), 0, 1);

    const [
      vendasHoje, pedidosHoje,
      vendasMes, pedidosMes,
      vendasAno, pedidosAno,
      maisVendidos
    ] = await Promise.all([
      // Hoje
      prisma.pedido.aggregate({ _sum: { valor_total: true }, where: { data_hora: { gte: inicioHoje } } }),
      prisma.pedido.count({ where: { data_hora: { gte: inicioHoje } } }),
      
      // Mês
      prisma.pedido.aggregate({ _sum: { valor_total: true }, where: { data_hora: { gte: inicioMes } } }),
      prisma.pedido.count({ where: { data_hora: { gte: inicioMes } } }),

      // Ano
      prisma.pedido.aggregate({ _sum: { valor_total: true }, where: { data_hora: { gte: inicioAno } } }),
      prisma.pedido.count({ where: { data_hora: { gte: inicioAno } } }),

      // Ranking
      prisma.itemPedido.groupBy({
        by: ["produtoId"],
        _sum: { quantidade: true },
        orderBy: { _sum: { quantidade: "desc" } },
        take: 5
      })
    ]);

    const produtosDetalhes = await Promise.all(
      maisVendidos.map(async (item) => {
        const p = await prisma.produto.findUnique({ where: { id: item.produtoId } });
        return {
          produto: p ? p.nome : "Produto Removido",
          quantidade: item._sum.quantidade
        };
      })
    );

    return {
      hoje: {
        vendas: vendasHoje._sum.valor_total ?? 0,
        pedidos: pedidosHoje
      },
      mes: {
        vendas: vendasMes._sum.valor_total ?? 0,
        pedidos: pedidosMes
      },
      ano: {
        vendas: vendasAno._sum.valor_total ?? 0,
        pedidos: pedidosAno
      },
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

    const precoLimpo = (data.preco && !isNaN(parseFloat(data.preco))) ? parseFloat(data.preco) : 0;
    const categoriaIdLimpo = (data.categoriaId && !isNaN(Number(data.categoriaId)) && Number(data.categoriaId) > 0) 
      ? Number(data.categoriaId) 
      : null;

    return await prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao ?? null,
        preco: precoLimpo,
        disponivel: data.disponivel === "true" || data.disponivel === true,
        categoriaId: categoriaIdLimpo,
        imagemUrl: data.imagemUrl ?? null,
        ingredientes: data.ingredientes ?? null
      },
      include: { categoria: true }
    });
  },

  async editarProduto(id, data) {
    const precoLimpo = (data.preco && !isNaN(parseFloat(data.preco))) ? parseFloat(data.preco) : 0;
    const categoriaIdLimpo = (data.categoriaId && !isNaN(Number(data.categoriaId)) && Number(data.categoriaId) > 0) 
      ? Number(data.categoriaId) 
      : null;

    const dadosParaAtualizar = {
      nome: data.nome,
      descricao: data.descricao ?? null,
      preco: precoLimpo, 
      disponivel: data.disponivel === "true" || data.disponivel === true, 
      categoriaId: categoriaIdLimpo,
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
