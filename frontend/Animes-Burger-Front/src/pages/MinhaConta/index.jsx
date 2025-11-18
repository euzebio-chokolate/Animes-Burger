import React, { useState, useEffect } from 'react';
import api from '../../services/api'; //
import { useNavigate } from 'react-router-dom';

const MinhaConta = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States para o formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');

  // 1. Busca os dados do perfil ao carregar
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await api.get('/clientes/perfil'); //
        
        // Preenche os states com os dados do back-end
        setNome(data.usuario.nome);
        setEmail(data.usuario.email);
        setTelefone(data.telefone || '');
        if (data.endereco) {
          setRua(data.endereco.rua || '');
          setNumero(data.endereco.numero || '');
          setBairro(data.endereco.bairro || '');
          setCidade(data.endereco.cidade || '');
          setCep(data.endereco.cep || '');
        }
      } catch (err) {
        setError("Não foi possível carregar seu perfil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []); // Roda só uma vez

  // 2. Função para salvar as alterações
  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const enderecoData = { rua, numero, bairro, cidade, cep };

    try {
      // O back-end usa duas rotas separadas, vamos chamá-las
      
      // Salva o telefone
      await api.put('/clientes/telefone', { telefone }); //
      
      // Salva o endereço (criar ou atualizar)
      await api.post('/clientes/endereco', enderecoData); //

      alert("Perfil salvo com sucesso!");
      navigate('/'); // Volta para a Home

    } catch (err) {
      setError("Erro ao salvar o perfil.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center p-8 font-adlam text-xl">Carregando...</p>;

  return (
    <div className="bg-[#F9E8B0] min-h-screen p-4 py-12 flex flex-col items-center">
      <h1 className="font-adlam text-stroke text-white text-5xl md:text-6xl text-center mb-10"
          style={{ textShadow: "4px 4px 0px #000" }}>
        Minha Conta
      </h1>

      <form 
        onSubmit={handleSalvar}
        className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-xl border-4 border-black p-8"
      >
        {/* Seção de Perfil */}
        <h2 className="font-adlam text-3xl text-black mb-5">Seus Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="font-adlam text-lg">Nome</label>
            <input 
              type="text" 
              value={nome}
              disabled // Nome não pode ser alterado
              className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300 bg-gray-100"
            />
          </div>
          <div>
            <label className="font-adlam text-lg">Email</label>
            <input 
              type="email" 
              value={email}
              disabled // Email não pode ser alterado
              className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300 bg-gray-100"
            />
          </div>
        </div>
        <div className="mb-8">
          <label className="font-adlam text-lg">Telefone</label>
          <input 
            type="tel" 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(99) 99999-9999"
            className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300"
          />
        </div>

        {/* Seção de Endereço */}
        <h2 className="font-adlam text-3xl text-black mb-5">Endereço de Entrega</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="font-adlam text-lg">Rua</label>
            <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300" />
          </div>
          <div>
            <label className="font-adlam text-lg">Número</label>
            <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300" />
          </div>
          <div>
            <label className="font-adlam text-lg">Bairro</label>
            <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300" />
          </div>
          <div>
            <label className="font-adlam text-lg">Cidade</label>
            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300" />
          </div>
          <div>
            <label className="font-adlam text-lg">CEP</label>
            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300" />
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full text-center bg-[#8A3249] text-white font-adlam text-2xl py-3 rounded-xl border-4 border-black shadow-lg hover:bg-[#A0405A] transition-colors disabled:bg-gray-400"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          {error && <p className="text-red-600 font-adlam text-center mt-3">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default MinhaConta;