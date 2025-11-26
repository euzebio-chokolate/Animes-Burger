import React, { useState } from 'react';
import { useCart } from "../Carrinho/index.jsx";
import { XMarkIcon } from '@heroicons/react/24/outline';
import LoginModal from '../../components/LoginModal';

const ProdutoCard = ({ produto }) => {
    const { addToCart, loading } = useCart();
    const [isExpanded, setIsExpanded] = useState(false);
    
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handlePedirClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLoginModal(true);
            return;
        }

        addToCart(produto.id, 1);
    };

    const tags = produto.ingredientes ? produto.ingredientes.split(',').slice(0, 3) : [];

    return (
        <>
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
            />

            {isExpanded && (
                <div 
                    className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
                    onClick={() => setIsExpanded(false)}
                >
                    <button onClick={() => setIsExpanded(false)} className="absolute top-5 right-5 text-white hover:text-[#F78C26] transition-colors">
                        <XMarkIcon className="h-10 w-10" />
                    </button>
                    <img src={produto.imagemUrl} alt={produto.nome} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-zoom-in" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black w-full max-w-sm overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2">
                <div className="h-48 md:h-56 overflow-hidden border-b-4 border-black bg-gray-100 relative group cursor-zoom-in">
                     <img src={produto.imagemUrl} alt={produto.nome} onClick={() => setIsExpanded(true)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                         <span className="opacity-0 group-hover:opacity-100 text-white font-Adlam bg-black/50 px-3 py-1 rounded-full text-sm transition-opacity">Ver mais</span>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-adlam leading-tight">{produto.nome}</h3>
                    <p className="text-base md:text-lg text-black/80 mb-4 flex-1 font-Afacad line-clamp-3">{produto.descricao}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-[#F9E8B0] text-xs md:text-sm font-Adlam px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{tag.trim()}</span>
                        ))}
                        {tags.length > 0 && <span className="bg-[#F9E8B0] text-xs font-Adlam px-2 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">+</span>}
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t-2 border-gray-100">
                        <p className="text-2xl md:text-3xl text-black font-Adlam">R$ {Number(produto.preco || 0).toFixed(2)}</p>
                        <button
                            type="button"
                            onClick={handlePedirClick} // Chama a nova função
                            disabled={loading}
                            className="bg-[#F78C26] text-white text-stroke font-Adlam py-2 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E57A1E] hover:translate-y-1 hover:shadow-none transition-all text-xl md:text-2xl disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            {loading ? '...' : 'Pedir'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProdutoCard;