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

// Componente de Card Estilizado
const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between transition-transform hover:-translate-y-1 hover:scale-[1.02]">
    <div>
      <p className="text-gray-500 text-sm font-bold uppercase tracking-wider font-Adlam">{title}</p>
      <p className="text-3xl font-bold text-black mt-1 font-Adlam">{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-2 font-Adlam bg-gray-100 px-2 py-1 rounded inline-block">{subtext}</p>}
    </div>
    <div className={`p-4 rounded-xl border-2 border-black shadow-sm`} style={{ backgroundColor: `${color}33` }}>
      <Icon className="h-8 w-8 stroke-2" style={{ color: color === '#10B981' ? '#065F46' : color === '#F59E0B' ? '#92400E' : color }} />
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

  if (loading) return (
    <div className="flex justify-center p-20">
        <p className="font-Adlam text-2xl animate-pulse">Carregando dashboard...</p>
    </div>
  );
  
  if (!resumo) return <p className="text-red-600 font-Adlam text-xl text-center mt-10">Erro ao carregar dados.</p>;

  const ticketMedio = resumo.mes.pedidos > 0 
    ? resumo.mes.vendas / resumo.mes.pedidos 
    : 0;

  const maiorVenda = resumo.maisVendidos.length > 0 ? resumo.maisVendidos[0].quantidade : 1;

  return (
    <div className="space-y-8 pb-10 overflow-x-hidden p-5">
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
        `}</style>
      
      {/* Header */}
      <div className="animate-slide-up flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-Atop font-semibold text-5xl mb-1 text-stroke text-[#F78C26]" style={{ textShadow: "3px 3px 0px #000" }}>
            Visão Geral
          </h1>
          <p className="text-gray-600 font-Adlam text-lg">Bem-vindo de volta, Admin!</p>
        </div>
        <button 
          onClick={fetchDashboard}
          className="flex items-center space-x-2 bg-[#F78C26] text-white px-5 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all font-Adlam text-lg"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>
      
      {/* --- HOJE --- */}
      <div className="animate-slide-up delay-100">
        <h2 className="font-Adlam text-2xl text-black mb-4 border-l-4 border-[#A0405A] pl-3">Hoje</h2>
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
            subtext="Média por pedido"
            />
        </div>
      </div>

      {/* --- PERFORMANCE --- */}
      <div className="animate-slide-up delay-200">
        <h2 className="font-Adlam text-2xl text-black mb-4 mt-2 border-l-4 border-[#A0405A] pl-3">Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-Adlam">
            <StatCard 
            title="Vendas Este Mês"
            value={`R$ ${resumo.mes.vendas.toFixed(2)}`}
            icon={CalendarDaysIcon}
            color="#8B5CF6" // Roxo
            subtext={`${resumo.mes.pedidos} pedidos`}
            />
            <StatCard 
            title="Vendas Este Ano"
            value={`R$ ${resumo.ano.vendas.toFixed(2)}`}
            icon={CalendarIcon}
            color="#F59E0B" // Laranja
            subtext={`${resumo.ano.pedidos} pedidos`}
            />
        </div>
      </div>

      {/* --- RANKING --- */}
      <div className="animate-slide-up delay-200 bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
        <div className="flex items-center space-x-3 mb-8 border-b-2 border-gray-200 pb-4">
          <div className="bg-yellow-100 p-2 rounded-lg border-2 border-black">
            <TrophyIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black font-Adlam">Top 5 Produtos</h2>
        </div>

        {resumo.maisVendidos.length > 0 ? (
          <div className="space-y-6 font-Adlam">
            {resumo.maisVendidos.map((item, index) => {
              const percentual = (item.quantidade / maiorVenda) * 100;
              return (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-2 text-lg">
                    <span className="font-bold text-gray-800 flex items-center gap-2">
                      <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded text-sm">{index + 1}</span> 
                      {item.produto}
                    </span>
                    <span className="font-bold text-[#A0405A]">{item.quantidade} un.</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-5 border-2 border-black overflow-hidden">
                    <div 
                      className="bg-[#F78C26] h-full transition-all duration-1000 ease-out border-r-2 border-black striped-bar"
                      style={{ width: `${percentual}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 font-Adlam text-xl bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p>Nenhuma venda registrada ainda.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;