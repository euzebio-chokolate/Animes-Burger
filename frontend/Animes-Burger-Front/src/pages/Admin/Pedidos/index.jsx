import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; //

// Este componente é o seu AdminPedidos
const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        //
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

  // Atualiza o status
  const handleStatusChange = async (pedidoId, novoStatus) => {
    try {
      //
      const { data: pedidoAtualizado } = await api.put(
        `/admin/pedidos/${pedidoId}/status`, 
        { status: novoStatus }
      );
      
      // Atualiza a lista
      setPedidos(pedidos.map(p => 
        p.id === pedidoId ? pedidoAtualizado : p
      ));
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  if (loading) return <p>Carregando pedidos...</p>;

  return (
    <div>
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>Gerenciar Pedidos</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden font-Adlam">
        <table className="min-w-full">
          <thead className="bg-[#A0405A] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Cliente</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{pedido.cliente?.usuario?.nome || 'N/A'}</td>
                <td className="py-3 px-4">R$ {pedido.valor_total.toFixed(2)}</td>
                <td className="py-3 px-4">{new Date(pedido.data_hora).toLocaleString('pt-BR')}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pedido.status === 'pendente' ? 'bg-yellow-200 text-yellow-800' :
                    pedido.status === 'concluido' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {pedido.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select 
                    value={pedido.status}
                    onChange={(e) => handleStatusChange(pedido.id, e.target.value)}
                    className="border border-gray-300 rounded-md p-1"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="preparando">Em Preparo</option>
                    <option value="entrega">Saiu p/ Entrega</option>
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