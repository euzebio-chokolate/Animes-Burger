import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

const PixModal = ({ isOpen, onClose, pixData, onPaymentSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('pendente');

  // Função de Polling (Verifica o status a cada 5 segundos)
  useEffect(() => {
    let interval;
    if (isOpen && pixData?.id) {
      interval = setInterval(async () => {
        try {
          const { data } = await api.get(`/pagamento/${pixData.id}/status`);
          if (data.status === 'approved') {
            setStatus('approved');
            clearInterval(interval);
            onPaymentSuccess(); // Avisa o pai que pagou!
          }
        } catch (err) {
          console.error("Erro ao checar status", err);
        }
      }, 5000); // Checa a cada 5 segundos
    }
    return () => clearInterval(interval);
  }, [isOpen, pixData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixData.qr_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !pixData) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl border-4 border-black p-8 max-w-md w-full text-center shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] animate-pop-in">
        
        <h2 className="font-Atop text-3xl text-[#F78C26] text-stroke-sm mb-2">PAGAMENTO PIX</h2>
        <p className="font-Adlam text-gray-600 mb-6">Escaneie o QR Code ou copie o código abaixo.</p>

        {/* QR Code */}
        <div className="flex justify-center mb-6 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          {status === 'approved' ? (
             <div className="text-green-500 font-bold text-2xl flex flex-col items-center">
                <CheckIcon className="h-20 w-20 mb-2" />
                PAGAMENTO APROVADO!
             </div>
          ) : (
             <QRCodeSVG value={pixData.qr_code} size={200} />
          )}
        </div>

        {/* Copia e Cola */}
        {status !== 'approved' && (
            <div className="relative mb-8">
            <textarea 
                readOnly 
                value={pixData.qr_code} 
                className="w-full p-3 pr-12 rounded-xl border-2 border-gray-300 bg-gray-100 text-xs h-24 resize-none focus:outline-none font-mono"
            />
            <button 
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors"
                title="Copiar código"
            >
                {copied ? <CheckIcon className="h-5 w-5 text-green-600" /> : <ClipboardDocumentIcon className="h-5 w-5 text-black" />}
            </button>
            </div>
        )}

        {/* Botão Cancelar/Fechar */}
        <button 
            onClick={onClose}
            className="text-gray-500 underline font-Adlam hover:text-red-500 transition-colors"
        >
            Cancelar / Fechar
        </button>

        {/* Spinner de carregamento */}
        {status !== 'approved' && (
             <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 font-Adlam">
                <div className="animate-spin h-4 w-4 border-2 border-[#F78C26] border-t-transparent rounded-full"></div>
                Aguardando pagamento...
             </div>
        )}

      </div>
    </div>
  );
};

export default PixModal;