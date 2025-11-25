import { pagamentoService } from "./pagamento.service.js";

export const PagamentoController = {
  async criarPix(req, res) {
    try {
      const { pedidoId, valor, email, nome } = req.body;
      const dadosPix = await pagamentoService.gerarPix(pedidoId, valor, email, nome);
      res.json(dadosPix);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async checarStatus(req, res) {
    try {
      const { paymentId } = req.params;
      const status = await pagamentoService.verificarStatus(paymentId);
      res.json({ status });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};