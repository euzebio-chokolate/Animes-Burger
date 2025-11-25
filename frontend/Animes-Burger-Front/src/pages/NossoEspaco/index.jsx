import React from 'react';

import GaleriaEspaco from './galeriaEspaco';
import MapaLocalizacao from './mapaLocalizacao';
import FaleConoscoSection from '../Home/FaleConosco';

const NossoEspaco = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
        {/* Estilos de Animação */}
        <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.8s ease-out forwards;
                opacity: 0;
            }
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
        `}</style>

      {/* Seção 1: Galeria (Entra primeiro) */}
      <div className="animate-slide-up">
        <GaleriaEspaco />
      </div>

      {/* Seção 2: Mapa (Entra depois) */}
      <div className="animate-slide-up delay-100">
        <MapaLocalizacao />
      </div>
      
      {/* Seção 3: Fale Conosco (Entra por último) */}
      <div className="animate-slide-up delay-200">
        <FaleConoscoSection />
      </div>

    </div>
  );
};

export default NossoEspaco;