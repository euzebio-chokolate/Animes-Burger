import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import SuccessModal from "../../components/SuccessModal";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);

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

    if (senha !== confirmarSenha) {
        setError("As senhas não coincidem. Verifique e tente novamente.");
        setLoading(false);
        return;
    }

    try {
      await api.post('/usuarios/register', { nome, email, senha, role: 'user' });
      setShowSuccessModal(true);
    } catch (err) {
      const errorMsg = err.response?.data?.erro || "Erro ao criar conta.";
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
      
      <div className="min-h-screen flex items-center justify-center bg-[#F9E8B0] p-6">
        
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
          className="animate-slide-up bg-white p-6 md:p-10 rounded-3xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black flex flex-col m-2"
        >
          <h1 
            className="font-Atop font-bold text-4xl md:text-5xl text-center mb-8 text-stroke text-[#F78C26] drop-shadow-lg"
            style={{ textShadow: "4px 4px 0px #000" }}
          >
            CRIAR CONTA
          </h1>

          <div className="mb-4">
            <label className="block font-Adlam text-xl text-black mb-2">Seu Nome</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] outline-none"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-Adlam text-xl text-black mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block font-Adlam text-xl text-black mb-2">Senha</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 pr-12 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] outline-none"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 translate-y-2 text-gray-500 hover:text-[#F78C26]"
                    style={{ marginTop: '-12px' }}
                >
                    {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-Adlam text-xl text-black mb-2">Confirmar Senha</label>
            <input
                type={showPassword ? "text" : "password"} // Segue a visibilidade da senha principal
                className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] outline-none"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
            />
          </div>

          {error && (
            <p className="text-red-600 font-Adlam text-center mb-4 bg-red-100 p-2 rounded-lg border-2 border-red-200">
                {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8A3249] text-white font-Adlam text-2xl py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#A0405A] hover:translate-y-1 hover:shadow-none transition-all disabled:bg-gray-400"
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