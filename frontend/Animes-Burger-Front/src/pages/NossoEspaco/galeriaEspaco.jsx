import React from 'react';

import MainBurguer from "../../assets/images/burger-1.png";
import Imagem1 from "../../assets/images/imagem1.png";
import Imagem2 from "../../assets/images/imagem2.png";

const placeholderImagens = [MainBurguer, Imagem1, Imagem2];

const GaleriaEspaco = () => {
  return (
    <section className="w-full bg-[#F9E8B0] py-16 px-8">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2
          className="font-Atop font-semibold text-7xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}
        >
          NOSSA GALERIA
        </h2>

        <div className="rounded-lg overflow-hidden p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {placeholderImagens.map((src, index) => (
              <div
                key={index}
                className="bg-white p-2 border-4 border-black shadow-[8px_8px_0_#000] rotate-2 hover:-rotate-1 transition-transform duration-300 rounded-xl"
              >
                <img
                  src={src}
                  alt={`Foto do espaço ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GaleriaEspaco;
