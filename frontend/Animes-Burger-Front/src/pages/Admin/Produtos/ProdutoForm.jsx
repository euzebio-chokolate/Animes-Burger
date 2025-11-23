import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import SuccessModal from '../../../components/SuccessModal';

export const ProdutoForm = ({ onSuccess, produtoParaEditar }) => {
  
  const isEditMode = !!produtoParaEditar;

  //States do formulário
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagemUrlAtual, setImagemUrlAtual] = useState('');
  
  //States de dados e UI
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //States do Modal de Sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  //Carregar categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data } = await api.get('/categorias');
        setCategorias(data);
      } catch (err) {
        console.error("Erro ao buscar categorias", err);
      }
    };
    fetchCategorias();
  }, []);

  //Preenche formulário no modo edição
  useEffect(() => {
    if (isEditMode) {
      setNome(produtoParaEditar.nome);
      setPreco(produtoParaEditar.preco);
      setDescricao(produtoParaEditar.descricao || '');
      setIngredientes(produtoParaEditar.ingredientes || '');
      setCategoriaId(produtoParaEditar.categoriaId || '');
      setImagemUrlAtual(produtoParaEditar.imagemUrl || '');
    }
  }, [produtoParaEditar, isEditMode]);

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  //Fecha o Modal e depois limpa a tela
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    
    if (onSuccess) {
      onSuccess();
    }
    
    if (!isEditMode) {
        setNome('');
        setPreco(0);
        setDescricao('');
        setIngredientes('');
        setCategoriaId('');
        setImagem(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', descricao);
    formData.append('ingredientes', ingredientes);
    formData.append('categoriaId', categoriaId);
    formData.append('disponivel', true);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      if (isEditMode) {
        await api.put(`/admin/produtos/${produtoParaEditar.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccessMessage('Produto atualizado com sucesso!');
      } else {
        await api.post('/admin/produtos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccessMessage('Produto criado com sucesso!');
      }
      setShowSuccessModal(true);

      if (!isEditMode) {
        e.target.reset(); 
      }

    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      setError(err.response?.data?.erro || "Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal de Sucesso */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleCloseModal} 
        message={successMessage}
      />

      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-Adlam border-4 border-black"
      >
        <h2 className="text-2xl font-bold mb-4 col-span-1 md:col-span-2 font-adlam">
          {isEditMode ? `Editando: ${produtoParaEditar.nome}` : 'Criar Novo Produto'}
        </h2>

        {/* Campos do Formulário */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full p-2 border-2 border-gray-300 rounded-md" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preço (ex: 29.90)</label>
          <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(parseFloat(e.target.value))} className="mt-1 block w-full p-2 border-2 border-gray-300 rounded-md" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))} className="mt-1 block w-full p-2 border-2 border-gray-300 rounded-md" required>
            <option value="">Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isEditMode ? 'Trocar Imagem (Opcional)' : 'Imagem do Produto'}
          </label>
          <input
            type="file"
            onChange={handleImagemChange}
            className="mt-1 block w-full text-sm"
            required={!isEditMode} 
          />
          {isEditMode && imagemUrlAtual && (
            <div className="mt-2">
              <p className="text-sm">Imagem atual:</p>
              <img src={imagemUrlAtual} alt="Imagem atual" className="h-20 w-20 object-cover rounded-md border-2 border-black" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mt-1 block w-full p-2 border-2 border-gray-300 rounded-md"></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredientes (separados por vírgula)</label>
          <textarea rows="3" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} className="mt-1 block w-full p-2 border-2 border-gray-300 rounded-md"></textarea>
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A0405A] text-white px-4 py-3 rounded-xl border-4 border-black shadow hover:bg-gray-800 disabled:bg-gray-400 text-xl"
          >
            {loading ? 'Salvando...' : (isEditMode ? 'Atualizar Produto' : 'Salvar Novo Produto')}
          </button>
          {error && <p className="text-red-600 text-sm mt-2 font-bold">{error}</p>}
        </div>

      </form>
    </>
  );
};