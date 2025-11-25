import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-[#F78C26] overflow-hidden">
        
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          
          {/* Lado Esquerdo: Marca */}
          <div className="animate-slide-up">
            <h2 
                className="font-Atop text-4xl md:text-5xl text-[#F78C26] mb-2 text-stroke-sm tracking-wide"
                style={{ textShadow: "2px 2px 0px #000" }}
            >
              Animes Burger
            </h2>
            <p className="font-Adlam text-lg md:text-xl leading-relaxed text-gray-300">
              O melhor hambúrguer da cidade<br />
              com um toque de anime!
            </p>
          </div>

          {/* Lado Direito: Contato */}
          <div className="animate-slide-up delay-100">
            <h2 
                className="font-Atop text-4xl md:text-5xl text-[#F78C26] mb-2 text-stroke-sm tracking-wide"
                style={{ textShadow: "2px 2px 0px #000" }}
            >
              Contato
            </h2>
            <p className="font-Adlam text-lg md:text-xl leading-relaxed text-gray-300">
              (69) 99900-0009<br />
              Av. Tancredo Neves, 457<br />
              Centro - Rio Branco, AC
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center animate-slide-up delay-200">
          <p className="font-Adlam text-sm md:text-base text-gray-500">
            &copy; {new Date().getFullYear()} Animes Burger. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;