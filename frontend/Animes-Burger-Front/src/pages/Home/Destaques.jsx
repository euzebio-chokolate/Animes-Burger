import React, { useEffect, useState } from 'react';
import axios from "axios";

function DestaquesSection() {

    const [destaqueProducts, setDestaqueProducts] = useState([]);

    const buscarProdutos = async () => {
        try {
             const resposta = await axios.get("http://localhost:3000/api/produtos");
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
            destaqueProducts.map((product) => (
              <div
                key={product.nome}
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
                  
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {product.descricao}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Verificamos se itensPedido é um array antes de mapear */}
                    {product.composicao?.map((c, index) => (
                        <span 
                            key={index} 
                            className="bg-[#F9E8B0] text-black text-xs font-semibold px-3 py-1 rounded-full border-2 border-black"
                        >
                            {c.ingrediente?.nome}
                        </span>
                    ))}
                  </div>

                  
                  <div className="flex-1"></div> 

                  {/* Rodapé do Card (Preço e Botão) */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-3xl font-Adlam text-black">
                      R$ {Number(product.preco || 0).toFixed(2)}
                    </p>
                    <button 
                        type="button"
                        className="bg-[#F78C26] text-white text-stroke font-Adlam py-1 px-4 rounded-lg border-2 border-black shadow-md hover:bg-[#E57A1E] transition-colors text-2xl"
                    >
                        Pedir
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600 col-span-3">Carregando produtos...</p>
          )}
        </div>
      </div>
    </section>
    );
}

export default DestaquesSection;