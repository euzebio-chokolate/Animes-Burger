import { adminService } from "./admin.service.js";

export const CategoriasAdminController = {
  // Lista todas as categorias (para o admin)
  async listar(req, res) {
    try {
      const categorias = await adminService.listarCategorias();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Cria uma nova categoria
  async criar(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
      }
      const categoria = await adminService.criarCategoria(nome);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Atualiza uma categoria
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      if (!nome) {
        return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
      }
      const categoria = await adminService.atualizarCategoria(id, nome);
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Remove uma categoria
  async remover(req, res) {
    try {
      const { id } = req.params;
      await adminService.removerCategoria(id);
      res.json({ mensagem: "Categoria removida com sucesso" });
    } catch (error) {
      // Se o erro for o que criamos (categoria em uso), envie 400
      if (error.message.includes("está sendo usada")) {
        return res.status(400).json({ erro: error.message });
      }
      res.status(500).json({ erro: error.message });
    }
  }
};