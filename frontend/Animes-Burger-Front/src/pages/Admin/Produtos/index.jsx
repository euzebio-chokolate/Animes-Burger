import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; 
import { ProdutoForm } from './ProdutoForm'; 
import ConfirmModal from '../../../components/ConfirmModal';

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoParaRemover, setProdutoParaRemover] = useState(null);

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

  const abrirModalRemocao = (id) => {
    setProdutoParaRemover(id);
    setIsModalOpen(true);
  };

  const confirmarRemocao = async () => {
    if (!produtoParaRemover) return;

    try {
      await api.delete(`/admin/produtos/${produtoParaRemover}`); 
      fetchProdutos();

      //Se removeu o produto que estava sendo editado, limpa o form
      if (produtoEmEdicao && produtoEmEdicao.id === produtoParaRemover) {
        setProdutoEmEdicao(null);
      }
    } catch (err) {
      alert("Erro ao remover produto.");
    }
  };

  const onFormSuccess = () => {
    fetchProdutos(); 
    setProdutoEmEdicao(null);
  };

  return (
    <div>
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>Gerenciar Produtos</h1>

          <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmarRemocao}
        title="Remover Produto"
        message="Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita."
      />

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

      {/* Botão para cancelar edição(só aparece se estiver editando)*/}
      {produtoEmEdicao && (
        <button 
          onClick={() => setProdutoEmEdicao(null)}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 mb-8"
        >
          Cancelar Edição (Voltar para "Criar")
        </button>
      )}

      <h2 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>Produtos Existentes</h2>
      
      {/* Tabela de Produtos */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto border-4 border-black font-Adlam">
        <table className="min-w-full">
          <thead className="bg-[#A0405A] text-white">
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
                  {/*BOTÃO DE EDITAR*/}
                  <button 
                    onClick={() => setProdutoEmEdicao(produto)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm mr-2"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => abrirModalRemocao(produto.id)} 
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