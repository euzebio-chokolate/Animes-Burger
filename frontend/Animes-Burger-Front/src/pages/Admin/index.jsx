import React, { useState, useEffect } from 'react';

// --- Componente Modal ---
// Um componente separado para o modal de criação/edição
function UserModal({ user, onSave, onClose }) {
  // O modal gerencia seu próprio estado de formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Visitante',
  });

  // `useEffect` é usado para preencher o formulário quando o prop `user` (para edição) é passado
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      // Limpa o formulário se for para criar um novo usuário
      setFormData({ name: '', email: '', role: 'Visitante' });
    }
  }, [user]); // Este efeito roda sempre que o `user` prop mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Passa os dados do formulário (e o ID, se for edição) para a função onSave
    onSave({ ...formData, id: user ? user.id : null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-100">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transition-transform duration-300 ease-in-out transform scale-100">
        
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {user ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Função</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
              <option value="Visitante">Visitante</option>
            </select>
          </div>
          
          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Componente Principal do Conteúdo CRUD ---
function UserCrudPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserToEdit, setCurrentUserToEdit] = useState(null);

  // Simula o carregamento dos dados da API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  const handleOpenCreateModal = () => {
    setCurrentUserToEdit(null); // Garante que é o modo "criar"
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setCurrentUserToEdit(user); // Passa o usuário para o modo "editar"
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUserToEdit(null); // Limpa o usuário em edição
  };

  // (DELETE)
  const handleDeleteUser = (userId) => {
    // Aqui você pode adicionar um modal de confirmação
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  // (CREATE / UPDATE)
  const handleSaveUser = (userData) => {
    if (userData.id) {
      // (UPDATE)
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userData.id ? { ...user, ...userData } : user
        )
      );
    } else {
      // (CREATE)
      setUsers(prevUsers => [
        ...prevUsers,
        { ...userData, id: Date.now() }, // Adiciona um novo ID
      ]);
    }
    handleCloseModal(); // Fecha o modal após salvar
  };

  // Helper para estilizar as "roles"
  const getRoleClass = (role) => {
    switch (role) {
      case 'Admin': return 'bg-green-100 text-green-800';
      case 'Editor': return 'bg-blue-100 text-blue-800';
      case 'Visitante': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-xl font-medium text-gray-700">Carregando usuários...</p>
      </div>
    );
  }

  return (
    <>
      {/* Botão para abrir o modal de criação */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Adicionar Usuário
        </button>
      </div>

      {/* (READ) Tabela de Usuários */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* (UPDATE) Botão Editar */}
                  <button
                    onClick={() => handleOpenEditModal(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    title="Editar"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  {/* (DELETE) Botão Excluir */}
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Excluir"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* O Modal é renderizado aqui, mas só é visível se `isModalOpen` for true */}
      {isModalOpen && (
        <UserModal
          user={currentUserToEdit}
          onSave={handleSaveUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}


// --- Componente App (Layout) ---
// Este componente renderiza o layout principal (sidebar + header)
export default function App() {
  return (
    // Adicionando a fonte Inter globalmente, como no HTML original
    <div className="flex h-screen bg-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* 1. Barra Lateral (Sidebar) */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800 text-white">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-xl font-semibold">Meu Admin</span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10 0h3a1 1 0 001-1V10M9 20v-7a1 1 0 011-1h4a1 1 0 011 1v7"></path></svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg bg-gray-700 font-medium">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Usuários
            </a>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Configurações
            </a>
          </nav>
        </div>
      </div>

      {/* 2. Conteúdo Principal (Main) */}
      <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Cabeçalho Superior - Agora o título está correto */}
          <header className="flex items-center justify-between h-16 px-6 py-4 bg-white border-b">
              <h1 className="text-2xl font-semibold text-gray-800">Gerenciamento de Usuários</h1>
              {/* O botão "Adicionar" foi movido para o componente UserCrudPanel */}
          </header>

          {/* Área de Conteúdo (com scroll) */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
              
              {/* Aqui renderizamos o painel CRUD de Usuários */}
              <UserCrudPanel />

          </main>
      </div>
    </div>
  );
}