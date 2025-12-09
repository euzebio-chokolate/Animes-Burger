import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-pop-in {
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="animate-pop-in bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative z-10 flex flex-col items-center text-center">
        
        {/* Ícone */}
        <div className="bg-red-600 rounded-full p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <XCircleIcon className="h-16 w-16 text-white" />
        </div>

        {/* Título */}
        <h3 
            className="font-Atop font-bold text-4xl text-red-600 mb-4 text-stroke tracking-wide"
            style={{ textShadow: "2px 2px 0px #000" }}
        >
          OPS! ALGO DEU ERRADO
        </h3>

        {/* Mensagem */}
        <p className="font-Adlam text-xl text-gray-800 mb-8 leading-relaxed">
          {message || "Ocorreu um erro inesperado. Tente novamente."}
        </p>

        {/* Botão */}
        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white font-Adlam text-2xl py-3 px-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:bg-red-800"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;