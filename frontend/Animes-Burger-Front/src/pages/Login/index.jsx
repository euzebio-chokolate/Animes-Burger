import { useState } from "react";
import api from "../../services/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/usuarios/login", { email, senha });
      
      localStorage.setItem("token", data.accessToken);
      
      localStorage.setItem("role", data.usuario.role);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.usuario));

      if (data.usuario.role === "admin") {
        nav("/admin");
      } else {
        nav("/");
      }
      
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Ocorreu um erro no login: " + err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg text-white w-96 shadow-xl"
      >
        <h1 className="text-2xl mb-6 font-bold text-center">Login</h1>

        <label>Email</label>
        <input
          className="w-full p-2 rounded bg-gray-700 mt-1 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 mt-1 mb-6"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="w-full bg-red-600 hover:bg-red-700 transition p-2 rounded"
        >
          Entrar
        </button>
        <p className="text-center mt-4">
          Não tem uma conta? 
          <Link to="/registro" className="text-yellow-500 hover:underline ml-1">
            Crie uma agora
          </Link>
        </p>
      </form>
    </div>
  );
}
