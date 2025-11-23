import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; //
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import ConfirmModal from '../../../components/ConfirmModal';
import SuccessModal from '../../../components/SuccessModal';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //States para o formulário
  const [nome, setNome] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaParaRemover, setCategoriaParaRemover] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  //Busca as categorias do admin
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


  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    resetFormulario();          
    fetchCategorias();          
  };

  //Limpa o formulário e volta ao modo "Criar"
  const resetFormulario = () => {
    setNome('');
    setIdEmEdicao(null);
  };

  // 3. Função de Salvar (Cria ou Edita)
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
    <div>
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
        style={{ textShadow: "6px 6px 0px #000" }}>Gerenciar Categorias</h1>

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

      {/* Formulário de Criação/Edição */}
      <form onSubmit={handleSalvar} className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-end border-4 border-black font-Adlam">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700">
            {idEmEdicao ? `Editando Categoria: ${nome}` : 'Nova Categoria'}
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Bebidas"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#A0405A] text-white px-5 py-2 rounded-xl shadow hover:bg-gray-700 w-full sm:w-auto border-4 border-black"
        >
          {idEmEdicao ? 'Atualizar' : 'Salvar'}
        </button>
        {idEmEdicao && (
          <button
            type="button"
            onClick={resetFormulario}
            className="bg-red-700 text-white px-5 py-2 rounded-xl shadow hover:bg-gray-600 w-full sm:w-auto border-4 border-black"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Exibição de Erro */}
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      {/* Tabela de Categorias */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border-4 border-black font-Adlam">
        <table className="min-w-full">
          <thead className="bg-[#A0405A] text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr><td colSpan="3" className="p-4 text-center">Carregando categorias...</td></tr>
            ) : (
              categorias.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{cat.id}</td>
                  <td className="py-3 px-4 font-medium">{cat.nome}</td>
                  <td className="py-3 px-4 flex justify-end gap-4">
                    <button
                      onClick={() => handleEditar(cat)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => abrirModalRemocao(cat.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Remover"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategorias;