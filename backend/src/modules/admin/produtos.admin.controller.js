import { adminService } from "./admin.service.js";

export const ProdutosAdminController = {
  async criar(req, res) {
    try {
      const imagemUrl = req.file?.path || req.body.imagemUrl || null;

      const dadosDoProduto = { ...req.body, imagemUrl };

      const produto = await adminService.criarProduto(dadosDoProduto);
      res.json(produto);

    } catch (error) {
      console.error("ERRO JSON:", JSON.stringify(error, null, 2));
      res.status(500).json({ erro: error.message || "Erro ao criar produto" });
    }
  },

  async editar(req, res) {
    try {
      const imagemUrl = req.file?.path || req.body.imagemUrl || null;
      const dadosDoProduto = { ...req.body, imagemUrl };

      const produto = await adminService.editarProduto(
        Number(req.params.id), 
        dadosDoProduto
      );
      
      res.json(produto); 

    } catch (error) {
      console.error("ERRO JSON:", JSON.stringify(error, null, 2));
      res.status(500).json({ erro: error.message || "Erro ao editar produto" });
    }
  },

  async remover(req, res) {
    try {
      await adminService.removerProduto(Number(req.params.id));
      res.json({ mensagem: "Produto removido com sucesso" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao remover produto" });
    }
  }
};
