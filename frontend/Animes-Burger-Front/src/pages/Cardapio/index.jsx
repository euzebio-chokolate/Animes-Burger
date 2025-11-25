import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Navbar from "../../components/Navbar";
import ProdutoCard from "./produtoCard";

function Cardapio(){
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resProdutos, resCategorias] = await Promise.all([
          api.get('/produtos'),
          api.get('/categorias')
        ]);
        setProdutos(resProdutos.data);
        setCategorias(resCategorias.data);
      } catch (err) {
        console.error("Erro ao buscar cardápio:", err);
        setError("Não foi possível carregar o cardápio.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const produtosFiltrados = produtos
    .filter(p => {
      if (filtroCategoria === null) return true;
      return p.categoriaId === filtroCategoria;
    })
    .filter(p => {
      if (searchTerm === '') return true;
      return p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return(
    <main className="bg-[#F9E8B0] min-h-screen overflow-x-hidden">
        {/* Estilos de Animação */}
        <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.8s ease-out forwards;
                opacity: 0; /* Começa invisível */
            }
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
        `}</style>

      <div className="container mx-auto max-w-7xl py-12 px-4 md:px-8">
        
        {/* Cabeçalho Animado */}
        <div className="animate-slide-up text-center mb-10">
            <h1 
            className="font-Atop font-bold text-5xl md:text-8xl text-center mb-4 text-stroke text-[#F78C26] drop-shadow-lg"
            style={{ textShadow: "4px 4px 0px #000" }}
            >
            CARDÁPIO
            </h1>
            <h2 className="font-Adlam text-2xl md:text-4xl text-center text-black">
            Escolha o seu favorito!!
            </h2>
        </div>

        {/* Barra de Busca Animada (Delay 100ms) */}
        <div className="animate-slide-up delay-100 relative mb-10 max-w-lg mx-auto w-full">
          <input 
            type="text"
            placeholder="Buscar Hambúrguer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 px-5 pr-12 rounded-2xl border-4 border-black text-lg font-Adlam focus:outline-none focus:ring-4 focus:ring-[#F78C26]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-y-1"
          />
          <MagnifyingGlassIcon className="h-7 w-7 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filtros de Categoria Animados (Delay 200ms) */}
        <div className="animate-slide-up delay-200 flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          <button
            onClick={() => setFiltroCategoria(null)}
            className={`font-Adlam text-lg md:text-xl px-6 py-2 rounded-2xl border-4 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none
              ${filtroCategoria === null 
                ? 'bg-yellow-500 text-black' 
                : 'bg-white text-black hover:bg-gray-100'}
            `}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFiltroCategoria(cat.id)}
              className={`font-Adlam text-lg md:text-xl px-6 py-2 rounded-2xl border-4 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none
                ${filtroCategoria === cat.id 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-white text-black hover:bg-gray-100'}
              `}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Grid de Produtos Animado (Delay 300ms) */}
        <div className="animate-slide-up delay-300">
            {loading && (
            <p className="text-center text-gray-700 font-Adlam text-2xl py-10">Carregando cardápio...</p>
            )}
            {error && (
            <p className="text-center text-red-600 font-Adlam text-2xl py-10">{error}</p>
            )}
            {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
                {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((produto) => (
                    <ProdutoCard key={produto.id} produto={produto} />
                ))
                ) : (
                <p className="text-xl text-gray-600 col-span-full font-Adlam text-center py-10 bg-white/50 rounded-xl border-4 border-black/10 w-full">
                    Nenhum produto encontrado com esse nome.
                </p>
                )}
            </div>
            )}
        </div>
      </div>
    </main>
  );
}

export default Cardapio;