import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useCart } from '../carrinho';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, subtotal, clearCartBackend } = useCart();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const [formaPagamento, setFormaPagamento] = useState('pix');
  const [observacoes, setObservacoes] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const { data } = await api.get('/clientes/perfil');
        setCliente(data);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError("Erro ao carregar dados do cliente.");
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, []);

  const handleFinalizarPedido = async () => {
    setLoading(true);
    setError(null);
    
    const pedidoData = {
      clienteId: cliente.id,
      tipoPedido: 'retirada',
      status: 'pendente',
      formaPagamento: formaPagamento,
      observacoes: observacoes,
      itens: cart.itens.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
      }))
    };

    try {
      const { data: novoPedido } = await api.post('/pedidos', pedidoData);
      await clearCartBackend(); 
      navigate(`/pedido-confirmado/${novoPedido.id}`);

    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      setError("Erro ao finalizar pedido: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading && !cliente) return <p className="text-center p-8 font-adlam text-xl">Carregando...</p>;
  if (error) return <p className="text-red-600 text-center p-8 font-adlam text-xl">{error}</p>;
  if (!cliente || cart.itens.length === 0) {
    // ... (código para carrinho vazio)
  }

  const total = subtotal; 

  return (
    <div className="bg-[#F9E8B0] min-h-screen p-4 py-12 flex flex-col items-center">
      <h1 className="font-Atop font-semibold text-7xl text-center mb-4 text-stroke text-[#F78C26]"
      style={{ textShadow: "6px 6px 0px #000" }}>
        FINALIZAR PEDIDO
      </h1>
      <p className="font-Afacad text-2xl text-black text-center mb-10">Estamos quase lá!</p>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna da Esquerda: Forma de Pagamento e Observações */}
        <div className="md:col-span-2 space-y-8">

          {/* Forma de Pagamento */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-black p-6">
            <h2 className="font-Adlam text-4xl text-black mb-5">Forma de Pagamento</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormaPagamento('pix')}
                className={`p-4 rounded-xl border-4 font-Adlam text-3xl transition-colors
                  ${formaPagamento === 'pix' ? 'bg-[#4B6584] border-black text-white shadow-lg' : 'bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300'}
                `}
              >
                PIX
              </button>
              <button
                onClick={() => setFormaPagamento('dinheiro')}
                className={`p-4 rounded-xl border-4 font-Adlam text-3xl transition-colors
                  ${formaPagamento === 'dinheiro' ? 'bg-[#4B6584] border-black text-white shadow-lg' : 'bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300'}
                `}
              >
                Dinheiro
              </button>
            </div>
            
            {/* Explicação da Forma de Pagamento */}
            {formaPagamento === 'pix' && (
                <p className="font-Adlam text-lg text-gray-700 mt-4 p-3 bg-gray-100 rounded-lg">
                  O pagamento via PIX deverá ser feito no balcão durante a retirada.
                </p>
            )}
            {formaPagamento === 'dinheiro' && (
                <p className="font-Adlam text-lg text-gray-700 mt-4 p-3 bg-gray-100 rounded-lg">
                  O pagamento em Dinheiro será feito no balcão durante a retirada.
                </p>
            )}
          </div>

          {/* --- MUDANÇA 4: Bloco de Endereço/Tipo de Pedido REMOVIDO --- */}
          {/* (Removi os blocos de Tipo de Pedido e Endereço) */}

          {/* Observações */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-black p-6">
            <h2 className="font-Adlam text-4xl text-black mb-5">Observações</h2>
            <textarea
              className="w-full p-3 h-28 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg font-Afacad"
              placeholder="Ex: Tirar cebola, ponto da carne..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Coluna da Direita: Resumo do Pedido */}
        <div className="md:col-span-1 bg-[#F78C26] rounded-2xl shadow-xl border-4 border-black p-6 flex flex-col">
          <h2 className="font-Atop text-stroke text-white font-semibold text-5xl mb-6 text-center"
          style={{ textShadow: "6px 6px 0px #000" }}
          >RESUMO</h2>
          
          <div className="flex-grow space-y-3 mb-6 bg-white rounded-xl p-4 border-4 border-black">
            {cart.itens.map(item => (
              <div key={item.produtoId} className="flex flex-col border-b border-yellow-700 pb-2 last:border-b-0">
                <div className="flex justify-between font-Adlam text-2xl text-black">
                  <span>{item.nome}</span>
                  <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
                <span className="font-Adlam text-lg text-gray-800">Qtd: {item.quantidade}</span>
              </div>
            ))}
          </div>

          {/* --- MUDANÇA 5: Resumo do Total Simplificado --- */}
          <div className="space-y-2 border-t-2 border-black pt-4 mb-6">
            <div className="flex justify-between font-Adlam text-xl text-black">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            {/* Taxa de Entrega Removida */}
            <div className="flex justify-between font-Adlam text-3xl text-red-700 border-t border-black pt-2">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* --- MUDANÇA 6: Lógica do Botão Atualizada --- */}
          <button
            onClick={handleFinalizarPedido}
            disabled={
              loading || 
              cart.itens.length === 0 || 
              formaPagamento !== 'dinheiro' // Desabilitado se não for 'dinheiro'
            }
            className="w-full text-center bg-[#8A3249] text-white text-stroke font-Adlam text-3xl py-3 rounded-xl border-4 border-black shadow-lg hover:bg-[#A0405A] transition-colors disabled:bg-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Confirmando..." : "Confirmar Pedido"}
          </button>
          
          {error && <p className="text-red-700 font-adlam text-center mt-3">{error}</p>}
          
          {/* Aviso de Botão Desabilitado */}
          {formaPagamento !== 'dinheiro' && (
            <p className="font-adlam text-sm text-center text-gray-800 mt-3">
              (Pagamento via PIX será habilitado em breve. Por favor, selecione "Dinheiro" para continuar.)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;