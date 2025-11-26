import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Imagem1 from "../../assets/images/imagem-1.png";
import Imagem2 from "../../assets/images/imagem-2.png";
import Imagem3 from "../../assets/images/imagem-3.png";
import Imagem4 from "../../assets/images/imagem-4.png";
import Imagem5 from "../../assets/images/imagem-5.png";
import Imagem6 from "../../assets/images/imagem-6.png";

// Imagens de Exemplo
const placeholderImagens = [Imagem1, Imagem2, Imagem3, Imagem4, Imagem5, Imagem6];

const GaleriaEspaco = () => {
  return (
    <section className="w-full bg-[#F9E8B0] py-12 md:py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <h2 
          className="font-Atop font-semibold text-5xl md:text-7xl mb-8 md:mb-12 text-center text-stroke text-[#F78C26] drop-shadow-lg"
          style={{ textShadow: '4px 4px 0px #000' }}
        >
          NOSSA GALERIA
        </h2>

        <div className="rounded-3xl overflow-hidden p-2 md:p-4 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="w-full h-[300px] md:h-[500px] rounded-xl"
          >
            {placeholderImagens.map((src, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={src} 
                  alt={`Foto do espaço ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GaleriaEspaco;