import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F9E8B0] rounded-2xl border-4 border-black shadow-2xl p-8 w-full max-w-md m-4 flex flex-col items-center animate-fadeIn">
        
        {/* Ícone de Erro */}
        <XCircleIcon className="h-20 w-20 text-red-600 mb-4" />

        {/* Título */}
        <h3 className="font-Adlam text-4xl text-center text-black mb-2 text-stroke-sm">
          Ops!
        </h3>

        {/* Mensagem */}
        <p className="font-Adlam text-xl text-gray-800 text-center mb-8">
          {message || "Algo deu errado."}
        </p>

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="w-full bg-[#8A3249] text-white font-Adlam text-2xl py-2 px-6 rounded-xl border-4 border-black hover:bg-[#A0405A] transition-colors shadow-md"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;