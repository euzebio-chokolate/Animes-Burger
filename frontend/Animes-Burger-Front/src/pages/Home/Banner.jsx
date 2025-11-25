import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainBurger from '../../assets/images/burger-1.png';

const burgerMainImage = MainBurger;

function Banner() {
    const navigate = useNavigate();

    return (
        <section 
            className="relative w-full bg-[#F78C26] px-4 py-12 md:p-12 overflow-hidden min-h-[600px] flex items-center"
            style={{ 
                backgroundImage: 'repeating-linear-gradient(150deg, #F78C26 0, #F78C26 10px, #E57A1E 80px)' 
            }}
        >
            <div className="mx-auto max-w-7xl w-full h-full flex flex-col lg:flex-row items-center justify-between">
                
                {/* Texto e Botões */}
                <div className="flex-1 text-center lg:text-left z-10 flex flex-col items-center lg:items-start">
                    <h1 className="font-bold font-Atop text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white text-stroke leading-none drop-shadow-lg">
                        ANIMES
                    </h1>
                    <h1 className="font-bold font-Adlam text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black mb-4 leading-none drop-shadow-lg">
                        BURGER
                    </h1>

                    <div className='bg-[#F9E8B0] text-sm sm:text-lg md:text-xl px-4 py-2 rounded-xl border-4 border-black inline-block -rotate-3 mt-4 md:mt-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform transition hover:scale-105 hover:rotate-0 duration-300'>
                        <p className='font-Adlam'>
                            Os Burgers mais incríveis da galáxia!
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8 md:mt-12 w-full sm:w-auto">
                        <button 
                            onClick={() => navigate('/cardapio')}
                            className="font-Adlam uppercase bg-[#8A3249] text-white text-lg py-3 px-8 rounded-full border-black border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto"
                        >
                            Peça Agora
                        </button>
                        <button 
                            onClick={() => navigate('/cardapio')}
                            className="font-Adlam uppercase bg-white text-gray-800 text-lg py-3 px-8 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto"
                        >
                            Ver Cardápio
                        </button>
                    </div>
                </div>

                {/* Imagem do Burguer */}
                <div className="relative flex-1 flex justify-center items-end mt-12 lg:mt-0 lg:ml-10 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-full">
                    <div className="relative w-full bg-[#F9E8B0] p-4 rounded-2xl border-4 border-black transform rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition hover:rotate-0 duration-500">
                        <img 
                            src={burgerMainImage}
                            alt="Hambúrguer Principal" 
                            className="w-full h-auto rounded-xl border-2 border-black"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;