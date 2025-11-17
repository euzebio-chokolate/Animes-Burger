import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; //
import { ProdutoForm } from './ProdutoForm'; //

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/produtos');
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleRemover = async (id) => {
    if (window.confirm("Tem certeza?")) {
      try {
        await api.delete(`/admin/produtos/${id}`); 
        fetchProdutos();

        if (produtoEmEdicao && produtoEmEdicao.id === id) {
          setProdutoEmEdicao(null);
        }
      } catch (err) {
        alert("Erro ao remover produto.");
      }
    }
  };

  const onFormSuccess = () => {
    fetchProdutos(); 
    setProdutoEmEdicao(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Produtos</h1>

      {/* Agora passamos o 'produtoEmEdicao' para o formulário.
        A 'key' é um truque do React: se 'produtoEmEdicao' mudar,
        o React vai recriar o formulário do zero, garantindo que ele
        seja preenchido com os novos dados.
      */}
      <ProdutoForm 
        key={produtoEmEdicao ? produtoEmEdicao.id : 'novo'}
        produtoParaEditar={produtoEmEdicao} 
        onSuccess={onFormSuccess} 
      />

      {/* Botão para cancelar edição (só aparece se estiver editando) */}
      {produtoEmEdicao && (
        <button 
          onClick={() => setProdutoEmEdicao(null)}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 mb-8"
        >
          Cancelar Edição (Voltar para "Criar")
        </button>
      )}

      <h2 className="text-2xl font-bold mb-4 mt-8">Produtos Existentes</h2>
      
      {/* Tabela de Produtos */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full">
          {/* ... (thead da tabela) ... */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Imagem</th>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Preço</th>
              <th className="py-3 px-4 text-left">Categoria</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading && (
              <tr><td colSpan="5" className="p-4 text-center">Carregando...</td></tr>
            )}
            {!loading && produtos.map((produto) => (
              <tr key={produto.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={produto.imagemUrl} alt={produto.nome} className="h-12 w-12 object-cover rounded-md" />
                </td>
                <td className="py-3 px-4 font-medium">{produto.nome}</td>
                <td className="py-3 px-4">R$ {produto.preco.toFixed(2)}</td>
                <td className="py-3 px-4">{produto.categoria?.nome || 'N/A'}</td>
                <td className="py-3 px-4">
                  {/* --- BOTÃO DE EDITAR ATUALIZADO --- */}
                  <button 
                    onClick={() => setProdutoEmEdicao(produto)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm mr-2"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleRemover(produto.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProdutos;