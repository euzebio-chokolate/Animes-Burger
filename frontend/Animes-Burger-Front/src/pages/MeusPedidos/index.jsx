import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import { Link } from 'react-router-dom';

// Componente para um único card de pedido
const PedidoCard = ({ pedido }) => {
  return (
    // Card com sombras fortes e borda grossa (Estilo do site)
    <div className="bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 border-4 border-black transition-transform duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      
      {/* Cabeçalho do Card: ID e Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h3 className="text-2xl md:text-3xl font-bold font-Adlam text-gray-900">
          Pedido #{pedido.id}
        </h3>
        
        <span className={`px-4 py-1 rounded-full text-sm md:text-base font-bold font-Adlam border-2 border-black shadow-sm ${
          pedido.status === 'pendente' ? 'bg-yellow-300 text-yellow-900' :
          pedido.status === 'preparando' ? 'bg-orange-300 text-orange-900' :
          pedido.status === 'entrega' ? 'bg-blue-300 text-blue-900' :
          pedido.status === 'concluido' ? 'bg-green-400 text-green-900' :
          'bg-red-400 text-red-900'
        }`}>
          {pedido.status.toUpperCase()}
        </span>
      </div>
      
      <p className="text-sm md:text-base text-gray-500 mb-4 font-Adlam border-b-2 border-dashed border-gray-300 pb-4">
        Realizado em: {new Date(pedido.data_hora).toLocaleString('pt-BR')}
      </p>
      
      {/* Lista de Itens */}
      <div className="space-y-2">
        <h4 className="font-Adlam text-lg md:text-xl font-semibold text-black mb-2">Itens:</h4>
        {pedido.itens.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-base md:text-lg mb-1 font-Adlam">
            <span className="text-gray-700">
              <span className="font-bold text-black">{item.quantidade}x</span> {item.produto.nome}
            </span>
            <span className="text-gray-900 font-bold">
              R$ {(item.preco_unitario * item.quantidade).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Total do Pedido */}
      <div className="border-t-4 border-black mt-6 pt-4 flex justify-between items-center">
        <span className="text-xl md:text-2xl font-bold font-Adlam text-black">Total</span>
        <span className="text-3xl md:text-4xl font-bold font-Adlam text-[#F78C26] text-stroke-sm" style={{ textShadow: "1px 1px 0 #000" }}>
          R$ {Number(pedido.valor_total).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

// Componente principal da Página
const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/clientes/pedidos');
        setPedidos(data); 
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError("Não foi possível carregar seus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []); 

  return (
    <div className="bg-[#F9E8B0] min-h-screen p-4 md:p-8 py-12 flex flex-col items-center overflow-x-hidden">
        
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

      {/* Título Animado */}
      <h1 
        className="animate-slide-up font-Atop font-bold text-5xl md:text-7xl text-center mb-12 text-stroke text-[#F78C26] drop-shadow-lg"
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        MEUS PEDIDOS
      </h1>

      <div className="container mx-auto max-w-3xl w-full">
        {loading && (
          <p className="animate-slide-up delay-100 text-center text-gray-700 font-Adlam text-2xl py-10">
            Carregando seus pedidos...
          </p>
        )}

        {error && (
          <p className="animate-slide-up delay-100 text-center text-red-600 font-Adlam text-2xl py-10">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {pedidos.length === 0 ? (
              // Estado Vazio Animado
              <div className="animate-slide-up delay-100 text-center bg-white p-8 md:p-12 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl mx-auto">
                <p className="text-gray-800 font-Adlam text-2xl md:text-3xl mb-8">
                  Você ainda não fez nenhum pedido 😢
                </p>
                <Link 
                  to="/cardapio" 
                  className="inline-block font-Adlam text-xl md:text-2xl bg-[#F78C26] text-white py-3 px-10 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Ver Cardápio
                </Link>
              </div>
            ) : (
              // Lista de Pedidos Animada
              <div className="animate-slide-up delay-200 space-y-8">
                {pedidos.map((pedido) => (
                  <PedidoCard key={pedido.id} pedido={pedido} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MeusPedidos;