import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
    <main className="bg-[#F9E8B0] min-h-screen">
      
      {/* 4. O layout visual do 'cardapioLayout.jsx' vem para cá */}
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <h1 
          className="font-Atop font-semibold text-8xl text-center mb-4 text-stroke text-[#F78C26]"
          style={{ textShadow: "6px 6px 0px #000" }}
        >
          CARDÁPIO
        </h1>
        <h2 className="font-Afacad text-4xl text-center text-black mb-10 font-semibold">
          Escolha o seu favorito!!
        </h2>

        {/* BARRA DE BUSCA */}
        <div className="relative mb-10 max-w-lg mx-auto">
          <input 
            type="text"
            placeholder="Buscar Hambúrguer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 px-5 pr-11 rounded-2xl border-4 border-black text-lg font-semibold font-Afacad focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <MagnifyingGlassIcon className="h-7 w-7 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setFiltroCategoria(null)}
            className={`font-Adlam text-xl px-6 py-2 rounded-2xl border-4 border-black transition-all shadow-md
              ${filtroCategoria === null 
                ? 'bg-[#F78C26] text-black' 
                : 'bg-white text-black hover:bg-gray-100'}
            `}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFiltroCategoria(cat.id)}
              className={`font-Adlam text-xl px-6 py-2 rounded-2xl border-4 border-black transition-all shadow-md
                ${filtroCategoria === cat.id 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-white text-black hover:bg-gray-100'}
              `}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        {loading && (
          <p className="text-center text-gray-700 font-Adlam text-2xl">Carregando cardápio...</p>
        )}
        {error && (
          <p className="text-center text-red-600 font-Adlam text-2xl">{error}</p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))
            ) : (
              <p className="text-lg text-gray-600 col-span-3 font-Adlam text-2xl">
                Nenhum produto encontrado com esse nome.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default Cardapio;