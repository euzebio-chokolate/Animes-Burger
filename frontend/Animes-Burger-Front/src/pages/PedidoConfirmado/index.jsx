import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api'; 
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

const PedidoConfirmado = () => {
  const { id } = useParams(); 
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca o pedido no banco
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const { data } = await api.get(`/pedidos/${id}`);
        setPedido(data);
      } catch (err) {
        console.error("Erro ao buscar pedido", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id]);

  if (loading) return (
    <div className="bg-[#F9E8B0] min-h-screen flex items-center justify-center">
      <p className="font-Adlam text-2xl text-black animate-pulse">Carregando...</p>
    </div>
  );

  if (!pedido) return (
    <div className="bg-[#F9E8B0] min-h-screen flex items-center justify-center">
      <p className="font-Adlam text-2xl text-black">Pedido não encontrado.</p>
    </div>
  );

  // Pega o tempo do banco ou usa 45 como padrão
  const tempoEstimado = pedido.tempo_estimado || 45;

  return (
    <div className="bg-[#F9E8B0] min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center overflow-hidden">
        
        {/* Estilos de Animação */}
        <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.8s ease-out forwards;
                opacity: 0;
            }
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
        `}</style>
      
      <div className="animate-slide-up flex flex-col items-center">
        <CheckCircleIcon className="h-20 w-20 md:h-24 md:w-24 text-green-600 mb-6 md:mb-8 drop-shadow-md" />
        
        <h1 
            className="font-Atop font-bold text-4xl sm:text-5xl md:text-7xl text-center mb-4 text-stroke text-[#F78C26] drop-shadow-lg leading-tight"
            style={{ textShadow: "4px 4px 0px #000" }}
        >
            PEDIDO CONFIRMADO!
        </h1>
        
        <p className="font-Adlam text-xl md:text-2xl text-black mb-8 md:mb-10 max-w-md">
            Seu hambúrguer está sendo preparado com todo o poder!
        </p>
      </div>

      {/* Card do ID (Delay 100ms) */}
      <div className="animate-slide-up delay-100 bg-white border-4 border-black rounded-2xl px-8 py-4 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform transition hover:-translate-y-1">
        <span className="font-Adlam text-xl md:text-2xl text-black">
          Pedido #{pedido.id}
        </span>
      </div>

      {/* Card do Tempo (Delay 200ms) */}
      <div className="animate-slide-up delay-200 bg-white border-4 border-black rounded-3xl px-6 py-8 md:px-12 md:py-10 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-xs md:max-w-md transform transition hover:scale-105 duration-300">
        <div className="flex justify-center mb-4">
            <ClockIcon className="h-8 w-8 md:h-10 md:w-10 text-[#F78C26]" />
        </div>
        <p className="font-Adlam text-lg md:text-xl text-black/70 mb-2 uppercase tracking-wide">Tempo Estimado</p>
        
        <p 
          className="font-Adlam text-5xl md:text-7xl text-[#F78C26] text-stroke my-2 leading-none"
          style={{ textShadow: "2px 2px 0px #000" }}
        >
          {tempoEstimado} <span className="text-2xl md:text-3xl text-black text-stroke-0" style={{ textShadow: "none" }}>min</span>
        </p>
        
        <p className="font-Adlam text-base md:text-lg text-gray-600 mt-4 bg-gray-100 inline-block px-3 py-1 rounded-lg">
          Avisaremos quando estiver pronto!
        </p>
      </div>

      <div className="animate-slide-up delay-300">
        <Link 
            to="/meus-pedidos"
            className="inline-block font-Adlam text-xl md:text-2xl bg-[#F78C26] text-white py-3 px-10 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E57A1E] hover:translate-y-1 hover:shadow-none transition-all"
        >
            Ver Meus Pedidos
        </Link>
      </div>

    </div>
  );
};

export default PedidoConfirmado;