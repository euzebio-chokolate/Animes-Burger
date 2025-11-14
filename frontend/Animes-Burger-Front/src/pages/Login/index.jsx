import React, { useState } from "react";
import api, { setTokens } from "../../services/api.js";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, senha });
      const { accessToken, refreshToken, user } = res.data;
      setTokens({ access: accessToken, refresh: refreshToken });
      // opcional: salvar no localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao logar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 mb-3"/>
      <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Senha" required className="w-full p-2 mb-3"/>
      <button className="w-full bg-[#8A3249] text-white p-2">Entrar</button>
    </form>
  );
}

export default Login;
