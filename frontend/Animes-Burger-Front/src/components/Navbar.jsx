import React, { useState } from 'react';
import LogoImage from '../assets/images/logo.png';

// 1. Importações adicionadas
import { Link, useNavigate } from 'react-router-dom'; // Importe o useNavigate
import { useCart } from '../pages/carrinho'; //

import {
    BookOpenIcon,
    MapPinIcon,
    UserCircleIcon,
    ShoppingCartIcon,
    ChevronDownIcon, // Ícone para o dropdown
    ArrowRightOnRectangleIcon // Ícone para Login
} from '@heroicons/react/24/outline';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // 2. Novo state para o dropdown
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const { totalItems, openCart } = useCart(); //
    const navigate = useNavigate(); // Para o logout

    // 3. Verifica se está logado
    const token = localStorage.getItem('token');

    // 4. Remove 'Minha Conta' da lista principal
    const navLinks = [
        { name: 'Cardápio', href: '/cardapio', current: false, icon: BookOpenIcon }, //
        { name: 'Nosso Espaço', href: '/espaco', current: false, icon: MapPinIcon }, //
    ];
    
    // 5. Função de Logout
    const handleLogout = () => {
        localStorage.clear(); // Limpa token, role, etc.
        setIsAccountMenuOpen(false); // Fecha o dropdown
        navigate('/'); // Volta para a Home
        window.location.reload(); // Força a atualização do estado do Navbar
    };

    const navBgClass = 'bg-[#F78C26] shadow-xl'; //
    const activeLinkClass = 'bg-[#8A3249]/80 text-white border-2 border-black'; //
    const defaultLinkClass = 'text-gray-800 hover:bg-[#8A3249]/20 hover:text-white'; //

    return (
        <div className={`relative ${navBgClass} h-20`}> {/* */}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
                <div className="relative flex h-full items-center justify-between">

                    {/* Bloco da Esquerda: (Sem alterações) */}
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
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`size-6 ${isMenuOpen ? 'hidden' : 'block'}`}><path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`size-6 ${isMenuOpen ? 'block' : 'hidden'}`}><path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>

                        {/* Logo e Título (Sem alterações) */}
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

                    {/* Bloco do Centro: Links Desktop (ATUALIZADO) */}
                    <div className="hidden sm:block">
                        <div className="flex items-center space-x-4"> {/* Alinhando itens */}
                            
                            {/* Links Normais (Cardápio, Nosso Espaço) */}
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`rounded-xl px-3 py-2 text-xl font-Atop text-stroke text-white transition duration-150 flex items-center space-x-1 ${item.current ? activeLinkClass : defaultLinkClass}`}
                                    aria-current={item.current ? 'page' : undefined}>
                                    
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}

                            {/* 6. Lógica de Dropdown ou Botão de Login */}
                            {token ? (
                                // --- SE ESTIVER LOGADO: MOSTRA O DROPDOWN ---
                                <div className="relative">
                                    <button
                                        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                        className={`rounded-xl px-3 py-2 text-xl font-Atop text-stroke text-white transition duration-150 flex items-center space-x-1 ${defaultLinkClass}`}
                                    >
                                        <UserCircleIcon className="h-5 w-5" />
                                        <span>Minha Conta</span>
                                        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Painel do Dropdown */}
                                    {isAccountMenuOpen && (
                                        <div 
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#F9E8B0] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            onMouseLeave={() => setIsAccountMenuOpen(false)} // Fecha ao tirar o mouse
                                        >
                                            <div className="py-1" role="menu" aria-orientation="vertical">
                                                <Link
                                                    to="/conta" // Página "Meus Dados"
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="text-gray-700 block px-4 py-2 text-lg font-Adlam hover:bg-gray-100"
                                                >
                                                    Meus Dados
                                                </Link>
                                                <Link
                                                    to="/meus-pedidos" // Página "Meus Pedidos"
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="text-gray-700 block px-4 py-2 text-lg font-Adlam hover:bg-gray-100"
                                                >
                                                    Meus Pedidos
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="text-red-700 block w-full text-left px-4 py-2 text-lg font-Adlam hover:bg-gray-100"
                                                >
                                                    Sair
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // --- SE ESTIVER DESLOGADO: MOSTRA O BOTÃO DE LOGIN ---
                                <Link
                                    to="/login"
                                    className={`rounded-xl px-3 py-2 text-xl font-Atop text-stroke text-white transition duration-150 flex items-center space-x-1 ${defaultLinkClass}`}
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Bloco da Direita: Botão Carrinho (Sem alterações) */}
                    <div className="hidden sm:block">
                        <button
                            type="button"
                            onClick={openCart} //
                            className="relative rounded-full p-2 bg-[#8A3249] hover:bg-[#A0405A] text-white font-semibold transition duration-300 border-2 border-black flex items-center space-1 font-Atop text-stroke" //
                        >
                            <ShoppingCartIcon className="h-5 w-5" />
                            <span className="px-2">Carrinho</span>
                            {totalItems > 0 && ( //
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Menu mobile (ATUALIZADO) */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    
                    {/* Links Normais */}
                    {navLinks.map((item) => (
                        // 7. CORREÇÃO: <button> mudado para <Link>
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`block rounded-md px-3 py-2 text-base font-medium ${item.current ? activeLinkClass : defaultLinkClass}`}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <hr className="border-gray-700 my-2" />

                    {/* 8. Opções de Conta/Login no Mobile */}
                    {token ? (
                        <>
                            <Link to="/conta" className={`block rounded-md px-3 py-2 text-base font-medium ${defaultLinkClass}`}>
                                Meus Dados
                            </Link>
                            <Link to="/meus-pedidos" className={`block rounded-md px-3 py-2 text-base font-medium ${defaultLinkClass}`}>
                                Meus Pedidos
                            </Link>
                            <button onClick={handleLogout} className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-300 hover:bg-red-700 hover:text-white`}>
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className={`block rounded-md px-3 py-2 text-base font-medium ${defaultLinkClass}`}>
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Separador (Sem alterações) */}
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gray-900"></div>
                    
        </div>
    );
}

export default Navbar;