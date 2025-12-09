import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainBurger from '../../assets/images/burger-1.png';

const burgerMainImage = MainBurger;

function Banner() {
    const navigate = useNavigate();

    return (
        <section 
            className="relative w-full bg-[#F78C26] px-2 py-8 md:p-12 overflow-hidden min-h-[500px] flex items-center"
            style={{ 
                backgroundImage: 'repeating-linear-gradient(150deg, #F78C26 0, #F78C26 10px, #E57A1E 80px)' 
            }}
        >
            <div className="mx-auto w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                
                <div className="flex-1 text-center lg:text-left z-10 flex flex-col items-center lg:items-start w-full">
                    
                    <div className="w-full flex flex-col items-center lg:items-start">
                        <h1 className="font-bold font-Atop text-7xl sm:text-8xl md:text-9xl text-white text-stroke leading-[0.85] drop-shadow-lg tracking-tighter w-full">
                            ANIMES
                        </h1>
                        <h1 className="font-bold font-Adlam text-7xl sm:text-8xl md:text-9xl text-black mb-4 leading-[0.85] drop-shadow-lg tracking-tighter w-full">
                            BURGER
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className='bg-[#F9E8B0] text-base sm:text-xl px-4 py-2 rounded-xl border-4 border-black inline-block -rotate-3 mt-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform transition hover:scale-105 hover:rotate-0 duration-300 w-[90%] sm:w-auto mx-auto lg:mx-0'>
                        <p className='font-Adlam text-center sm:text-left'>
                            Os Burgers mais incríveis da galáxia!
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mt-8 w-full px-2 sm:px-0">
                        <button 
                            onClick={() => navigate('/cardapio')}
                            className="font-Adlam uppercase bg-[#8A3249] text-white text-xl py-4 px-6 rounded-full border-black border-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto active:scale-95"
                        >
                            Peça Agora
                        </button>
                        <button 
                            onClick={() => navigate('/cardapio')}
                            className="font-Adlam uppercase bg-white text-gray-800 text-xl py-4 px-6 rounded-full border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto active:scale-95"
                        >
                            Ver Cardápio
                        </button>
                    </div>
                </div>

                <div className="relative flex-1 flex justify-center items-end w-full mt-8 lg:mt-0 lg:ml-10">
                    <div className="relative w-full max-w-[400px] lg:max-w-full bg-[#F9E8B0] p-2 md:p-4 rounded-3xl border-4 border-black transform rotate-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:rotate-0 duration-500 mx-2">
                        <img 
                            src={burgerMainImage}
                            alt="Hambúrguer Principal" 
                            className="w-full h-auto rounded-xl border-2 border-black object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;