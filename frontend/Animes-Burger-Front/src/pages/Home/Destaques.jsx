import React, { useEffect, useState } from 'react';
import { useCart } from '../Carrinho/index.jsx'; 
import api from '../../services/api';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LoginModal from '../../components/LoginModal'; 

function DestaquesSection() {
    const [destaqueProducts, setDestaqueProducts] = useState([]);
    const { addToCart, loading } = useCart();

    // State para o Zoom da imagem
    const [expandedImage, setExpandedImage] = useState(null);
    
    // State para o Modal de Login
    const [showLoginModal, setShowLoginModal] = useState(false);

    const buscarProdutos = async () => {
        try {
             const resposta = await api.get("/destaques");
             setDestaqueProducts(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar destaques:", error);
        }
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    const handleAddToCart = (produtoId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLoginModal(true);
            return;
        }
        addToCart(produtoId, 1);
    };

    return (
        <section className="w-full bg-[#F9E8B0] py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
            
            {/* 1. Modal de Login */}
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
            />

            {/* 2. Modal de Zoom (Lightbox) */}
            {expandedImage && (
                <div 
                    className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
                    onClick={() => setExpandedImage(null)}
                >
                    <button 
                        onClick={() => setExpandedImage(null)}
                        className="absolute top-5 right-5 text-white hover:text-[#F78C26] transition-colors"
                    >
                        <XMarkIcon className="h-10 w-10" />
                    </button>
                    <img 
                        src={expandedImage} 
                        alt="Zoom no produto" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <div className="container mx-auto max-w-7xl">
                {/* Título Responsivo */}
                <h2
                    className="font-Atop font-semibold text-5xl md:text-7xl mb-12 text-center text-stroke text-[#F78C26] text-shadow-[0_4px_0px_rgb(0_0_0)] md:text-shadow-[0_6px_0px_rgb(0_0_0)]"
                    style={{ textShadow: "4px 4px 0px #000" }}
                >
                    DESTAQUES
                </h2>

                {/* Grid Responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
                    {destaqueProducts.length > 0 ? (
                        destaqueProducts.map((destaque) => {
                            const product = destaque.produto;
                            const tags = product.ingredientes 
                                ? product.ingredientes.split(',').slice(0, 3) 
                                : [];

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black w-full max-w-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
                                >
                                    {/* Imagem com Zoom */}
                                    <div className="h-48 md:h-64 overflow-hidden border-b-4 border-black bg-gray-100 relative group cursor-zoom-in">
                                        <img
                                            src={product.imagemUrl}
                                            alt={product.nome}
                                            onClick={() => setExpandedImage(product.imagemUrl)}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Dica visual de zoom */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                                            <span className="opacity-0 group-hover:opacity-100 text-white font-Adlam bg-black/50 px-3 py-1 rounded-full text-sm transition-opacity">
                                                Ampliar
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col text-left">
                                        {/* Nome */}
                                        <h3 className="text-2xl md:text-3xl font-Adlam text-gray-900 mb-2 leading-tight">
                                            {product.nome}
                                        </h3>

                                        {/* Descrição */}
                                        <p className="text-sm md:text-base text-black mb-4 font-Afacad line-clamp-3">
                                            {product.descricao}
                                        </p>

                                        {/* Tags de Ingredientes */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-[#F9E8B0] text-xs md:text-sm font-Adlam px-2 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                            {tags.length > 0 && (
                                                <span className="bg-[#F9E8B0] text-xs font-Adlam px-2 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    +
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex-1"></div>

                                        {/* Rodapé do Card */}
                                        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200">
                                            <p className="text-2xl md:text-3xl font-Adlam text-black">
                                                R$ {Number(product.preco || 0).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                disabled={loading}
                                                type="button"
                                                className="bg-[#F78C26] text-white text-stroke font-Adlam py-2 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E57A1E] hover:translate-y-1 hover:shadow-none transition-all text-xl md:text-2xl disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                                            >
                                                {loading ? '...' : 'Pedir'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-xl text-gray-600 col-span-full font-Adlam text-center py-10 bg-white/50 rounded-xl border-4 border-black/10 w-full">
                            Carregando destaques deliciosos...
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default DestaquesSection;