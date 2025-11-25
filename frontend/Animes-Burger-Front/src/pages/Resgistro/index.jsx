import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import SuccessModal from "../../components/SuccessModal";

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      await api.post('/usuarios/register', {
        nome,
        email,
        senha,
        role: 'user'
      });

      setShowSuccessModal(true);

    } catch (err) {
      console.error("Erro no registro:", err);
      const errorMsg = err.response?.data?.erro || "Não foi possível criar a conta. Tente outro email.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        message="Conta criada com sucesso! Você já pode fazer o login."
      />
      
      <div className="min-h-screen flex items-center justify-center bg-[#F9E8B0] p-4 overflow-hidden">
        
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
        `}</style>

        <form
          onSubmit={handleRegister}
          className="animate-slide-up bg-white p-6 md:p-10 rounded-3xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black flex flex-col"
        >
          <h1 
            className="font-Atop font-bold text-4xl md:text-5xl text-center mb-8 text-stroke text-[#F78C26] drop-shadow-lg"
            style={{ textShadow: "4px 4px 0px #000" }}
          >
            CRIAR CONTA
          </h1>

          {/* Campo Nome */}
          <div className="mb-4">
            <label className="block font-Adlam text-xl text-black mb-2">Nome</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] focus:ring-0 outline-none transition-colors"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          {/* Campo Email */}
          <div className="mb-4">
            <label className="block font-Adlam text-xl text-black mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] focus:ring-0 outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-6">
            <label className="block font-Adlam text-xl text-black mb-2">Senha</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] focus:ring-0 outline-none transition-colors"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* Exibição de Erro */}
          {error && (
            <p className="text-red-600 font-Adlam text-center mb-4 bg-red-100 p-2 rounded-lg border-2 border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8A3249] text-white font-Adlam text-2xl py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#A0405A] hover:translate-y-1 hover:shadow-none transition-all disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Criando..." : "Registrar"}
          </button>

          <p className="text-center mt-6 text-lg font-Adlam text-gray-600">
            Já tem uma conta?
            <Link 
              to="/login" 
              className="text-[#F78C26] hover:text-[#E57A1E] hover:underline ml-2 font-bold transition-colors"
            >
              Faça o login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Registro;