import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

// Ícones
import { 
  ChartPieIcon, 
  ShoppingBagIcon, 
  ArchiveBoxIcon,
  HomeIcon,
  UserGroupIcon,
  TagIcon,
  StarIcon,
  Bars3Icon, // Ícone sanduíche
  XMarkIcon  // Ícone fechar
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fecha o menu ao clicar em um link (no mobile)
  const handleLinkClick = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-[#F9E8B0] overflow-hidden font-Adlam">
      
      {/* --- Mobile Header (Só aparece em telas pequenas) --- */}
      <div className="lg:hidden fixed top-0 w-full bg-[#A0405A] h-20 flex items-center justify-between px-4 z-30 border-b-4 border-black shadow-md">
         <div className="flex items-center gap-2">
            <h1 className="font-Atop text-2xl text-stroke text-[#F78C26]" style={{ textShadow: "2px 2px 0px #000" }}>ANIMES</h1>
            <h1 className="font-Adlam text-xl text-white">BURGER</h1>
         </div>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:text-[#F78C26] transition-colors">
           {isSidebarOpen ? <XMarkIcon className="h-10 w-10" /> : <Bars3Icon className="h-10 w-10" />}
         </button>
      </div>

      {/* --- Sidebar (Menu Lateral) --- */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-72 bg-[#A0405A] text-white flex flex-col border-r-4 border-black z-20 transition-transform duration-300 ease-in-out shadow-[4px_0px_0px_0px_rgba(0,0,0,0.2)]
        ${isSidebarOpen ? 'translate-x-0 pt-24' : '-translate-x-full lg:translate-x-0 lg:pt-0'}
      `}>
        
        {/* Logo Desktop */}
        <div className="hidden lg:block p-6 border-b-4 border-black bg-[#8a3249]">
          <h1 className="font-Atop font-semibold text-4xl text-stroke text-[#F78C26] mb-1"
          style={{ textShadow: "3px 3px 0px #000" }}>ANIMES</h1>
          <h1 className="font-Adlam text-3xl text-white">BURGER</h1>
          <span className="text-sm font-Adlam text-gray-300 bg-black/20 px-2 py-1 rounded mt-2 inline-block">Painel Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <Link to="/admin" onClick={handleLinkClick} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#F78C26] hover:text-black hover:border-2 hover:border-black transition-all group">
            <ChartPieIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Dashboard</span>
          </Link>
          <Link to="/admin/pedidos" onClick={handleLinkClick} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#F78C26] hover:text-black hover:border-2 hover:border-black transition-all group">
            <ArchiveBoxIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Pedidos</span>
          </Link>
          <Link to="/admin/produtos" onClick={handleLinkClick} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#F78C26] hover:text-black hover:border-2 hover:border-black transition-all group">
            <ShoppingBagIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Produtos</span>
          </Link>
          <Link to="/admin/clientes" onClick={handleLinkClick} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#F78C26] hover:text-black hover:border-2 hover:border-black transition-all group">
            <UserGroupIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Usuários</span>
          </Link>
          <Link to="/admin/categorias" onClick={handleLinkClick} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#F78C26] hover:text-black hover:border-2 hover:border-black transition-all group">
            <TagIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Categorias</span>
          </Link>
          <Link to="/admin/destaques" onClick={handleLinkClick} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-[#F78C26] hover:text-black hover:border-2 hover:border-black transition-all group">
            <StarIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <span className="text-xl">Destaques</span>
          </Link>
        </nav>

        <div className="p-4 border-t-4 border-black bg-[#7a2b40]">
           <Link to="/" className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors shadow-lg">
            <HomeIcon className="h-6 w-6" />
            <span className="text-lg">Voltar ao Site</span>
          </Link>
        </div>
      </aside>

      {/* --- Conteúdo Principal --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-24 lg:pt-8 w-full">
        <div className="max-w-7xl mx-auto">
            <Outlet />
        </div>
      </main>

      {/* Overlay para fechar o menu no mobile */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;