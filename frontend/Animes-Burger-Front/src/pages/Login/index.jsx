import { useState } from "react";
import api from "../../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import ErrorModal from "../../components/ErrorModal.jsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    
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
      const msg = err.response?.data?.erro || "Email ou senha incorretos.";
      setErrorMessage(msg);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />

      <div className="min-h-screen flex items-center justify-center bg-[#F9E8B0] p-6 overflow-hidden">
        
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
          onSubmit={handleLogin}
          className="animate-slide-up bg-white p-8 md:p-10 rounded-3xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black flex flex-col m-2"
        >
          <h1 
            className="font-Atop font-bold text-5xl md:text-6xl text-center mb-8 text-stroke text-[#F78C26] drop-shadow-lg"
            style={{ textShadow: "4px 4px 0px #000" }}
          >
            LOGIN
          </h1>

          <div className="mb-6">
            <label className="block font-Adlam text-xl text-black mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] focus:ring-0 outline-none transition-colors"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-8 relative">
            <label className="block font-Adlam text-xl text-black mb-2">Senha</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 pr-12 rounded-xl border-4 border-gray-300 bg-gray-50 text-lg font-Adlam focus:border-[#F78C26] focus:ring-0 outline-none transition-colors"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 translate-y-2 text-gray-500 hover:text-[#F78C26] transition-colors"
                    style={{ marginTop: '-12px' }}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-6 w-6" />
                    ) : (
                        <EyeIcon className="h-6 w-6" />
                    )}
                </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8A3249] text-white font-Adlam text-2xl py-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#A0405A] hover:translate-y-1 hover:shadow-none transition-all disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center mt-6 text-lg font-Adlam text-gray-600">
            Não tem uma conta? 
            <Link 
              to="/registro" 
              className="text-[#F78C26] hover:text-[#E57A1E] hover:underline ml-2 font-bold transition-colors"
            >
              Crie uma agora
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}