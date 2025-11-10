import React, { useState } from 'react';
import LogoImage from '../../assets/images/logo.png';
import { 
    BookOpenIcon,
    MapPinIcon,
    UserCircleIcon,
    ShoppingCartIcon
} from '@heroicons/react/24/outline';


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

export default Navbar;