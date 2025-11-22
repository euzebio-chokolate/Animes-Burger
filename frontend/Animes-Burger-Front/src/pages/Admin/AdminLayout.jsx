import React from 'react';
import { Link, Outlet } from 'react-router-dom';

//Ícones para o menu
import { 
  ChartPieIcon, 
  ShoppingBagIcon, 
  ArchiveBoxIcon,
  HomeIcon,
  UserGroupIcon,
  TagIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#F9E8B0]">
      
      {/* Sidebar (Menu Lateral) */}
      <aside className="w-64 bg-[#A0405A] text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-Atop text-white text-stroke">ANIMES</h1>
          <h1 className="text-2xl font-Adlam text-black">BURGER</h1>
          <span className="text-sm font-Adlam text-gray-400">Painel Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 font-Adlam text-xl">
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
          <Link to="/admin/clientes" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
            <UserGroupIcon className="h-6 w-6" />
            <span>Clientes</span>
          </Link>
          <Link to="/admin/categorias" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
        <TagIcon className="h-6 w-6" />
        <span>Categorias</span>
      </Link>
      <Link to="/admin/destaques" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700">
        <StarIcon className="h-6 w-6" />
        <span>Destaques</span>
      </Link>
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