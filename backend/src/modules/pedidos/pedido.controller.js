import { PedidoService } from "./pedido.service.js";

export const PedidoController = {
    async listar(require, response) {
        try {
            const pedidos = await PedidoService.listarTudo();
            response.json(pedidos);
        }
        catch (error) {
            response.status(500).json({ message: 'Erro ao listar pedidos', error: error.message});
        }
    },

    async obter(req, res) {
        try {
            const { id } = req.params;
            const pedido = await PedidoService.obterPorId(id);
            if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
            res.json(pedido);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async criar(require, response) {
        try {
            const criado = await PedidoService.criar(require.body);
            response.status(201).json(criado);
        }
        catch (error) {
            response.status(400).json({ message: 'Erro ao criar pedido', error: error.message})
        }
    }
};