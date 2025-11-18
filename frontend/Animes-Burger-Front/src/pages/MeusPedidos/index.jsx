import React, { useState, useEffect } from 'react';
import api from '../../services/api'; //
import { Link } from 'react-router-dom';

// Componente para um único card de pedido
const PedidoCard = ({ pedido }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border-4 border-black">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold font-adlam text-gray-800">
          Pedido #{pedido.id}
        </h3>
        {/* Status do Pedido */}
        <span className={`px-4 py-1 rounded-full text-sm font-bold font-adlam border-2 border-black ${
          pedido.status === 'pendente' ? 'bg-yellow-400 text-yellow-900' :
          pedido.status === 'concluido' ? 'bg-green-400 text-green-900' :
          pedido.status === 'cancelado' ? 'bg-red-400 text-red-900' :
          'bg-blue-400 text-blue-900'
        }`}>
          {pedido.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4 font-adlam">
        {new Date(pedido.data_hora).toLocaleString('pt-BR')}
      </p>
      
      {/* Itens do Pedido */}
      <div className="border-t border-gray-300 pt-4">
        <h4 className="font-adlam text-lg font-semibold mb-2">Itens:</h4>
        {pedido.itens.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-md mb-1 font-adlam">
            <span className="text-gray-700">
              {item.quantidade}x {item.produto.nome}
            </span>
            <span className="text-gray-900 font-semibold">
              R$ {(item.preco_unitario * item.quantidade).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t-2 border-dashed border-gray-400 mt-4 pt-4 flex justify-between items-center">
        <span className="text-xl font-bold font-adlam text-black">Total</span>
        <span className="text-2xl font-bold font-adlam text-black">
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
        // 1. Chama a rota segura do cliente
        // O api.js anexa o token automaticamente
        const { data } = await api.get('/clientes/pedidos');
        setPedidos(data); // O backend já retorna ordenado
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError("Não foi possível carregar seus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []); // Roda apenas uma vez

  return (
    <div className="bg-[#F9E8B0] min-h-screen p-4 py-12 flex flex-col items-center">
      <h1 
        className="font-Atop font-semibold text-7xl text-center mb-4 text-stroke text-[#F78C26]"
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        Meus Pedidos
      </h1>

      <div className="container mx-auto max-w-3xl">
        {loading && (
          <p className="text-center text-gray-700 font-Adlam text-2xl">Carregando seus pedidos...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-adlam text-2xl">{error}</p>
        )}

        {!loading && !error && (
          <>
            {pedidos.length === 0 ? (
              <div className="text-center bg-white p-8 rounded-2xl border-4 border-black shadow-lg">
                <p className="text-gray-700 font-Adlam text-2xl mb-6">
                  Você ainda não fez nenhum pedido.
                </p>
                <Link 
                  to="/cardapio" 
                  className="font-Adlam text-2xl bg-red-600 text-white py-3 px-8 rounded-lg border-4 border-black shadow-md hover:bg-red-700 transition-colors"
                >
                  Ver Cardápio
                </Link>
              </div>
            ) : (
              <div className="space-y-6 font-Adlam">
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