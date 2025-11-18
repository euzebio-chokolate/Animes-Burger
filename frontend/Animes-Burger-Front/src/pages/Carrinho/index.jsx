import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';


const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ itens: [] }); // Guarda os itens do carrinho
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla se o sidebar está visível
  const [loading, setLoading] = useState(false);

  // Busca o carrinho do backend quando o app carrega
  useEffect(() => {
    const fetchCart = async () => {
      if (localStorage.getItem('token')) {
        try {
          const { data } = await api.get('/carrinho');
          setCart(data);
        } catch (err) {
          console.error("Não foi possível buscar o carrinho", err);
        }
      }
    };
    fetchCart();
  }, []);


  // --- Funções que os componentes vão usar ---

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Adiciona um item ao carrinho
  const addToCart = async (produtoId, quantidade) => {
    setLoading(true);
    try {
      // Chama sua API de backend
      const { data: newCart } = await api.post('/carrinho', {
        produtoId: Number(produtoId),
        quantidade: Number(quantidade)
      });
      setCart(newCart); // Atualiza o estado local
      openCart(); // Abre o sidebar
    } catch (err) {

      console.error("Erro ao adicionar item:", err);
      if (err.response && err.response.status === 401) {
        useNavigate('/login');
      } else {
        alert("Erro ao adicionar item ao carrinho.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (produtoId, quantidade) => {
    // Se a quantidade for 0 ou menos, remove o item
    if (quantidade < 1) {
      return removeItem(produtoId);
    }

    try {
      // Chama o endpoint PUT do seu back-end
      const { data: newCart } = await api.put('/carrinho', {
        produtoId: Number(produtoId),
        quantidade: Number(quantidade)
      });
      setCart(newCart); // Atualiza o estado
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      alert("Erro ao atualizar quantidade do item.");
    }
  };

  const removeItem = async (produtoId) => {
    try {
      // Chama o endpoint DELETE do seu back-end
      const { data: newCart } = await api.delete(`/carrinho/${produtoId}`);
      setCart(newCart); // Atualiza o estado
    } catch (err) {
      console.error("Erro ao remover item:", err);
      alert("Erro ao remover item do carrinho.");
    }
  };

  const clearCartBackend = async () => {
    try {
      // Chama o endpoint DELETE /carrinho (que limpa o carrinho do usuário)
      const { data: newCart } = await api.delete('/carrinho');
      setCart(newCart); // Atualiza o estado para { itens: [] }
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  };


  // --- Calcula o total (para o) ---
  const subtotal = cart.itens.reduce((acc, item) => {
    return acc + (item.preco * item.quantidade);
  }, 0);

  const totalItems = cart.itens.reduce((acc, item) => {
    return acc + item.quantidade;
  }, 0);


  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      loading,
      subtotal,
      totalItems,
      openCart,
      closeCart,
      addToCart,
      updateQuantity,
      removeItem,
      clearCartBackend,
    }}>
      {children}
    </CartContext.Provider>
  );
};