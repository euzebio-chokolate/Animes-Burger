import { clienteService } from "./cliente.service.js";

export const clienteController = {

  async perfil(req, res) {
    try {
      const perfil = await clienteService.obterPerfil(req.user.id);
      res.json(perfil);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async atualizarTelefone(req, res) {
    try {
      const { telefone } = req.body;

      const cliente = await clienteService.atualizarTelefone(
        req.user.id,
        telefone
      );

      res.json({
        mensagem: "Telefone atualizado com sucesso",
        cliente
      });
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async salvarEndereco(req, res) {
    try {
      const endereco = await clienteService.salvarEndereco(
        req.user.id,
        req.body
      );

      res.json({
        mensagem: "Endereço salvo com sucesso",
        endereco
      });
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async pedidos(req, res) {
    try {
      const pedidos = await clienteService.listarPedidos(req.user.id);
      res.json(pedidos);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  }

};
