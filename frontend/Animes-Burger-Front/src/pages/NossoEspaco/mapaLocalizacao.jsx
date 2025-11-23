import React from 'react';

const MapaLocalizacao = () => {
  const googleMapsSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0348158780084!2d-67.82024582418696!3d-9.93105850612611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917f8b8706b8a145%3A0x77d08461aa30ef40!2sInstituto%20Federal%20do%20Acre%20-%20Campus%20Rio%20Branco!5e0!3m2!1spt-BR!2sbr!4v1763442580433!5m2!1spt-BR!2sbr";

  return (
    <section className="w-full bg-[#F9E8B0] pb-16 px-8">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2 
          className="font-Atop font-semibold text-7xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: '6px 6px 0px #000' }}
        >
          COMO CHEGAR
        </h2>

        <div className="bg-white rounded-lg shadow-xl border-4 border-black overflow-hidden p-2">
          <iframe
            src={googleMapsSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapaLocalizacao;