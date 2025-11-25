import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="animate-pop-in bg-[#F9E8B0] rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-md relative z-10 flex flex-col items-center text-center">
        
        {/* Ícone de Alerta */}
        <div className="bg-yellow-400 rounded-full p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <ExclamationTriangleIcon className="h-12 w-12 text-black" />
        </div>

        {/* Título */}
        <h3 
            className="font-Atop font-bold text-3xl md:text-4xl text-black mb-4 text-stroke-sm tracking-wide"
        >
          {title || "TEM CERTEZA?"}
        </h3>

        {/* Mensagem */}
        <p className="font-Adlam text-xl text-gray-800 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 bg-white text-black font-Adlam text-xl py-3 px-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Cancelar
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-red-600 text-white font-Adlam text-xl py-3 px-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Sim, Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;