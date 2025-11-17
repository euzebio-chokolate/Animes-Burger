import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// Ícones para o menu (opcional, mas legal)
import { 
  ChartPieIcon, 
  ShoppingBagIcon, 
  ArchiveBoxIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar (Menu Lateral) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-yellow-400">ANIMES BURGER</h1>
          <span className="text-sm text-gray-400">Painel Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
            <ChartPieIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/pedidos" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
            <ArchiveBoxIcon className="h-6 w-6" />
            <span>Pedidos</span>
          </Link>
          <Link to="/admin/produtos" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
            <ShoppingBagIcon className="h-6 w-6" />
            <span>Produtos</span>
          </Link>
          {/* Adicione links para Clientes, Categorias, etc. aqui */}
        </nav>

        <div className="p-4 border-t border-gray-700">
           <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
            <HomeIcon className="h-6 w-6" />
            <span>Voltar ao Site</span>
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* As sub-rotas (Dashboard, Produtos, etc.) serão renderizadas aqui */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;