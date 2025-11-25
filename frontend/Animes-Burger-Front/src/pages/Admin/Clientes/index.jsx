import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import ConfirmModal from '../../../components/ConfirmModal';
import SuccessModal from '../../../components/SuccessModal';

// Componente de Tabela Estilizado e Responsivo
const TabelaClientes = ({ titulo, dados, corHeader, onPromover, onRebaixar }) => {
  return (
    <div className="mb-12">
      <h2 className="font-Adlam text-3xl md:text-4xl mb-4 text-black border-l-8 pl-4" style={{ borderColor: corHeader === 'bg-blue-900' ? '#1e3a8a' : '#A0405A' }}>
        {titulo} <span className="text-gray-500 text-2xl">({dados.length})</span>
      </h2>
      
      <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border-4 border-black font-Adlam">
        <div className="overflow-x-auto">
            <table className="min-w-full">
            <thead className={`${corHeader} text-white`}>
                <tr>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Nome</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Email</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Telefone</th>
                <th className="py-4 px-6 text-left text-lg md:text-xl border-b-4 border-black">Ações</th>
                </tr>
            </thead>
            <tbody className="text-gray-800">
                {dados.length > 0 ? (
                dados.map((cliente) => (
                    <tr key={cliente.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-lg">{cliente.usuario?.nome || 'N/A'}</td>
                    <td className="py-4 px-6 text-lg">{cliente.usuario?.email || 'N/A'}</td>
                    <td className="py-4 px-6 text-lg">{cliente.telefone || '-'}</td>
                    <td className="py-4 px-6">
                        {/* Botão de Promover */}
                        {onPromover && (
                        <button
                            onClick={() => onPromover(cliente.usuario.id, cliente.usuario.nome)}
                            className="flex items-center gap-2 text-blue-700 hover:text-white hover:bg-blue-700 font-bold text-base border-2 border-blue-700 rounded-lg px-3 py-1 transition-all shadow-sm hover:shadow-md"
                            title="Promover para Admin"
                        >
                            <UserPlusIcon className="h-5 w-5" />
                            Promover
                        </button>
                        )}
                        {/* Botão de Rebaixar */}
                        {onRebaixar && (
                        <button
                            onClick={() => onRebaixar(cliente.usuario.id, cliente.usuario.nome)}
                            className="flex items-center gap-2 text-red-600 hover:text-white hover:bg-red-600 font-bold text-base border-2 border-red-600 rounded-lg px-3 py-1 transition-all shadow-sm hover:shadow-md"
                            title="Remover Admin"
                        >
                            <UserMinusIcon className="h-5 w-5" />
                            Remover Admin
                        </button>
                        )}
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="4" className="p-8 text-center text-xl text-gray-500 bg-gray-50">
                    Nenhum registro encontrado.
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

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [acaoPendente, setAcaoPendente] = useState(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/clientes');
      setClientes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClientes(); }, []);

  const iniciarPromocao = (id, nome) => {
    setAcaoPendente({ type: 'promover', id, nome });
    setIsConfirmOpen(true);
  };

  const iniciarRebaixamento = (id, nome) => {
    setAcaoPendente({ type: 'rebaixar', id, nome });
    setIsConfirmOpen(true);
  };

  const confirmarAcao = async () => {
    if (!acaoPendente) return;

    try {
      if (acaoPendente.type === 'promover') {
        await api.put(`/admin/clientes/${acaoPendente.id}/promover`);
        setSuccessMessage(`${acaoPendente.nome} agora é um Administrador!`);
      } else {
        await api.put(`/admin/clientes/${acaoPendente.id}/rebaixar`);
        setSuccessMessage(`${acaoPendente.nome} foi removido dos admins.`);
      }
      
      setIsSuccessOpen(true);
      fetchClientes();

    } catch (err) {
      alert("Erro ao realizar a operação.");
    }
  };

  const getMensagemConfirmacao = () => {
    if (!acaoPendente) return "";
    if (acaoPendente.type === 'promover') {
      return `Tem certeza que deseja tornar "${acaoPendente.nome}" um ADMINISTRADOR? Ele terá acesso total ao painel.`;
    }
    return `Tem certeza que deseja remover o acesso de admin de "${acaoPendente.nome}"? Ele voltará a ser um usuário comum.`;
  };

  const admins = clientes.filter(c => c.usuario?.role === 'admin');
  const usuarios = clientes.filter(c => c.usuario?.role !== 'admin');

  if (loading) return (
    <div className="flex justify-center p-20">
        <p className="font-Adlam text-2xl animate-pulse">Carregando usuários...</p>
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
            .delay-200 { animation-delay: 0.2s; }
        `}</style>

      <h1 
        className="animate-slide-up font-Atop font-semibold text-4xl md:text-6xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]" 
        style={{ textShadow: "4px 4px 0px #000" }}
      >
        Gerenciar Usuários
      </h1>
      
      {/* Modais */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmarAcao}
        title={acaoPendente?.type === 'promover' ? "Promover Usuário" : "Remover Admin"}
        message={getMensagemConfirmacao()}
      />

      <SuccessModal 
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message={successMessage}
      />

      {/* Tabela de Admins (Animada - Delay 100ms) */}
      <div className="animate-slide-up delay-100">
        <TabelaClientes 
            titulo="Administradores" 
            dados={admins} 
            corHeader="bg-blue-900" 
            onRebaixar={iniciarRebaixamento} 
        />
      </div>

      {/* Tabela de Clientes (Animada - Delay 200ms) */}
      <div className="animate-slide-up delay-200">
        <TabelaClientes 
            titulo="Clientes (Usuários)" 
            dados={usuarios} 
            corHeader="bg-[#A0405A]" 
            onPromover={iniciarPromocao} 
        />
      </div>
    </div>
  );
};

export default AdminClientes;