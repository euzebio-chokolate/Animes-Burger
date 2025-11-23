import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline'; // Novos ícones
import ConfirmModal from '../../../components/ConfirmModal';
import SuccessModal from '../../../components/SuccessModal'; 

const TabelaClientes = ({ titulo, dados, corHeader, onPromover, onRebaixar }) => {
  return (
    <div className="mb-10">
      <h2 className="font-Adlam text-3xl mb-4 text-gray-800">{titulo} ({dados.length})</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border-4 border-black font-Adlam">
        <table className="min-w-full">
          <thead className={`${corHeader} text-white`}>
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Telefone</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dados.length > 0 ? (
              dados.map((cliente) => (
                <tr key={cliente.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-bold">{cliente.usuario?.nome || 'N/A'}</td>
                  <td className="py-3 px-4">{cliente.usuario?.email || 'N/A'}</td>
                  <td className="py-3 px-4">{cliente.telefone || '-'}</td>
                  <td className="py-3 px-4">
                    {/* Botão de Promover (Só aparece para usuários comuns) */}
                    {onPromover && (
                      <button
                        onClick={() => onPromover(cliente.usuario.id, cliente.usuario.nome)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold text-sm border-2 border-blue-600 rounded px-2 py-1 hover:bg-blue-50 transition-colors"
                        title="Promover para Admin"
                      >
                        <UserPlusIcon className="h-5 w-5" />
                        Promover
                      </button>
                    )}
                    {onRebaixar && (
                      <button
                        onClick={() => onRebaixar(cliente.usuario.id, cliente.usuario.nome)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold text-sm border-2 border-red-600 rounded px-2 py-1 hover:bg-red-50 transition-colors"
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
              <tr><td colSpan="4" className="p-6 text-center">Nenhum registro.</td></tr>
            )}
          </tbody>
        </table>
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

  if (loading) return <p className="text-center p-10 font-Adlam text-xl">Carregando...</p>;

  return (
    <div>
      <h1 className="font-Atop font-semibold text-5xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]" style={{ textShadow: "6px 6px 0px #000" }}>
        Gerenciar Usuários
      </h1>
      
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

      <TabelaClientes 
        titulo="Administradores" 
        dados={admins} 
        corHeader="bg-blue-900" 
        onRebaixar={iniciarRebaixamento}
      />

      <TabelaClientes 
        titulo="Clientes (Usuários)" 
        dados={usuarios} 
        corHeader="bg-[#A0405A]" 
        onPromover={iniciarPromocao}
      />
    </div>
  );
};

export default AdminClientes;