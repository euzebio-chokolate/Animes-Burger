import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const irParaLogin = () => {
    navigate('/login');
  };

  const irParaRegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      {/* Estilo da Animação Pop-in */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Fundo Escuro */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Card do Modal */}
      <div className="animate-pop-in bg-[#F9E8B0] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative z-10 flex flex-col items-center text-center">
        
        {/* Botão Fechar */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-[#F78C26] transition-colors"
        >
            <XMarkIcon className="h-8 w-8" />
        </button>

        {/* Ícone */}
        <div className="bg-[#F78C26] rounded-full p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <UserCircleIcon className="h-16 w-16 text-white" />
        </div>

        {/* Título */}
        <h3 
            className="font-Atop font-bold text-4xl text-black mb-4 text-stroke-sm tracking-wide"
        >
          LOGIN NECESSÁRIO
        </h3>

        {/* Mensagem */}
        <p className="font-Adlam text-xl text-gray-800 mb-8 leading-relaxed">
          Para adicionar delícias ao seu carrinho, você precisa entrar na sua conta.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-3 w-full">
            <button
                onClick={irParaLogin}
                className="w-full bg-[#8A3249] text-white font-Adlam text-2xl py-3 px-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
            >
                Fazer Login
            </button>
            
            <button
                onClick={irParaRegistro}
                className="w-full bg-white text-black font-Adlam text-xl py-3 px-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
            >
                Criar Conta
            </button>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;