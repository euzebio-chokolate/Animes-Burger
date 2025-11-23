import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#F9E8B0] rounded-2xl border-4 border-black shadow-2xl p-6 w-full max-w-md m-4 animate-fadeIn">
        
        {/* Título */}
        <h3 className="font-Adlam text-3xl text-center text-black mb-4">
          {title || "Tem certeza?"}
        </h3>

        {/* Mensagem */}
        <p className="font-Adlam text-xl text-gray-800 text-center mb-8">
          {message}
        </p>

        {/* Botões */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black font-Adlam text-xl py-2 px-6 rounded-xl border-4 border-black hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-red-600 text-white font-Adlam text-xl py-2 px-6 rounded-xl border-4 border-black hover:bg-red-700 transition-colors"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;