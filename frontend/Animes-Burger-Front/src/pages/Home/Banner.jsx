import React from 'react';
import MainBurger from '../../assets/images/burger-1.png';

const burgerMainImage = MainBurger;

function Banner() {
    return (
        <section 
            className="relative w-full bg-[#F78C26] p-8 md:p-12 overflow-hidden"
            style={{ 
                backgroundImage: 'repeating-linear-gradient(150deg, #F78C26 0, #F78C26 10px, #E57A1E 80px)' 
            }}
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-between pt-20 lg:pt-0">
                
                <div className="flex-1 text-center lg:text-left z-10 p-4 lg:p-0 items-center">
                    <h1 
                        className="font-bold font-Atop text-9xl text-white text-stroke"
                    >
                        ANIMES
                    </h1>
                    <h1 
                        className="font-bold font-Adlam text-9xl text-black mb-4" 
                    >
                        BURGER
                    </h1>

                    <div className='bg-[#F9E8B0] text-xl px-4 py-2 rounded-xl border-4 border-black inline-block -rotate-3 mt-8'>
                    <p className='font-Adlam'>
                        Os Burgers mais incríveis da galáxia!
                    </p>
                    </div>

                    <div className="flex justify-center lg:justify-start space-x-5 mt-10">
                        <button className="font-Adlam uppercase bg-[#8A3249] text-white text-lg py-3 px-20 rounded-full border-black border-4">
                            Peça Agora
                        </button>
                    </div>
                </div>

                <div className="relative flex-1 flex justify-center items-end m-14 ">
                    <div className="relative w-full max-w-sm lg:max-w-xl xl:max-w-2xl bg-[#F9E8B0] p-5 rounded-xl  border-4 border-black transform rotate-3">
                        <img 
                            src={burgerMainImage}
                            alt="Hambúrguer Principal" 
                            className="w-full h-auto rounded-xl border-4 border-black"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;