import { adminService } from "./admin.service.js";

export const PedidosAdminController = {
  async listar(req, res) {
    try {
      const pedidos = await adminService.listarPedidos();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar pedidos" });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const pedido = await adminService.atualizarStatus(
        Number(req.params.id),
        req.body.status
      );

      res.json(pedido);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar status do pedido" });
    }
  }
};
