import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PedidoConfirmado = () => {
  const { id } = useParams(); 
  
  const tempoEstimado = "50 minutos"; 

  return (
    <div className="bg-[#F9E8B0] min-h-screen flex flex-col items-center justify-center p-6 text-center">
      
      {/* Ícone Verde */}
      <CheckCircleIcon className="h-24 w-24 text-green-500 mb-7" />
      
      {/* Título */}
      <h1 
        className="font-Atop font-semibold text-7xl text-center mb-4 text-stroke text-[#F78C26]"
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        PEDIDO CONFIRMADO!
      </h1>
      
      <p className="font-Adlam text-2xl text-black mb-8">
        Seu hambúrguer está sendo preparado!
      </p>

      {/* ID do Pedido */}
      <div className="bg-white border-4 border-black rounded-lg px-6 py-3 mb-6 shadow-md">
        <span className="font-Adlam text-2xl text-black">
          Pedido #{id}
        </span>
      </div>

      {/* Tempo Estimado */}
      <div className="bg-white border-4 border-black rounded-lg px-10 py-6 mb-10 shadow-md w-full max-w-sm">
        <p className="font-Adlam text-xl text-black mb-1">Tempo Estimado</p>
        <p 
          className="font-Adlam text-7xl text-[#F78C26] text-stroke"
          style={{ textShadow: "2px 2px 0px #000" }}
        >
          {tempoEstimado}
        </p>
        <p className="font-Adlam text-lg text-gray-700 mt-2">
          Vamos avisar quando estiver pronto!
        </p>
      </div>

      <Link 
        to="/meus-pedidos"
        className="font-Adlam text-2xl bg-[#F78C26] text-stroke text-white py-3 px-8 rounded-lg border-4 border-black shadow-md hover:bg-red-700 transition-colors"
      >
        Ver Meus Pedidos
      </Link>
    </div>
  );
};

export default PedidoConfirmado;