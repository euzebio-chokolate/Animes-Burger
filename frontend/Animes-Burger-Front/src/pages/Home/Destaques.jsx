import React, { useEffect, useState } from 'react';
import { useCart } from '../Carrinho';
import axios from "axios";
import api from '../../services/api';

function DestaquesSection() {
  const [destaqueProducts, setDestaqueProducts] = useState([]);

  const { addToCart, loading } = useCart();

  const buscarProdutos = async () => {
    try {
      const resposta = await api.get("/destaques");
      setDestaqueProducts(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <section className="w-full bg-[#F9E8B0] py-16 px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2
          className="font-Atop font-semibold text-7xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}
        >
          DESTAQUES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {destaqueProducts.length > 0 ? (
            destaqueProducts.map((destaque) => {
              const product = destaque.produto;

              const tags = product.ingredientes
                ? product.ingredientes.split(',').slice(0, 3)
                : [];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-xl border-4 border-black w-full max-w-xs overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
                >
                  <img
                    src={product.imagemUrl}
                    alt={product.nome}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 flex-1 flex flex-col text-left">
                    <h3 className="text-3xl font-Adlam text-gray-900 mb-2">
                      {product.nome}
                    </h3>

                    <p className="text-sm text-black mb-4 font-Afacad">
                      {product.descricao}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#F9E8B0] text-sm font-Adlam px-2 py-1 rounded-full border-2 border-black"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                      {tags.length > 0 && (
                        <span className="bg-[#F9E8B0] text-xs font-Adlam px-2 py-1 rounded-full border-2 border-black">
                          +
                        </span>
                      )}
                    </div>

                    <div className="flex-1"></div>

                    {/* Rodapé do Card */}
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-3xl font-Adlam text-black">
                        R$ {Number(product.preco || 0).toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToCart(product.id, 1)}
                        disabled={loading}
                        type="button"
                        className="bg-[#F78C26] text-white text-stroke font-Adlam py-1 px-4 rounded-lg border-2 border-black shadow-md hover:bg-[#E57A1E] transition-colors text-2xl disabled:bg-gray-400"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-gray-600 col-span-3 font-Adlam">Carregando destaques...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DestaquesSection;