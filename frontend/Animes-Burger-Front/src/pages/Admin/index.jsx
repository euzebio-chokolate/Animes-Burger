import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  ArrowPathIcon,
  TrophyIcon,
  CalendarDaysIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 flex items-center justify-between transition-transform hover:scale-105" style={{ borderColor: color }}>
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider font-Adlam">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1 font-Adlam">{value}</p>
      {subtext && <p className="text-xs text-gray-400 mt-2 font-Adlam">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-full bg-opacity-20`} style={{ backgroundColor: `${color}33` }}>
      <Icon className="h-8 w-8" style={{ color: color }} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/dashboard');
      setResumo(data);
    } catch (err) {
      console.error("Erro ao carregar dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div></div>;
  if (!resumo) return <p className="text-red-500">Erro ao carregar dados.</p>;

  // Cálculo do Ticket Médio
  const ticketMedio = resumo.mes.pedidos > 0 
    ? resumo.mes.vendas / resumo.mes.pedidos 
    : 0;

  const maiorVenda = resumo.maisVendidos.length > 0 ? resumo.maisVendidos[0].quantidade : 1;

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-Atop font-semibold text-5xl mb-2 text-stroke text-[#F78C26]" style={{ textShadow: "4px 4px 0px #000" }}>
            Visão Geral
          </h1>
          <p className="text-gray-600 font-Adlam text-lg">Acompanhe o desempenho do Animes Burger</p>
        </div>
        <button 
          onClick={fetchDashboard}
          className="flex items-center space-x-2 bg-[#A0405A] text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition shadow-sm font-Adlam border-4 border-black"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>
      
      {/* Hoje */}
      <h2 className="font-Adlam text-2xl text-gray-800 border-b-2 border-gray-200 pb-2">Hoje</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-Adlam">
        <StatCard 
          title="Vendas Hoje"
          value={`R$ ${resumo.hoje.vendas.toFixed(2)}`}
          icon={CurrencyDollarIcon}
          color="#10B981" // Verde
          subtext={`${resumo.hoje.pedidos} pedidos realizados`}
        />
        <StatCard 
          title="Ticket Médio (Mês)"
          value={`R$ ${ticketMedio.toFixed(2)}`}
          icon={ChartBarIcon}
          color="#3B82F6" // Azul
          subtext="Média por pedido este mês"
        />
      </div>

      {/* Longo Prazo */}
      <h2 className="font-Adlam text-2xl text-gray-800 border-b-2 border-gray-200 pb-2 pt-4">Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-Adlam">
        <StatCard 
          title="Vendas Este Mês"
          value={`R$ ${resumo.mes.vendas.toFixed(2)}`}
          icon={CalendarDaysIcon}
          color="#8B5CF6" // Roxo
          subtext={`${resumo.mes.pedidos} pedidos no mês`}
        />
        <StatCard 
          title="Vendas Este Ano"
          value={`R$ ${resumo.ano.vendas.toFixed(2)}`}
          icon={CalendarIcon}
          color="#F59E0B" // Laranja
          subtext={`${resumo.ano.pedidos} pedidos no ano`}
        />
      </div>

      {/* Ranking */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mt-8">
        <div className="flex items-center space-x-2 mb-6">
          <TrophyIcon className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800 font-Adlam">Ranking de Produtos (Top 5)</h2>
        </div>

        {resumo.maisVendidos.length > 0 ? (
          <div className="space-y-5 font-Adlam">
            {resumo.maisVendidos.map((item, index) => {
              const percentual = (item.quantidade / maiorVenda) * 100;
              return (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">
                      #{index + 1} {item.produto}
                    </span>
                    <span className="font-bold text-gray-900">{item.quantidade} un.</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 border border-gray-300">
                    <div 
                      className="bg-[#F78C26] h-full rounded-full transition-all duration-1000 ease-out border-r-2 border-black"
                      style={{ width: `${percentual}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg font-Adlam">
            <p>Nenhuma venda registrada ainda.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;