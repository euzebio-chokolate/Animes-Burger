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

      setShowSuccessModal(true)

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
        onClose={handleCloseModal} // Chama a função que redireciona
        message="Conta criada com sucesso! Você já pode fazer o login."
      />
      <div className="min-h-screen flex items-center justify-center bg-[#A0405A] p-4">
        <form
          onSubmit={handleRegister}
          className="bg-[#F9E8B0] p-8 rounded-lg text-black w-96 shadow-xl border-4 border-black font-Adlam"
        >
          <h1 className="font-Atop font-semibold text-4xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
            style={{ textShadow: "6px 6px 0px #000" }}>
            Criar Conta
          </h1>

          {/* Campo Nome */}
          <label className="font-Adlam text-black text-2xl">Nome</label>
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-[#F78C26] mt-1 mb-6 border-4 border-black"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          {/* Campo Email */}
          <label className="font-Adlam text-black text-2xl">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded-xl bg-[#F78C26] mt-1 mb-6 border-4 border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Campo Senha */}
          <label className="font-Adlam text-black text-2xl">Senha</label>
          <input
            type="password"
            className="w-full p-2 rounded-xl bg-[#F78C26] mt-1 mb-6 border-4 border-black"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {/* Exibição de Erro */}
          {error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition p-2 rounded-xl border-4 border-black text-xl"
          >
            {loading ? "Criando..." : "Registrar"}
          </button>

          <p className="text-center mt-4 text-xl">
            Já tem uma conta?
            <Link to="/login" className="text-[#F78C26] hover:underline ml-1 text-xl">
              Faça o login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Registro;