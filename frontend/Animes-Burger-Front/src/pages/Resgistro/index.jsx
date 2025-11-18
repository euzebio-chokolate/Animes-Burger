import React, { useState } from 'react';
import api from '../../services/api'; //
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

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
      // 1. Chama a rota de registro do back-end
      await api.post('/usuarios/register', {
        nome,
        email,
        senha,
        role: 'user' // Define o 'role' como 'user'
      });

      alert("Conta criada com sucesso! Você já pode fazer o login.");
      
      // 2. Redireciona para a página de login
      navigate('/login');

    } catch (err) {
      console.error("Erro no registro:", err);
      const errorMsg = err.response?.data?.erro || "Não foi possível criar a conta. Tente outro email.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg text-white w-full max-w-md shadow-xl"
      >
        <h1 className="text-2xl mb-6 font-bold text-center font-adlam">
          Criar Conta
        </h1>

        {/* Campo Nome */}
        <label className="block mb-1 font-semibold">Nome</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 mt-1 mb-4"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        {/* Campo Email */}
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 mt-1 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo Senha */}
        <label className="block mb-1 font-semibold">Senha</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700 mt-1 mb-6"
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
          className="w-full bg-green-600 hover:bg-green-700 transition p-2 rounded font-adlam text-lg disabled:bg-gray-500"
        >
          {loading ? "Criando..." : "Registrar"}
        </button>

        <p className="text-center mt-4">
          Já tem uma conta? 
          <Link to="/login" className="text-yellow-500 hover:underline ml-1">
            Faça o login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registro;