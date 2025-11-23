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
    <div className="min-h-screen flex items-center justify-center bg-[#A0405A]">
      <form
        onSubmit={handleLogin}
        className="bg-[#F9E8B0] p-8 rounded-lg text-black w-96 shadow-xl border-4 border-black font-Adlam"
      >
        <h1 className="font-Atop font-semibold text-4xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>Login</h1>

        <label className="font-Adlam text-black text-2xl">Email</label>
        <input
          className="w-full p-2 rounded-xl bg-[#F78C26] mt-1 mb-6 border-4 border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="font-Adlam text-black text-2xl">Senha</label>
        <input
          type="password"
          className="w-full p-2 rounded-xl bg-[#F78C26] mt-1 mb-6 border-4 border-black"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="w-full bg-red-600 hover:bg-red-700 transition p-2 rounded-xl border-4 border-black text-xl"
        >
          Entrar
        </button>
        <p className="text-center mt-4 text-xl">
          Não tem uma conta? 
          <Link to="/registro" className="text-[#F78C26] hover:underline ml-1 text-xl">
            Crie uma agora
          </Link>
        </p>
      </form>
    </div>
  );
}
