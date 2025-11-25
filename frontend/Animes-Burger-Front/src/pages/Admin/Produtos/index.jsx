import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; 
import { ProdutoForm } from './ProdutoForm'; 
import ConfirmModal from '../../../components/ConfirmModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
    <div className="overflow-x-hidden pb-10 p-5">
        
        {/* Estilos de Animação */}
        <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.8s ease-out forwards;
                opacity: 0;
            }
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
        `}</style>

      <h1 
        className="animate-slide-up font-Atop font-semibold text-4xl md:text-6xl mb-8 md:mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
        style={{ textShadow: "6px 6px 0px #000" }}
      >
        Gerenciar Produtos
      </h1>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmarRemocao}
        title="Remover Produto"
        message="Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita."
      />

      {/* Formulário (Animado) */}
      <div className="animate-slide-up delay-100">
        <ProdutoForm 
            key={produtoEmEdicao ? produtoEmEdicao.id : 'novo'}
            produtoParaEditar={produtoEmEdicao} 
            onSuccess={onFormSuccess} 
        />
      </div>

      {produtoEmEdicao && (
        <div className="animate-slide-up delay-100 mb-8">
            <button 
            onClick={() => setProdutoEmEdicao(null)}
            className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-600 font-Adlam text-xl transition-transform hover:-translate-y-1"
            >
            Cancelar Edição (Voltar para "Criar")
            </button>
        </div>
      )}

      {/* Tabela de Produtos (Animada e Responsiva) */}
      <div className="animate-slide-up delay-200">
        <h2 className="font-Adlam text-3xl md:text-4xl mb-4 text-black border-l-8 border-[#F78C26] pl-4">
            Produtos Existentes
        </h2>
      
        <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border-4 border-black font-Adlam">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-[#A0405A] text-white">
                    <tr>
                    <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Imagem</th>
                    <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black min-w-[200px]">Nome</th>
                    <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Preço</th>
                    <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Categoria</th>
                    <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black min-w-[150px]">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {loading && (
                    <tr><td colSpan="5" className="p-8 text-center text-xl">Carregando...</td></tr>
                    )}
                    {!loading && produtos.map((produto) => (
                    <tr key={produto.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                        <img src={produto.imagemUrl} alt={produto.nome} className="h-16 w-16 object-cover rounded-xl border-2 border-black shadow-sm" />
                        </td>
                        <td className="py-4 px-6 font-bold text-lg text-black">{produto.nome}</td>
                        <td className="py-4 px-6 text-lg font-medium">R$ {produto.preco.toFixed(2)}</td>
                        <td className="py-4 px-6 text-lg">{produto.categoria?.nome || 'N/A'}</td>
                        <td className="py-4 px-6">
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setProdutoEmEdicao(produto)}
                                className="bg-blue-600 text-white p-2 rounded-lg border-2 border-blue-800 hover:bg-blue-700 transition-colors shadow-sm"
                                title="Editar"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button 
                                onClick={() => abrirModalRemocao(produto.id)} 
                                className="bg-red-600 text-white p-2 rounded-lg border-2 border-red-800 hover:bg-red-700 transition-colors shadow-sm"
                                title="Remover"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProdutos;