import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  ArrowPathIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

// Componente para os Cards de Estatística
const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 flex items-center justify-between transition-transform hover:scale-105" style={{ borderColor: color }}>
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!resumo) return <p className="text-red-500">Erro ao carregar dados.</p>;

  // Cálculo do Ticket Médio (Evita divisão por zero)
  const ticketMedio = resumo.pedidosHoje > 0 
    ? resumo.vendasHoje / resumo.pedidosHoje 
    : 0;

  // Encontra a maior quantidade vendida para calcular a barra de porcentagem
  const maiorVenda = resumo.maisVendidos.length > 0 
    ? resumo.maisVendidos[0].quantidade 
    : 1;

  return (
    <div className="space-y-8">
      
      {/*Header com Botão de Refresh*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}>Visão Geral</h1>
          <p className="text-black font-Adlam">Resumo das atividades de hoje</p>
        </div>
        <button 
          onClick={fetchDashboard}
          className="flex items-center space-x-2 bg-[#A0405A] text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition shadow-sm font-Adlam border-4 border-black"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>
      
      {/* Grid de Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-Adlam">
        
        <StatCard 
          title="Vendas Hoje"
          value={`R$ ${resumo.vendasHoje.toFixed(2)}`}
          icon={CurrencyDollarIcon}
          color="#10B981" // Verde
          subtext="Total faturado hoje"
        />

        <StatCard 
          title="Pedidos Hoje"
          value={resumo.pedidosHoje}
          icon={ShoppingBagIcon}
          color="#F59E0B" // Amarelo
          subtext="Pedidos realizados"
        />

        <StatCard 
          title="Ticket Médio"
          value={`R$ ${ticketMedio.toFixed(2)}`}
          icon={ChartBarIcon}
          color="#3B82F6" // Azul
          subtext="Valor médio por pedido"
        />
      </div>

      {/* Seção de Mais Vendidos com Gráfico de Barra Simples */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <TrophyIcon className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800 font-Adlam">Ranking de Produtos</h2>
        </div>

        {resumo.maisVendidos.length > 0 ? (
          <div className="space-y-5">
            {resumo.maisVendidos.map((item, index) => {
              // Calcula a largura da barra com base no item mais vendido
              const percentual = (item.quantidade / maiorVenda) * 100;
              
              return (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">
                      {index + 1}. {item.produto}
                    </span>
                    <span className="font-bold text-gray-900">{item.quantidade} vendas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#8A3249] h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentual}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
            <p>Nenhuma venda registrada hoje.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;