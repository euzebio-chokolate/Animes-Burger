import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; 
import { TrashIcon } from '@heroicons/react/24/outline';
import ConfirmModal from '../../../components/ConfirmModal';
import SuccessModal from '../../../components/SuccessModal';

const AdminDestaques = () => {
  const [destaques, setDestaques] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [produtoIdSelecionado, setProdutoIdSelecionado] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destaqueParaRemover, setDestaqueParaRemover] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [resDestaques, resProdutos] = await Promise.all([
        api.get('/admin/destaques'),
        api.get('/produtos')
      ]);
      setDestaques(resDestaques.data);
      setProdutos(resProdutos.data);
    } catch (err) {
      console.error("Erro ao buscar dados", err);
      setError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); 
    setProdutoIdSelecionado(''); 
    fetchData(); 
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    if (!produtoIdSelecionado) { setError("Selecione um produto para adicionar."); return; }
    
    try {
      setError(null);
      await api.post(`/admin/destaques/${produtoIdSelecionado}`);
      
      setSuccessMessage('Destaque adicionado com sucesso!');
      setShowSuccessModal(true);

    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao adicionar destaque.");
    }
  };

  const abrirModalRemocao = (produtoId) => {
    setDestaqueParaRemover(produtoId);
    setIsModalOpen(true);
  };

  const confirmarRemocao = async () => {
    if (!destaqueParaRemover) return;

    try {
      setError(null);
      await api.delete(`/admin/destaques/${destaqueParaRemover}`);
      fetchData(); 
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao remover destaque.");
    }
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
        className="animate-slide-up font-Atop font-semibold text-4xl md:text-5xl mb-8 md:mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        Gerenciar Destaques
      </h1>

      {/* Modais */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmarRemocao}
        title="Remover Destaque"
        message="Tem certeza que deseja remover este produto dos destaques?"
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        message={successMessage}
      />

      {/* Formulário de Adição (Animado e Responsivo) */}
      <form 
        onSubmit={handleAdicionar} 
        className="animate-slide-up delay-100 bg-white p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-10 flex flex-col md:flex-row gap-4 items-end border-4 border-black font-Adlam"
      >
        <div className="flex-1 w-full">
          <label className="block text-lg font-bold text-gray-800 mb-2">
            Adicionar Produto aos Destaques
          </label>
          <select
            value={produtoIdSelecionado}
            onChange={(e) => setProdutoIdSelecionado(e.target.value)}
            className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg bg-white"
          >
            <option value="">Selecione um produto...</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-[#A0405A] text-white px-6 py-3 rounded-xl shadow hover:bg-[#892b41] border-4 border-black transition-transform hover:-translate-y-1 text-lg"
        >
          Adicionar
        </button>
      </form>
      
      {error && (
        <p className="animate-slide-up delay-100 text-red-600 bg-red-100 p-4 rounded-xl mb-6 border-2 border-red-200 font-bold text-center">
            {error}
        </p>
      )}

      {/* Tabela de Destaques (Animada e com Scroll Horizontal) */}
      <div className="animate-slide-up delay-200">
        <h2 className="font-Adlam text-3xl md:text-4xl mb-4 text-black border-l-8 border-[#F78C26] pl-4">
            Destaques Atuais <span className="text-gray-500 text-2xl">({destaques.length} / 3)</span>
        </h2>
      
        <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border-4 border-black font-Adlam">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-[#A0405A] text-white">
                    <tr>
                    <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black w-full">Produto</th>
                    <th className="py-4 px-6 text-right text-lg md:text-xl border-b-4 border-black">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {loading ? (
                        <tr><td colSpan="2" className="p-8 text-center text-xl">Carregando...</td></tr>
                    ) : destaques.length > 0 ? (
                        destaques.map((destaque) => (
                        <tr key={destaque.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 font-bold text-lg">
                                {destaque.produto?.nome || 'Produto não encontrado'}
                            </td>
                            <td className="py-4 px-6 flex justify-end">
                                <button 
                                    onClick={() => abrirModalRemocao(destaque.produtoId)}
                                    className="flex items-center gap-2 text-red-600 hover:text-white hover:bg-red-600 font-bold text-base border-2 border-red-600 rounded-lg px-3 py-1 transition-all shadow-sm hover:shadow-md"
                                    title="Remover"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                    Remover
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="p-8 text-center text-xl text-gray-500 bg-gray-50">
                                Nenhum destaque adicionado.
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestaques;