import React from 'react';
import { useCart } from '../pages/Carrinho';
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex flex-col p-4 bg-white border-4 border-black rounded-2xl mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
      
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-Adlam text-xl text-black leading-tight w-2/3">
            {item.nome}
        </h4>
        <p className="font-Adlam text-lg text-[#A0405A] font-bold">
            R$ {(item.preco * item.quantidade).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        {/* Controles de Quantidade */}
        <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <button 
            onClick={() => updateQuantity(item.produtoId, item.quantidade - 1)}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-md border-2 border-black hover:bg-gray-200 transition-colors"
          >
            <MinusIcon className="h-4 w-4 text-black" />
          </button>
          
          <span className="font-Adlam text-lg px-2 min-w-[20px] text-center">
            {item.quantidade}
          </span>
          
          <button 
            onClick={() => updateQuantity(item.produtoId, item.quantidade + 1)}
            className="w-8 h-8 flex items-center justify-center bg-[#F78C26] rounded-md border-2 border-black hover:bg-[#e57a1e] transition-colors text-white"
          >
            <PlusIcon className="h-4 w-4 text-white stroke-2" />
          </button>
        </div>

        {/* Botão Remover */}
        <button 
            onClick={() => removeItem(item.produtoId)}
            className="group flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
            title="Remover Item"
        >
          <div className="p-2 rounded-lg border-2 border-transparent group-hover:border-black group-hover:bg-red-100 transition-all">
             <TrashIcon className="h-6 w-6" />
          </div>
        </button>
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { isCartOpen, closeCart, cart, subtotal } = useCart();

  return (
    <div 
      className={`fixed inset-0 z-[60] transition-all duration-500 ease-in-out
        ${isCartOpen ? 'visible' : 'invisible'}
      `}
    >
      {/* Overlay Escuro com Fade */}
      <div 
        onClick={closeCart}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500
          ${isCartOpen ? 'opacity-100' : 'opacity-0'}
        `}
      ></div>

      {/* Conteúdo do Carrinho (Slide da Direita) */}
      <div 
        className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-[#F9E8B0] shadow-2xl border-l-4 border-black transition-transform duration-500 ease-out flex flex-col
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-4 border-black bg-[#F78C26]">
          <h2 
            className="font-Atop text-4xl text-white text-stroke tracking-wide drop-shadow-md"
            style={{ textShadow: "2px 2px 0px #000" }}
          >
            SEU CARRINHO
          </h2>
          <button 
            onClick={closeCart} 
            className="bg-white text-black p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Lista de Itens (Scrollável) */}
        <div className="flex-1 p-6 overflow-y-auto">
          {cart.itens.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <ShoppingBagIcon className="h-20 w-20 mb-4 text-gray-500" />
                <p className="font-Adlam text-2xl text-gray-700">
                    Seu carrinho está vazio.
                </p>
                <p className="font-Adlam text-lg text-gray-500 mt-2">
                    Bora pedir um burgão?
                </p>
            </div>
          ) : (
            cart.itens.map((item) => (
              <CartItem key={item.produtoId} item={item} />
            ))
          )}
        </div>

        {/* Footer (Total e Checkout) */}
        {cart.itens.length > 0 && (
            <div className="p-6 border-t-4 border-black bg-white z-10">
                
                <div className="flex justify-between items-end mb-4">
                    <span className="font-Adlam text-xl text-gray-600">Subtotal:</span>
                    <span className="font-Adlam text-4xl text-[#F78C26] text-stroke-sm" style={{ textShadow: "1px 1px 0 #000" }}>
                    R$ {subtotal.toFixed(2)}
                    </span>
                </div>

                <Link 
                    to="/checkout" 
                    onClick={closeCart}
                    className="block w-full text-center bg-[#A0405A] text-white font-Adlam text-2xl py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:bg-[#802d43]"
                >
                    Finalizar Pedido
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

// Ícone extra para o estado vazio
function ShoppingBagIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    )
}

export default CartSidebar;