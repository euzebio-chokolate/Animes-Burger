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

  if (loading) return <p className="text-center p-10 font-Adlam text-xl">Carregando pedidos...</p>;

  return (
    <div>
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>Gerenciar Pedidos</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border-4 border-black font-Adlam">
        <table className="min-w-full">
          <thead className="bg-[#F78C26] text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Cliente / Obs</th>
              <th className="py-3 px-4 text-left">Itens</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-bold">#{pedido.id}</td>
                
                <td className="py-3 px-4">
                  <div className="font-bold">{pedido.cliente?.usuario?.nome || 'Anônimo'}</div>
                  
                  {/*Exibe a observação se existir*/}
                  {pedido.observacoes && (
                    <div className="mt-1 text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200 flex items-start gap-1">
                      <ChatBubbleBottomCenterTextIcon className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>"{pedido.observacoes}"</span>
                    </div>
                  )}
                </td>

                <td className="py-3 px-4 text-sm">
                  {pedido.itens?.map((item, idx) => (
                    <div key={idx}>
                      {item.quantidade}x {item.produto?.nome}
                    </div>
                  ))}
                </td>

                <td className="py-3 px-4 font-bold text-green-700">
                  R$ {pedido.valor_total?.toFixed(2)}
                </td>

                <td className="py-3 px-4">
                  <select 
                    value={pedido.status}
                    onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                    className={`border-2 border-black rounded-md p-1 font-bold ${
                        pedido.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                        pedido.status === 'preparando' ? 'bg-orange-100 text-orange-800' :
                        pedido.status === 'entrega' ? 'bg-blue-100 text-blue-800' :
                        pedido.status === 'concluido' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPedidos;