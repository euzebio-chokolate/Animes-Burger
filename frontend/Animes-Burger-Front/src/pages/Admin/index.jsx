import React, { useState, useEffect } from 'react';
import api from '../../services/api'; //

// Este componente é o seu AdminDashboard
const AdminDashboard = () => {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        //
        const { data } = await api.get('/admin/dashboard'); 
        setResumo(data);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p className="text-gray-500">Carregando dashboard...</p>;
  if (!resumo) return <p className="text-red-500">Erro ao carregar dados.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Pedidos Hoje</h2>
          <p className="text-4xl font-bold text-gray-900">{resumo.pedidosHoje}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Vendas Hoje</h2>
          <p className="text-4xl font-bold text-green-600">
            R$ {resumo.vendasHoje.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-600">Mais Vendidos Hoje</h2>
          {resumo.maisVendidos.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {resumo.maisVendidos.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.produto}</span>
                  <span className="font-bold">{item.quantidade}x</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">Nenhuma venda hoje.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;