import React, { useState } from 'react';
import LogoImage from '../assets/images/logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/Carrinho';

import {
    BookOpenIcon,
    MapPinIcon,
    UserCircleIcon,
    ShoppingCartIcon,
    ChevronDownIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const { totalItems, openCart } = useCart();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const navLinks = [
        { name: 'Cardápio', href: '/cardapio', current: false, icon: BookOpenIcon },
        { name: 'Nosso Espaço', href: '/espaco', current: false, icon: MapPinIcon },
    ];

    const handleLogout = () => {
        localStorage.clear();
        setIsAccountMenuOpen(false);
        navigate('/');
        window.location.reload();
    };

    const navBgClass = 'bg-[#F78C26] shadow-xl border-b-4 border-black'; // Borda preta no fundo
    const activeLinkClass = 'bg-[#8A3249]/80 text-white border-2 border-black shadow-sm';
    const defaultLinkClass = 'text-gray-900 hover:bg-[#8A3249]/20 hover:text-white hover:border-black/20';

    return (
        <>
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-down {
                    animation: slideDown 0.6s ease-out forwards;
                }
            `}</style>

            <div className={`relative ${navBgClass} h-20 animate-slide-down z-40`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                    <div className="relative flex h-full items-center justify-between">

                        {/* Bloco da Esquerda: Logo */}
                        <div className="flex items-center h-full gap-2">
                            {/* Botão Mobile */}
                            <div className="flex items-center sm:hidden">
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-[#8A3249]/20 focus:outline-none"
                                >
                                    <span className="sr-only">Abrir menu</span>
                                    {isMenuOpen ? (
                                        <XMarkIcon className="h-8 w-8" />
                                    ) : (
                                        <Bars3Icon className="h-8 w-8" />
                                    )}
                                </button>
                            </div>

                            <Link to="/" className="flex shrink-0 items-center h-full hover:scale-105 transition-transform">
                                <img
                                    src={LogoImage}
                                    alt="Anime Burguer Logo"
                                    className="h-12 md:h-14 w-auto object-contain pr-2"
                                />
                                <div className="text-left leading-none hidden xs:block">
                                    <p className="font-bold font-Atop text-2xl md:text-3xl text-white text-stroke" style={{ textShadow: "2px 2px 0 #000" }}>
                                        ANIMES
                                    </p>
                                    <p className="font-bold text-xl md:text-2xl text-black font-Adlam">
                                        BURGUER
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Bloco do Centro: Links Desktop */}
                        <div className="hidden sm:flex items-center space-x-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`rounded-xl px-4 py-2 text-lg font-Adlam font-bold transition-all duration-200 flex items-center gap-2 ${item.current ? activeLinkClass : defaultLinkClass}`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}

                            {/* Dropdown Minha Conta */}
                            {token ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                        className={`rounded-xl px-4 py-2 text-lg font-Adlam font-bold transition-all duration-200 flex items-center gap-2 ${defaultLinkClass}`}
                                    >
                                        <UserCircleIcon className="h-5 w-5" />
                                        <span>Minha Conta</span>
                                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isAccountMenuOpen && (
                                        <div 
                                            className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-slide-down"
                                            onMouseLeave={() => setIsAccountMenuOpen(false)}
                                        >
                                            <div className="py-1">
                                                <Link to="/conta" onClick={() => setIsAccountMenuOpen(false)} className="text-gray-800 block px-4 py-3 text-lg font-adlam hover:bg-gray-100 transition-colors border-b-2 border-gray-100">
                                                    Meus Dados
                                                </Link>
                                                <Link to="/meus-pedidos" onClick={() => setIsAccountMenuOpen(false)} className="text-gray-800 block px-4 py-3 text-lg font-adlam hover:bg-gray-100 transition-colors border-b-2 border-gray-100">
                                                    Meus Pedidos
                                                </Link>
                                                <button onClick={handleLogout} className="text-red-600 block w-full text-left px-4 py-3 text-lg font-adlam hover:bg-red-50 transition-colors">
                                                    Sair
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className={`rounded-xl px-4 py-2 text-lg font-Adlam font-bold transition-all duration-200 flex items-center gap-2 ${defaultLinkClass}`}>
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Bloco da Direita: Carrinho */}
                        <div className="hidden sm:block">
                            <button
                                type="button"
                                onClick={openCart}
                                className="relative rounded-xl p-2 bg-[#8A3249] hover:bg-[#A0405A] text-white font-semibold transition-all duration-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none flex items-center gap-2 group"
                            >
                                <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                <span className="font-Adlam text-lg px-1">Carrinho</span>
                                
                                {totalItems > 0 && (
                                    <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Menu Mobile (Dropdown) */}
                {isMenuOpen && (
                    <div className="sm:hidden absolute top-20 left-0 w-full bg-[#F9E8B0] border-b-4 border-black shadow-xl z-30 animate-slide-down">
                        <div className="space-y-2 px-4 pt-4 pb-6">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block rounded-lg px-4 py-3 text-lg font-Adlam font-bold text-black hover:bg-[#F78C26] border-2 border-transparent hover:border-black transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-6 w-6" />
                                        {item.name}
                                    </div>
                                </Link>
                            ))}

                            <hr className="border-black/20 my-2" />

                            {/* Botão Carrinho Mobile */}
                            <button 
                                onClick={() => { openCart(); setIsMenuOpen(false); }}
                                className="w-full text-left block rounded-lg px-4 py-3 text-lg font-Adlam font-bold text-black hover:bg-[#F78C26] border-2 border-transparent hover:border-black transition-all flex items-center gap-3"
                            >
                                <ShoppingCartIcon className="h-6 w-6" />
                                Carrinho ({totalItems})
                            </button>

                            <hr className="border-black/20 my-2" />

                            {token ? (
                                <>
                                    <Link to="/conta" onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-4 py-3 text-lg font-Adlam font-bold text-black hover:bg-[#F78C26] border-2 border-transparent hover:border-black transition-all">
                                        Meus Dados
                                    </Link>
                                    <Link to="/meus-pedidos" onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-4 py-3 text-lg font-Adlam font-bold text-black hover:bg-[#F78C26] border-2 border-transparent hover:border-black transition-all">
                                        Meus Pedidos
                                    </Link>
                                    <button onClick={handleLogout} className="block w-full text-left rounded-lg px-4 py-3 text-lg font-Adlam font-bold text-red-600 hover:bg-red-100 border-2 border-transparent hover:border-red-600 transition-all">
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-4 py-3 text-lg font-Adlam font-bold text-black hover:bg-[#F78C26] border-2 border-transparent hover:border-black transition-all flex items-center gap-3">
                                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;