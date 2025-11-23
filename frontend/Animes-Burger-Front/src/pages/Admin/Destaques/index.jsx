import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; //
import { TrashIcon } from '@heroicons/react/24/outline';
import ConfirmModal from '../../../components/ConfirmModal';
import SuccessModal from '../../../components/SuccessModal';

const AdminDestaques = () => {
  const [destaques, setDestaques] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destaqueParaRemover, setDestaqueParaRemover] = useState(null)

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // State para o dropdown
  const [produtoIdSelecionado, setProdutoIdSelecionado] = useState('');

  // 1. Busca os destaques e também todos os produtos
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [resDestaques, resProdutos] = await Promise.all([
        api.get('/admin/destaques'), //
        api.get('/produtos') // (Para o dropdown)
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Fecha o modal visualmente
    setProdutoIdSelecionado(''); // Limpa o dropdown
    fetchData(); // Atualiza a lista de destaques
  };

  // 2. Adicionar um novo destaque
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

  // 3. Remover um destaque
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

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
        style={{ textShadow: "6px 6px 0px #000" }}>Gerenciar Destaques</h1>

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

      {/* Formulário de Adição */}
      <form onSubmit={handleAdicionar} className="bg-white p-6 rounded-lg shadow-md mb-8 flex gap-4 items-end border-4 border-black font-Adlam">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Adicionar Produto aos Destaques
          </label>
          <select
            value={produtoIdSelecionado}
            onChange={(e) => setProdutoIdSelecionado(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione um produto...</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#A0405A] text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 border-4 border-black"
        >
          Adicionar
        </button>
      </form>
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      {/* Tabela de Destaques Atuais */}
      <h2 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
        style={{ textShadow: "6px 6px 0px #000" }}>Destaques Atuais ({destaques.length} / 3)</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border-4 border-black">
        <table className="min-w-full">
          <thead className="bg-[#A0405A] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Produto</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {destaques.map((destaque) => (
              <tr key={destaque.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">
                  {destaque.produto?.nome || 'Produto não encontrado'}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => abrirModalRemocao(destaque.produtoId)}
                    className="text-red-500 hover:text-red-700"
                    title="Remover"
                  >
                    <TrashIcon className="h-5 w-5" />
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

export default AdminDestaques;