import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const { data } = await api.get('/admin/pedidos');
        setPedidos(data);
      } catch (err) {
        console.error("Erro ao buscar pedidos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  const handleStatusChange = async (pedidoId, novoStatus) => {
    try {
      const { data: pedidoAtualizado } = await api.put(
        `/admin/pedidos/${pedidoId}/status`, 
        { status: novoStatus }
      );
      setPedidos(pedidos.map(p => p.id === pedidoId ? pedidoAtualizado : p));
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  if (loading) return (
    <div className="flex justify-center p-20">
        <p className="font-Adlam text-2xl animate-pulse">Carregando pedidos...</p>
    </div>
  );

  return (
    <div className="overflow-x-hidden pb-10 p-5">
        
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
        `}</style>

      <h1 
        className="animate-slide-up font-Atop font-semibold text-4xl md:text-6xl mb-8 md:mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        Gerenciar Pedidos
      </h1>
      
      {/* Tabela Responsiva e Animada */}
      <div className="animate-slide-up delay-100 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border-4 border-black font-Adlam">
        <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead className="bg-[#F78C26] text-white">
                <tr>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">ID</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Cliente / Obs</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black min-w-[200px]">Itens</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Total</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Status</th>
                </tr>
            </thead>
            <tbody className="text-gray-800">
                {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                    <tr key={pedido.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-lg">#{pedido.id}</td>
                    
                    <td className="py-4 px-6">
                        <div className="font-bold text-lg">{pedido.cliente?.usuario?.nome || 'Anônimo'}</div>
                        
                        {/* Exibe a observação se existir */}
                        {pedido.observacoes && (
                        <div className="mt-2 text-sm font-bold text-red-600 bg-red-50 p-2 rounded-lg border-2 border-red-200 flex items-start gap-1 max-w-xs">
                            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mt-0.5 shrink-0" />
                            <span>"{pedido.observacoes}"</span>
                        </div>
                        )}
                    </td>

                    <td className="py-4 px-6 text-base">
                        {pedido.itens?.map((item, idx) => (
                        <div key={idx} className="mb-1">
                            <span className="font-bold">{item.quantidade}x</span> {item.produto?.nome}
                        </div>
                        ))}
                    </td>

                    <td className="py-4 px-6 font-bold text-[#000] text-lg">
                        R$ {pedido.valor_total?.toFixed(2)}
                    </td>

                    <td className="py-4 px-6">
                        <select 
                        value={pedido.status}
                        onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                        className={`border-2 border-black rounded-xl p-2 font-bold text-base focus:outline-none shadow-sm cursor-pointer transition-colors ${
                            pedido.status === 'pendente' ? 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200' :
                            pedido.status === 'preparando' ? 'bg-orange-100 text-orange-900 hover:bg-orange-200' :
                            pedido.status === 'entrega' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' :
                            pedido.status === 'retirada' ? 'bg-purple-100 text-purple-900 hover:bg-purple-200' :
                            pedido.status === 'concluido' ? 'bg-green-100 text-green-900 hover:bg-green-200' :
                            'bg-red-100 text-red-900 hover:bg-red-200'
                        }`}
                        >
                        <option value="pendente">Pendente</option>
                        <option value="preparando">Em Preparo</option>
                        <option value="entrega">Saiu p/ Entrega</option>
                        <option value="retirada">Pronto p/ Retirada</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                        </select>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="5" className="p-10 text-center text-xl text-gray-500 bg-gray-50">
                    Nenhum pedido encontrado.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPedidos;