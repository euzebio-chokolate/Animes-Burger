import React from 'react';

// 1. Importe os novos componentes
import GaleriaEspaco from './galeriaEspaco';
import MapaLocalizacao from './MapaLocalizacao';

// 2. Importe o componente que você já tinha
import FaleConoscoSection from '../Home/FaleConosco';

const NossoEspaco = () => {
  return (
    // A cor de fundo principal será controlada pelos componentes
    <div className="min-h-screen">
      
      {/* 3. Seção da Galeria */}
      <GaleriaEspaco />

      {/* 4. Seção do Mapa */}
      <MapaLocalizacao />
      
      {/* 5. Seção de Fale Conosco (que você já tinha) */}
      <FaleConoscoSection />

    </div>
  );
};

export default NossoEspaco;