export const carrinhos = {}; 

export const carrinhoService = {

  obterCarrinho(usuarioId) {
    if (!carrinhos[usuarioId]) {
      carrinhos[usuarioId] = { itens: [] };
    }
    return carrinhos[usuarioId];
  },

  adicionarItem(usuarioId, produto) {
    const carrinho = this.obterCarrinho(usuarioId);

    const existente = carrinho.itens.find(
      item => item.produtoId === produto.produtoId
    );

    if (existente) {
      existente.quantidade += produto.quantidade;
    } else {
      carrinho.itens.push({
        produtoId: produto.produtoId,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: produto.quantidade
      });
    }

    return carrinho;
  },

  atualizarQuantidade(usuarioId, produtoId, quantidade) {
    const carrinho = this.obterCarrinho(usuarioId);

    const item = carrinho.itens.find(i => i.produtoId === produtoId);

    if (!item) throw new Error("Produto não encontrado no carrinho");

    item.quantidade = quantidade;

    return carrinho;
  },

  removerItem(usuarioId, produtoId) {
    const carrinho = this.obterCarrinho(usuarioId);

    carrinho.itens = carrinho.itens.filter(
      item => item.produtoId !== produtoId
    );

    return carrinho;
  },

  limparCarrinho(usuarioId) {
    carrinhos[usuarioId] = { itens: [] };
    return carrinhos[usuarioId];
  }

};
