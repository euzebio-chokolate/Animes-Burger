import React from 'react';
import { useCart } from '../pages/carrinho';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleRemove = () => {
    removeItem(item.produtoId);
  };
  const handleUpdateQty = (novaQuantidade) => {
    updateQuantity(item.produtoId, novaQuantidade);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-4 border-black rounded-2xl mb-3">
      <div className="flex-1">
        <h4 className="font-Adlam text-2xl text-black">{item.nome}</h4>
        {/* Seletor de Quantidade */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => handleUpdateQty(item.quantidade - 1)}
            className="w-7 h-7 font-bold font-Adlam text-xl"
          >
            -
          </button>
          <span className="font-adlam text-lg px-2">{item.quantidade}</span>
          <button
            onClick={() => handleUpdateQty(item.quantidade + 1)}
            className="w-7 h-7 font-bold font-Adlam text-xl"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right ml-4">
        <p className="font-Adlam text-2xl text-black">R$ {item.preco.toFixed(2)}</p>
        <button onClick={handleRemove} className="text-red-600 hover:text-red-800 mt-1">
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const CartSidebar = () => {
  const { isCartOpen, closeCart, cart, subtotal } = useCart();

  return (
    //Container Principal
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out
        ${isCartOpen ? 'visible' : 'invisible'}
      `}
    >
      {/*O Overlay*/}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black transition-opacity
          ${isCartOpen ? 'opacity-50' : 'opacity-0'}
        `}
      ></div>

      {/*Conteúdo do Carrinho*/}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-[#F9E8B0] transition-transform duration-300 ease-in-out
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/*Header do Carrinho*/}
        <div className="flex justify-between items-center p-5 ">
          <h2 className="font-Atop font-semibold text-stroke text-4xl text-[#F78C26]"
            style={{ textShadow: "6px 6px 0px #000" }}>
            Seu Carrinho
          </h2>
          <button onClick={closeCart} className="text-black hover:text-gray-700">
            <XMarkIcon className="h-9 w-9" />
          </button>
        </div>

        {/*Lista de Itens*/}
        <div className="p-5 overflow-y-auto h-[calc(100vh-220px)]">
          {cart.itens.length === 0 ? (
            <p className="text-center text-gray-700 font-Adlam text-lg">
              Seu carrinho está vazio.
            </p>
          ) : (
            cart.itens.map((item) => (
              <CartItem key={item.produtoId} item={item} />
            ))
          )}
        </div>

        {/* Footer*/}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t-4 border-black bg-[#F9E8B0]">
          <div className="flex justify-between items-center mb-3">
            <span className="font-Adlam text-xl text-black">Subtotal:</span>
            <span className="font-Adlam text-3xl text-black">
              R$ {subtotal.toFixed(2)}
            </span>
          </div>
          <Link
            to="/checkout"
            className="block w-full text-center bg-[#9E3D46] text-white text-stroke font-Adlam text-2xl py-3 rounded-2xl border-4 border-black shadow-lg hover:bg-red-700"
          >
            Finalizar Pedido
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;