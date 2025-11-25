import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Estilos da Animação */}
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Overlay Escuro */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Card do Modal */}
      <div className="animate-pop-in bg-[#F9E8B0] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative z-10 flex flex-col items-center text-center">
        
        {/* Ícone */}
        <div className="bg-green-500 rounded-full p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <CheckCircleIcon className="h-16 w-16 text-white" />
        </div>

        {/* Título */}
        <h3 
            className="font-Atop font-bold text-4xl text-[#F78C26] mb-4 text-stroke tracking-wide"
            style={{ textShadow: "2px 2px 0px #000" }}
        >
          SUCESSO!
        </h3>

        {/* Mensagem */}
        <p className="font-Adlam text-xl text-black mb-8 leading-relaxed">
          {message}
        </p>

        {/* Botão */}
        <button
          onClick={onClose}
          className="w-full bg-[#8A3249] text-white font-Adlam text-2xl py-3 px-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:bg-[#70283b]"
        >
          OK, Entendi!
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;