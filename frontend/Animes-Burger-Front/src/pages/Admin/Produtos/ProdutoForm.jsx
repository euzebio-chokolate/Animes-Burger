import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import SuccessModal from '../../../components/SuccessModal';

export const ProdutoForm = ({ onSuccess, produtoParaEditar }) => {
  
  const isEditMode = !!produtoParaEditar;

  // States
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagemUrlAtual, setImagemUrlAtual] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleCloseModal}
        message={successMessage}
      />

      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 md:p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-4 border-black font-Adlam"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2 col-span-1 md:col-span-2 font-adlam border-b-4 border-black/10 pb-4">
          {isEditMode ? `Editando: ${produtoParaEditar.nome}` : 'Criar Novo Produto'}
        </h2>

        <div>
          <label className="block text-lg font-bold text-gray-800 mb-2">Nome do Produto</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg" required />
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-800 mb-2">Preço (ex: 29.90)</label>
          <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(parseFloat(e.target.value))} className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg" required />
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-800 mb-2">Categoria</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))} className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg bg-white" required>
            <option value="">Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-lg font-bold text-gray-800 mb-2">
            {isEditMode ? 'Trocar Imagem (Opcional)' : 'Imagem do Produto'}
          </label>
          <input
            type="file"
            onChange={handleImagemChange}
            className="w-full p-2 border-4 border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F9E8B0] file:text-black hover:file:bg-[#F78C26]"
            required={!isEditMode} 
          />
          {isEditMode && imagemUrlAtual && (
            <div className="mt-4">
              <p className="text-sm font-bold mb-2">Imagem atual:</p>
              <img src={imagemUrlAtual} alt="Imagem atual" className="h-24 w-24 object-cover rounded-xl border-4 border-black shadow-md" />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-lg font-bold text-gray-800 mb-2">Descrição</label>
          <textarea rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg"></textarea>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-lg font-bold text-gray-800 mb-2">Ingredientes (separados por vírgula)</label>
          <textarea rows="2" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} className="w-full p-3 border-4 border-gray-300 rounded-xl focus:border-[#F78C26] outline-none transition-colors text-lg"></textarea>
        </div>

        <div className="col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A0405A] text-white px-6 py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#892b41] hover:translate-y-1 hover:shadow-none transition-all disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none text-xl font-bold uppercase tracking-wide"
          >
            {loading ? 'Salvando...' : (isEditMode ? 'Atualizar Produto' : 'Salvar Novo Produto')}
          </button>
          {error && <p className="text-red-600 text-lg font-bold mt-4 text-center bg-red-100 p-2 rounded-lg border-2 border-red-200">{error}</p>}
        </div>

      </form>
    </>
  );
};