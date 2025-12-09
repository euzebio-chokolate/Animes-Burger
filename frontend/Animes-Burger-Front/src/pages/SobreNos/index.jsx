import React from 'react';
import { Link } from 'react-router-dom';
import { FireIcon, SparklesIcon, HeartIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const SobreNos = () => {
  return (
    <div className="min-h-screen bg-[#F9E8B0] p-4 md:p-8 overflow-x-hidden">
      
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
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <div className="animate-slide-up text-center mb-12 mt-4">
        <h1 
            className="font-Atop font-bold text-5xl md:text-7xl text-stroke text-[#F78C26] drop-shadow-lg mb-4"
            style={{ textShadow: "4px 4px 0px #000" }}
        >
          NOSSA HISTÓRIA
        </h1>
        <p className="font-Adlam text-2xl text-black max-w-2xl mx-auto leading-relaxed">
          De Otakus para Otakus: onde a fome encontra a fantasia!
        </p>
      </div>

      {/* --- BLOCO PRINCIPAL (Texto) --- */}
      <div className="container mx-auto max-w-6xl animate-slide-up delay-100">
        <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 mb-16 relative overflow-hidden">
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F9E8B0] rounded-full border-4 border-black z-0 opacity-50 md:opacity-100"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1 space-y-6">
                    <h2 className="font-Atop text-4xl text-[#8A3249]">A ORIGEM</h2>
                    <p className="font-Adlam text-lg md:text-xl text-gray-800 leading-relaxed text-justify">
                        Tudo começou em uma maratona de anime madrugada adentro. A fome bateu forte, mas nenhum lanche parecia ter o <strong>"Ki"</strong> necessário para satisfazer. Foi aí que pensamos: <em>"E se existisse um lugar onde a comida fosse tão épica quanto as batalhas que assistimos?"</em>
                    </p>
                    <p className="font-Adlam text-lg md:text-xl text-gray-800 leading-relaxed text-justify">
                        Assim nasceu o <strong>Animes Burger</strong>. Não somos apenas uma lanchonete; somos um quartel-general para quem ama cultura pop. Nossos hambúrgueres são forjados com ingredientes de <strong>Rank-S</strong>, preparados com a precisão de um alquimista e servidos com a paixão de um protagonista Shonen.
                    </p>
                </div>
                
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="bg-[#F78C26] p-8 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3 hover:rotate-0 transition-transform duration-500">
                        <RocketLaunchIcon className="h-32 w-32 text-white" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* MISSÃO, VISÃO E VALORES */}
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Card 1: Missão */}
        <div className="animate-slide-up delay-200 bg-[#8A3249] text-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-white w-16 h-16 rounded-xl border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <FireIcon className="h-8 w-8 text-[#8A3249]" />
            </div>
            <h3 className="font-Atop text-3xl mb-4 text-stroke-sm" style={{ textShadow: "2px 2px 0px #000" }}>MISSÃO</h3>
            <p className="font-Adlam text-lg leading-snug">
                Combater a fome monótona servindo experiências lendárias. Queremos que cada mordida faça você se sentir despertando o Sétimo Sentido do paladar.
            </p>
        </div>

        {/* Card 2: Visão */}
        <div className="animate-slide-up delay-200 bg-[#F78C26] text-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-white w-16 h-16 rounded-xl border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <SparklesIcon className="h-8 w-8 text-[#F78C26]" />
            </div>
            <h3 className="font-Atop text-3xl mb-4 text-stroke-sm" style={{ textShadow: "2px 2px 0px #000" }}>VISÃO</h3>
            <p className="font-Adlam text-lg leading-snug">
                Tornar-se o "Rei dos Hambúrgueres" em todo o território, criando uma comunidade onde todos são bem-vindos na nossa tripulação.
            </p>
        </div>

        {/* Card 3: Valores */}
        <div className="animate-slide-up delay-200 bg-white text-black p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-[#F9E8B0] w-16 h-16 rounded-xl border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <HeartIcon className="h-8 w-8 text-black" />
            </div>
            <h3 className="font-Atop text-3xl mb-4 text-[#8A3249]">VALORES</h3>
            <ul className="font-Adlam text-lg space-y-2 list-disc list-inside">
                <li>Qualidade <strong>Rank-S</strong></li>
                <li>Atendimento <strong>Nakama</strong> (Amigo)</li>
                <li>Diversão Sem Fillers</li>
                <li>Criatividade Explosiva</li>
            </ul>
        </div>

      </div>

      <div className="animate-slide-up delay-300 text-center pb-12">
        <h2 className="font-Adlam text-3xl text-black mb-6">
            Já sentiu o poder de luta do seu estômago aumentar?
        </h2>
        <Link 
            to="/cardapio"
            className="inline-block bg-[#8A3249] text-white font-Adlam text-2xl py-4 px-10 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#A0405A] hover:translate-y-1 hover:shadow-none transition-all"
        >
            Ver Cardápio Lendário
        </Link>
      </div>

    </div>
  );
};

export default SobreNos;