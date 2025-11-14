import { destaqueService } from "./destaque.service.js";

export const DestaqueController = {
  async listar(req, res) {
    try {
      const destaques = await destaqueService.listar();
      res.json(destaques);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async adicionar(req, res) {
    try {
      const { produtoId } = req.body;

      if (!produtoId) {
        return res.status(400).json({ erro: "produtoId é obrigatório" });
      }

      const destaque = await destaqueService.adicionar(produtoId);
      res.status(201).json(destaque);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      await destaqueService.remover(id);

      res.json({ mensagem: "Destaque removido" });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};
