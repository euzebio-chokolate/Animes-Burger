import { carrinhoService } from "./carrinho.service.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const carrinhoController = {

  async listar(req, res) {
    const carrinho = carrinhoService.obterCarrinho(req.user.id);
    res.json(carrinho);
  },

  async adicionar(req, res) {
    try {
      const { produtoId, quantidade } = req.body;

      if (!produtoId || !quantidade)
        return res.status(400).json({ erro: "produtoId e quantidade são obrigatórios" });

      const produto = await prisma.produto.findUnique({
        where: { id: Number(produtoId) }
      });

      if (!produto)
        return res.status(404).json({ erro: "Produto não encontrado" });

      const carrinho = carrinhoService.adicionarItem(req.user.id, {
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: Number(quantidade)
      });

      res.json(carrinho);

    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { produtoId, quantidade } = req.body;

      const carrinho = carrinhoService.atualizarQuantidade(
        req.user.id,
        Number(produtoId),
        Number(quantidade)
      );

      res.json(carrinho);

    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async remover(req, res) {
    try {
      const produtoId = Number(req.params.produtoId);

      const carrinho = carrinhoService.removerItem(
        req.user.id,
        produtoId
      );

      res.json(carrinho);

    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async limpar(req, res) {
    const carrinho = carrinhoService.limparCarrinho(req.user.id);
    res.json(carrinho);
  }

};
