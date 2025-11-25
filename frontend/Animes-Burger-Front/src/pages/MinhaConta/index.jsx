import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/SuccessModal';

const MinhaConta = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/'); 
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await api.get('/clientes/perfil'); 
        
        if (!data) {
           throw new Error("Perfil de cliente não encontrado. Entre em contato com o suporte.");
        }

        setNome(data.usuario?.nome || '');
        setEmail(data.usuario?.email || '');
        setTelefone(data.telefone || '');
        

      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError(err.response?.data?.erro || "Não foi possível carregar seu perfil.");
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
      await api.put('/clientes/telefone', { telefone });
      await api.post('/clientes/endereco', enderecoData);
      setShowSuccessModal(true);
    } catch (err) {
      setError("Erro ao salvar o perfil.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="bg-[#F9E8B0] min-h-screen flex items-center justify-center">
        <p className="text-center font-adlam text-2xl animate-pulse text-black">Carregando perfil...</p>
    </div>
  );

  // Se der erro, mostra a mensagem em vez de travar
  if (error) return (
    <div className="bg-[#F9E8B0] min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-600 font-adlam text-2xl font-bold mb-4 text-center bg-white p-6 rounded-xl border-4 border-black shadow-lg">
            {error}
        </p>
        <button 
            onClick={() => navigate('/')}
            className="bg-[#F78C26] text-white font-adlam text-xl py-2 px-6 rounded-xl border-4 border-black shadow-md hover:bg-[#E57A1E]"
        >
            Voltar para Home
        </button>
    </div>
  );

  return (
    <div className="bg-[#F9E8B0] min-h-screen p-4 md:p-8 py-12 flex flex-col items-center overflow-x-hidden">
        
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

        <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleCloseModal} 
        message="Perfil salvo com sucesso!" 
      />

      <h1 
        className="animate-slide-up font-Atop font-bold text-5xl md:text-7xl text-center mb-10 text-stroke text-[#F78C26] drop-shadow-lg"
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        MINHA CONTA
      </h1>

      <form 
        onSubmit={handleSalvar}
        className="animate-slide-up delay-100 container mx-auto max-w-3xl bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black p-6 md:p-10"
      >
        {/* Seção de Perfil */}
        <div className="mb-8 border-b-4 border-black/10 pb-8">
            <h2 className="font-Adlam text-3xl md:text-4xl text-black mb-6 flex items-center gap-2">
                Seus Dados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block font-Adlam text-xl text-black mb-2">Nome</label>
                    <input 
                    type="text" 
                    value={nome}
                    disabled 
                    className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-100 text-gray-500 text-lg font-Adlam cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block font-Adlam text-xl text-black mb-2">Email</label>
                    <input 
                    type="email" 
                    value={email}
                    disabled 
                    className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-100 text-gray-500 text-lg font-Adlam cursor-not-allowed"
                    />
                </div>
            </div>
            <div>
                <label className="block font-Adlam text-xl text-black mb-2">Telefone</label>
                <input 
                    type="number" 
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(99) 99999-9999"
                    className="w-full p-3 rounded-xl border-4 border-gray-300 bg-white text-lg font-Adlam focus:border-[#F78C26] focus:ring-0 outline-none transition-colors placeholder-gray-400"
                />
            </div>
        </div>

        {/* Botão Salvar */}
        <div className="mt-10 pt-6 border-t-4 border-black/10">
          <button
            type="submit"
            disabled={loading}
            className="w-full text-center bg-[#8A3249] text-white font-Adlam text-2xl md:text-3xl py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#A0405A] hover:translate-y-1 hover:shadow-none transition-all disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          {error && <p className="text-red-600 font-Adlam text-xl font-bold text-center mt-4 bg-red-100 p-2 rounded-lg border-2 border-red-200">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default MinhaConta;