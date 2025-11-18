import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; //
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States para o formulário
  const [nome, setNome] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null); // Controla se estamos editando ou criando

  // 1. Busca as categorias do admin
  const fetchCategorias = async () => {
    try {
      setLoading(true);
      setError(null); // Limpa erros antigos
      const { data } = await api.get('/admin/categorias'); // Rota do admin
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
  }, []); // Roda na inicialização

  // 2. Limpa o formulário e volta ao modo "Criar"
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
        // --- Modo Edição ---
        await api.put(`/admin/categorias/${idEmEdicao}`, { nome });
      } else {
        // --- Modo Criação ---
        await api.post('/admin/categorias', { nome });
      }
      
      resetFormulario(); // Limpa o formulário
      fetchCategorias(); // Recarrega a lista
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao salvar categoria.");
    }
  };

  // 4. Prepara o formulário para editar
  const handleEditar = (categoria) => {
    setIdEmEdicao(categoria.id);
    setNome(categoria.nome);
  };

  // 5. Remove a categoria
  const handleRemover = async (id) => {
    // Pede confirmação
    if (window.confirm("Tem certeza? Se algum produto estiver usando esta categoria, a remoção falhará.")) {
      try {
        setError(null);
        await api.delete(`/admin/categorias/${id}`);
        fetchCategorias(); // Recarrega a lista
      } catch (err) {
        // Mostra o erro do back-end (ex: "Categoria está em uso")
        setError(err.response?.data?.erro || "Erro ao remover categoria.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Categorias</h1>

      {/* Formulário de Criação/Edição */}
      <form onSubmit={handleSalvar} className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-end">
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
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 w-full sm:w-auto"
        >
          {idEmEdicao ? 'Atualizar' : 'Salvar'}
        </button>
        {idEmEdicao && (
          <button
            type="button"
            onClick={resetFormulario}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-600 w-full sm:w-auto"
          >
            Cancelar
          </button>
        )}
      </form>
      
      {/* Exibição de Erro */}
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

      {/* Tabela de Categorias */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
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
                      onClick={() => handleRemover(cat.id)}
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