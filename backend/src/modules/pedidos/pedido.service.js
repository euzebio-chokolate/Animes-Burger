import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PedidoService = {
    async listarTudo() {
        return await prisma.pedido.findMany({
            include: {
                cliente: true, 
                itens: { include: { produto: true } }
            },
            orderBy: { data_hora: 'desc' }
        });
    },


    async criar(data) {
        //data: { clienteId, tipo_pedido, itens: [ { produtoId, quantidade, observacoes... } ] }
        if (!data.itens || !Array.isArray(data.itens) || data.itens.length === 0) {
            throw new Error('Necessário enviar ao menos um item no pedido');
        }

        //busca preços dos produtos em uma unica query
        const produtoIds = data.itens.map(i => Number(i.produtoId));
        const produtos = await prisma.produto.findMany({
            where: { id: {in: produtoIds } }
        });

        const precoMap = Object.fromEntries(produtos.map(p => [p.id, p.preco]));

        let valorTotal = 0;


        const itensParaCriar = data.itens.map( i => {
            const PID = Number(i.produtoId);
            const quantidade = Number(i.quantidade) || 1;
            const precoUnitario = precoMap[PID];
            if(precoUnitario === undefined) {
                throw new Error(`Produto não encontrado: ${PID}`);
            }
            const subTotal = precoUnitario * quantidade;
            valorTotal += subTotal;
            return {
                produto: { connect: { id: PID} },
                quantidade,
                preco_unitario: precoUnitario,
                observacoes: i.observacoes ?? null
            };
        });

        const criarPedido = await prisma.pedido.create({
            data: {
                clienteId: data.clienteId ? Number(data.clienteId) : null, 
                tipo_pedido: data.tipoPedido ?? null,
                status: data.status ?? 'pendente',
                valor_total: valorTotal,
                itens: {
                    create: itensParaCriar
                }
            },
            include: {
                itens: { include: {produto: true} },
                cliente: true
            }
        });
        return criarPedido;
    }
}