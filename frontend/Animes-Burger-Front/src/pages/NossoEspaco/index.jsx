import React from 'react';

import GaleriaEspaco from './galeriaEspaco';
import MapaLocalizacao from './mapaLocalizacao';

import FaleConoscoSection from '../Home/FaleConosco';

const NossoEspaco = () => {
  return (
    <div className="min-h-screen">
      <GaleriaEspaco />
      <MapaLocalizacao />
      <FaleConoscoSection />

    </div>
  );
};

export default NossoEspaco;