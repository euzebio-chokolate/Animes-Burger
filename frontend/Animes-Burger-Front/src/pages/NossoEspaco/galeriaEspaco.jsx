import React from 'react';
// 1. Importe os componentes do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import MainBurguer from "../../assets/images/burger-1.png"
import Imagem1 from "../../assets/images/imagem1.png"
import Imagem2 from "../../assets/images/imagem2.png"

// 2. Importe os módulos que vamos usar (Autoplay, Navegação)
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// --- Imagens de Exemplo (Substitua pelas suas fotos) ---
const placeholderImagens = [
  MainBurguer,
  Imagem1,
  Imagem2
];

const GaleriaEspaco = () => {
  return (
    <section className="w-full bg-[#F9E8B0] py-16 px-8">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2 
          className="font-Atop font-semibold text-7xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: '6px 6px 0px #000' }}
        >
          NOSSA GALERIA
        </h2>

        {/* 3. Configure o Carrossel */}
        <div className="bg-white rounded-lg shadow-xl border-4 border-black overflow-hidden p-2">
          <Swiper
            // Módulos que o Swiper vai usar
            modules={[Autoplay, Pagination, Navigation]}
            
            // Configurações
            spaceBetween={30}       // Espaço entre os slides
            slidesPerView={1}       // Mostrar 1 slide de cada vez
            centeredSlides={true}
            loop={true}             // Faz o carrossel voltar ao início
            
            // Configuração do Autoplay
            autoplay={{
              delay: 3000, // Tempo de espera (3 segundos)
              disableOnInteraction: false, // Não parar quando o usuário mexer
            }}
            
            // Bolinhas de paginação
            pagination={{
              clickable: true,
            }}
            
            // Setas de navegação
            navigation={true}
            
            className="w-full h-[500px] rounded-md" // Defina uma altura
          >
            {/* 4. Mapeie as imagens como SwiperSlide */}
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