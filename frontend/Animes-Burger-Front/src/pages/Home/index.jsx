import React, { useEffect, useState } from 'react';
import axios from "axios";

// IMPORTAÇÕES GLOBAIS
// Importações da Navbar
import LogoImage from '../../assets/images/logo.png';
import MainBurger from '../../assets/images/burger-1.png';
import { 
    BookOpenIcon,
    MapPinIcon,
    UserCircleIcon,
    ShoppingCartIcon
} from '@heroicons/react/24/outline';

const burgerMainImage = MainBurger;
const gokuBurgerImage = "";
const vegetaBurgerImage = "";
const luffyBurgerImage = "";
const personagensFundo = "";


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Cardápio', href: '/cardapio', current: false, icon: BookOpenIcon },
        { name: 'Nosso Espaço', href: '/espaco', current: false, icon: MapPinIcon },
        { name: 'Minha Conta', href: '/conta', current: false , icon: UserCircleIcon},
    ];

    const navBgClass = 'bg-[#F78C26] shadow-xl';
    const activeLinkClass = 'bg-[#8A3249]/80 text-white border-2 border-black';
    const defaultLinkClass = 'text-gray-800 hover:bg-[#8A3249]/20 hover:text-white';

    return (
        <div className={`relative ${navBgClass} h-20`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
                {/* Esta div é o container principal: Esquerda, Centro, Direita */}
                <div className="relative flex h-full items-center justify-between">

                    {/* Bloco da Esquerda: Botão Mobile + Logo/Título */}
                    <div className="flex items-center h-full">
                        {/* Botão Mobile */}
                        <div className="flex items-center sm:hidden">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-[#8A3249]/20 focus:outline-2 focus:-outline-offset-1 focus:outline-[#8A3249]"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Abrir menu principal</span>
                                {/* Ícones SVG (Hamburguer/X) */}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`size-6 ${isMenuOpen ? 'hidden' : 'block'}`}><path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`size-6 ${isMenuOpen ? 'block' : 'hidden'}`}><path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>

                        {/* Logo e Título (Espaçamento ajustado) */}
                        <div className="flex shrink-0 items-center h-full ml-4 sm:ml-0">
                            <img
                                src={LogoImage}
                                alt="Anime Burguer Logo"
                                className="h-full w-auto object-contain pr-4" 
                            />
                            <div className="text-gray-800 text-left leading-none">
                                <p className="font-bold font-Atop text-3xl text-white text-stroke">
                                    ANIMES
                                </p>
                                <p className="font-bold text-2xl text-black font-Adlam">
                                    BURGUER
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bloco do Centro: Links Desktop */}
                    <div className="hidden sm:block">
                        <div className="flex space-x-4">
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`rounded-xl px-3 py-2 text-xl font-Atop text-stroke text-white transition duration-150 flex items-center space-x-1 flex items-center space-x-2${item.current ? activeLinkClass : defaultLinkClass}`}
                                    aria-current={item.current ? 'page' : undefined}>
                                    
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Bloco da Direita: Botão Carrinho */}
                    <div className="hidden sm:block">
                        <button
                            type="button"
                            className="relative rounded-full p-2 bg-[#8A3249] hover:bg-[#A0405A] text-white font-semibold transition duration-300 border-2 border-black flex items-center space-1 font-Atop text-stroke"
                        >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon className="h-5 w-5" />
                            <span className="px-2">Carrinho</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Menu mobile */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`block rounded-md px-3 py-2 text-base font-medium ${item.current ? activeLinkClass : defaultLinkClass
                                }`}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Serapador */}
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gray-900"></div>
                    
        </div>
    );
}


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
                        <button className="font-Adlam uppercase bg-[#8A3249] text-white text-lg py-3 px-7 rounded-full border-black border-4">
                            Peça Agora
                        </button>
                        <button className="font-Adlam uppercase bg-white text-gray-800 text-lg px-5 rounded-full border-4 border-black">
                            Ver Cardápio
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

function DestaquesSection() {

    const [destaqueProducts, setDestaqueProducts] = useState([]);

    const buscarProdutos = async () => {
        try {
             const resposta = await axios.get("http://localhost:3000/api/produtos");
             setDestaqueProducts(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    return (
        <section className="w-full bg-[#F9E8B0] py-16 px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2
          className="font-Atop font-semibold text-7xl mb-12 text-stroke text-[#F78C26] text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)]"
          style={{ textShadow: "6px 6px 0px #000" }}
        >
          DESTAQUES
        </h2>

        <div className="grid grid-cols-3 justify-items-center">
          {destaqueProducts.length > 0 ? (
            destaqueProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-xl border-4 border-black w-full max-w-xs overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative p-2 border-b-4 border-black">
                  <img
                    src={product.imagem_url || "##"}
                    alt={product.nome}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute inset-1 border-2 rounded-md pointer-events-none"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-bold font-adlam text-gray-800 mb-2">
                    {product.nome}
                  </h3>
                  <p className="text-2xl font-bold font-atop text-[#8A3249]">
                    R$ {product.preco.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">Carregando produtos...</p>
          )}
        </div>
      </div>
    </section>
    );
}

function Home() {
    return (
        <main>
            <Navbar /> 
            <Banner />
            <DestaquesSection />
        </main>
    );
}

export default Home;