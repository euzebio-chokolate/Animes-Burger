import React from 'react';

const MapaLocalizacao = () => {
  // Link do Google Maps
  const googleMapsSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0348158780084!2d-67.82024582418696!3d-9.93105850612611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917f8b8706b8a145%3A0x77d08461aa30ef40!2sInstituto%20Federal%20do%20Acre%20-%20Campus%20Rio%20Branco!5e0!3m2!1spt-BR!2sbr!4v1763442580433!5m2!1spt-BR!2sbr"; // Substitua pelo link real do embed

  return (
    <section className="w-full bg-[#F9E8B0] pb-12 md:pb-16 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <h2 
          className="font-Atop font-semibold text-5xl md:text-7xl mb-8 md:mb-12 text-center text-stroke text-[#F78C26] drop-shadow-lg"
          style={{ textShadow: '4px 4px 0px #000' }}
        >
          COMO CHEGAR
        </h2>

        <div className="bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black overflow-hidden p-2 md:p-4">
          <iframe
            src={googleMapsSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl w-full h-[300px] md:h-[450px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapaLocalizacao;