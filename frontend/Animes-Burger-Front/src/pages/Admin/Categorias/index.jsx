import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; 
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import ConfirmModal from '../../../components/ConfirmModal';
import SuccessModal from '../../../components/SuccessModal';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States para o formulário
  const [nome, setNome] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null); 

  // States para os Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaParaRemover, setCategoriaParaRemover] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/admin/categorias');
      setCategorias(data);
    } catch (err) {
      console.error("Erro ao buscar categorias", err);
      setError("Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const resetFormulario = () => {
    setNome('');
    setIdEmEdicao(null);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    resetFormulario();
    fetchCategorias();
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (idEmEdicao) {
        await api.put(`/admin/categorias/${idEmEdicao}`, { nome });
        setSuccessMessage('Categoria atualizada com sucesso!');
      } else {
        await api.post('/admin/categorias', { nome });
        setSuccessMessage('Categoria criada com sucesso!');
      }
      
      setShowSuccessModal(true);

    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao salvar categoria.");
    }
  };

  const handleEditar = (categoria) => {
    setIdEmEdicao(categoria.id);
    setNome(categoria.nome);
  };

  const abrirModalRemocao = (id) => {
    setCategoriaParaRemover(id);
    setIsModalOpen(true);
  };

  const confirmarRemocao = async () => {
    if (!categoriaParaRemover) return;

    try {
      setError(null);
      await api.delete(`/admin/categorias/${categoriaParaRemover}`);
      fetchCategorias();
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao remover categoria.");
    }
  };

  return (
    <div className="overflow-x-hidden p-5">
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
        Gerenciar Categorias
      </h1>

      {/* Modais (Mantidos) */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmarRemocao}
        title="Remover Categoria"
        message="Tem certeza que deseja remover esta categoria? Se ela estiver em uso, a remoção falhará."
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        message={successMessage}
      />

      {/* Formulário de Criação/Edição (Animado e Responsivo) */}
      <form 
        onSubmit={handleSalvar} 
        className="animate-slide-up delay-100 bg-white p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-10 flex flex-col md:flex-row gap-4 items-end border-4 border-black font-Adlam"
      >
        <div className="flex-1 w-full">
          <label className="block text-lg font-bold text-gray-800 mb-2">
            {idEmEdicao ? `Editando: ${nome}` : 'Nova Categoria'}
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Bebidas"
            className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg"
            required
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
            <button
            type="submit"
            className="flex-1 md:flex-none bg-[#A0405A] text-white px-6 py-3 rounded-xl shadow hover:bg-[#892b41] border-4 border-black transition-transform hover:-translate-y-1 text-lg"
            >
            {idEmEdicao ? 'Atualizar' : 'Salvar'}
            </button>
            
            {idEmEdicao && (
            <button
                type="button"
                onClick={resetFormulario}
                className="flex-1 md:flex-none bg-gray-500 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-600 border-4 border-black transition-transform hover:-translate-y-1 text-lg"
            >
                Cancelar
            </button>
            )}
        </div>
      </form>
      
      {error && (
        <p className="animate-slide-up delay-100 text-red-600 bg-red-100 p-4 rounded-xl mb-6 border-2 border-red-200 font-bold text-center">
            {error}
        </p>
      )}

      {/* Tabela de Categorias (Animada e com Scroll Horizontal) */}
      <div className="animate-slide-up delay-200 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden border-4 border-black font-Adlam">
        <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead className="bg-[#A0405A] text-white">
                <tr>
                <th className="py-4 px-6 text-left text-lg border-b-4 border-black">ID</th>
                <th className="py-4 px-6 text-left text-lg border-b-4 border-black w-full">Nome</th>
                <th className="py-4 px-6 text-right text-lg border-b-4 border-black">Ações</th>
                </tr>
            </thead>
            <tbody className="text-gray-800">
                {loading ? (
                <tr><td colSpan="3" className="p-8 text-center text-xl">Carregando categorias...</td></tr>
                ) : (
                categorias.map((cat) => (
                    <tr key={cat.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-lg font-bold">#{cat.id}</td>
                    <td className="py-4 px-6 text-lg font-medium">{cat.nome}</td>
                    <td className="py-4 px-6 flex justify-end gap-3">
                        <button 
                        onClick={() => handleEditar(cat)}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Editar"
                        >
                        <PencilIcon className="h-6 w-6" />
                        </button>
                        <button 
                        onClick={() => abrirModalRemocao(cat.id)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Remover"
                        >
                        <TrashIcon className="h-6 w-6" />
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategorias;