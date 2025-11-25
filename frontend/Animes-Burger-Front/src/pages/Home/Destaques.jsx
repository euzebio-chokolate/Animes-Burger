import React, { useEffect, useState } from 'react';
import { useCart } from '../Carrinho';
import api from '../../services/api.js';

function DestaquesSection() {
    const [destaqueProducts, setDestaqueProducts] = useState([]);
    const { addToCart, loading } = useCart();

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

    return (
        <section className="w-full bg-[#F9E8B0] py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <h2
                    className="font-Atop font-semibold text-5xl md:text-7xl mb-12 text-center text-stroke text-[#F78C26] text-shadow-[0_4px_0px_rgb(0_0_0)] md:text-shadow-[0_6px_0px_rgb(0_0_0)]"
                    style={{ textShadow: "4px 4px 0px #000" }}
                >
                    DESTAQUES
                </h2>

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
                                    <div className="h-48 overflow-hidden border-b-4 border-black">
                                        <img
                                            src={product.imagemUrl}
                                            alt={product.nome}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col text-left">
                                        <h3 className="text-2xl md:text-3xl font-Adlam text-gray-900 mb-2 leading-tight">
                                            {product.nome}
                                        </h3>

                                        <p className="text-sm md:text-base text-black mb-4 font-Afacad line-clamp-3">
                                            {product.descricao}
                                        </p>

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

                                        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-200">
                                            <p className="text-2xl md:text-3xl font-Adlam text-black">
                                                R$ {Number(product.preco || 0).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => addToCart(product.id, 1)}
                                                disabled={loading}
                                                type="button"
                                                className="bg-[#F78C26] text-white text-stroke font-Adlam py-2 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E57A1E] hover:translate-y-1 hover:shadow-none transition-all text-xl disabled:bg-gray-400 disabled:shadow-none"
                                            >
                                                Pedir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-xl text-gray-600 col-span-full font-Adlam text-center py-10">
                            Carregando destaques deliciosos...
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default DestaquesSection;