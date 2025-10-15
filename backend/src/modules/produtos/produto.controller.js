import { produtoService } from './produto.service.js';

export const ProdutoController = {
  async listar(request, response) {
    try {
      const produtos = await produtoService.listarTudo();
      response.json(produtos);
    } catch (error) {
      response.status(500).json({
        mensagem: 'Erro ao listar produtos',
        erro: error.messagem
       });
    }
  },

  async criar(request, response) {
    try {
      //validação simples
      const {nome, preco} = request.body;
      if (!nome || preco === undefined) {
        return response.status(400).json({
          mensagem: 'Campos obrigatórios: nome, preco'
        })
      }

      const novoProduto = await produtoService.criar(request.body);
      response.status(201).json(novoProduto);

    } catch (error) {
      response.status(500).json({
        mensagem: 'Erro ao criar novo produto',
        erro: error.mensagem
      })
    }
  }
};
