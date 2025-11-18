import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; //

const AdminClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        // 1. Chama a rota de admin para listar clientes
        const { data } = await api.get('/admin/clientes');
        setClientes(data);
      } catch (err) {
        console.error("Erro ao buscar clientes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []); // Roda apenas uma vez

  if (loading) return <p>Carregando clientes...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Clientes Cadastrados</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Telefone</th>
              <th className="py-3 px-4 text-left">Cliente Desde</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b hover:bg-gray-50">
                {/* O back-end já inclui o 'usuario' */}
                <td className="py-3 px-4">{cliente.usuario?.nome || 'N/A'}</td>
                <td className="py-3 px-4">{cliente.usuario?.email || 'N/A'}</td>
                <td className="py-3 px-4">{cliente.telefone || 'Não cadastrado'}</td>
                <td className="py-3 px-4">
                  {new Date(cliente.usuario?.createdAt).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClientes;