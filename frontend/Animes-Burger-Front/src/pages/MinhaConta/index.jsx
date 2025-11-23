import React, { useState, useEffect } from 'react';
import api from '../../services/api'; //
import { useNavigate } from 'react-router-dom';

const MinhaConta = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //States para o formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');

  //Busca os dados do perfil
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await api.get('/clientes/perfil'); //
        
        // Preenche os states
        setNome(data.usuario.nome);
        setEmail(data.usuario.email);
        setTelefone(data.telefone || '');
      } catch (err) {
        setError("Não foi possível carregar seu perfil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const enderecoData = { rua, numero, bairro, cidade, cep };

    try {
      // Salva o telefone
      await api.put('/clientes/telefone', { telefone });
      // Salva o endereço
      await api.post('/clientes/endereco', enderecoData); 

      alert("Perfil salvo com sucesso!");
      navigate('/'); 

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
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>
        Minha Conta
      </h1>

      <form 
        onSubmit={handleSalvar}
        className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-xl border-4 border-black p-8"
      >
        {/* Seção de Perfil */}
        <h2 className="font-Adlam text-3xl text-black mb-5">Seus Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="font-Adlam text-lg">Nome</label>
            <input 
              type="text" 
              value={nome}
              disabled //Nome não pode ser alterado
              className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300 bg-gray-100"
            />
          </div>
          <div>
            <label className="font-Adlam text-lg">Email</label>
            <input 
              type="email" 
              value={email}
              disabled //Email não pode ser alterado
              className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300 bg-gray-100"
            />
          </div>
        </div>
        <div className="mb-8">
          <label className="font-Adlam text-lg">Telefone</label>
          <input 
            type="tel" 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(99) 99999-9999"
            className="w-full p-3 mt-1 rounded-xl border-2 border-gray-300"
          />
        </div>

        {/* Botão Salvar */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full text-center bg-[#8A3249] text-white font-Adlam text-2xl py-3 rounded-xl border-4 border-black shadow-lg hover:bg-[#A0405A] transition-colors disabled:bg-gray-400"
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