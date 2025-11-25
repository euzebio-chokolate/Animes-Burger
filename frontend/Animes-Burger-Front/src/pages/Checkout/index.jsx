import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useCart } from '../Carrinho';
import { useNavigate } from 'react-router-dom';
import PixModal from '../../components/PixModal';

const Checkout = () => {
  const { cart, subtotal, clearCartBackend } = useCart();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [tipoPedido, setTipoPedido] = useState('retirada'); 
  const [formaPagamento, setFormaPagamento] = useState('pix'); 
  const [observacoes, setObservacoes] = useState('');
  
  // States do PIX
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [pedidoCriadoId, setPedidoCriadoId] = useState(null);

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
    
    const statusInicial = formaPagamento === 'pix' ? 'aguardando_pagamento' : 'preparando';

    const pedidoData = {
      clienteId: cliente.id,
      tipoPedido: 'retirada',
      status: statusInicial,
      formaPagamento: formaPagamento,
      observacoes: observacoes,
      itens: cart.itens.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
      }))
    };

    try {
      // 1. Cria o pedido
      const { data: novoPedido } = await api.post('/pedidos', pedidoData);
      setPedidoCriadoId(novoPedido.id);

      // 2. Fluxo PIX
      if (formaPagamento === 'pix') {
        // Gera o PIX no backend
        const { data: dadosPix } = await api.post('/pagamento/pix', {
          pedidoId: novoPedido.id,
          valor: subtotal, 
          email: cliente.usuario.email,
          nome: cliente.usuario.nome
        });
        
        setPixData(dadosPix);
        setShowPixModal(true); // Abre o modal
        setLoading(false);
        return; // Para aqui e espera o modal
      }

      // 3. Fluxo Dinheiro
      await finalizarProcesso(novoPedido.id);

    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      setError("Erro ao processar o pedido: " + (err.response?.data?.erro || err.message));
      setLoading(false);
    }
  };

  const finalizarProcesso = async (pedidoId) => {
      await clearCartBackend(); 
      
      navigate(`/pedido-confirmado/${pedidoId}`);
  };

  const onPixPago = () => {
     // Aguarda um pouquinho para o usuário ver o "Sucesso" no modal
     setTimeout(() => {
        setShowPixModal(false);
        finalizarProcesso(pedidoCriadoId);
     }, 2000); 
  };

  if (loading && !cliente) return (
    <div className="bg-[#F9E8B0] min-h-screen flex items-center justify-center">
        <p className="text-center font-Adlam text-2xl animate-pulse">Carregando checkout...</p>
    </div>
  );

  if (error) return (
    <div className="bg-[#F9E8B0] min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-center font-Adlam text-2xl">{error}</p>
    </div>
  );

  if (!cliente || cart.itens.length === 0) {
      return (
        <div className="bg-[#F9E8B0] min-h-screen flex flex-col items-center justify-center p-4">
          <p className="font-Adlam text-3xl text-gray-800 mb-6 text-center">Seu carrinho está vazio.</p>
          <button 
            onClick={() => navigate('/cardapio')} 
            className="font-Adlam text-2xl bg-red-600 text-white py-3 px-8 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Voltar ao Cardápio
          </button>
        </div>
      );
  }

  const total = subtotal; 

  return (
    <div className="bg-[#F9E8B0] min-h-screen p-4 py-12 flex flex-col items-center overflow-x-hidden">
        
        <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.8s ease-out forwards;
                opacity: 0;
            }
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
        `}</style>

      {/* Modal do PIX */}
      <PixModal 
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        pixData={pixData}
        onPaymentSuccess={onPixPago}
      />

      <div className="animate-slide-up text-center mb-10">
        <h1 
            className="font-Atop text-stroke text-[#F78C27] font-semibold text-5xl md:text-7xl text-center mb-4 drop-shadow-lg"
            style={{ textShadow: "4px 4px 0px #000" }}
        >
            FINALIZAR PEDIDO
        </h1>
        <p className="font-Adlam text-2xl text-black">Estamos quase lá!</p>
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* Coluna da Esquerda */}
        <div className="md:col-span-2 space-y-8 animate-slide-up delay-100">

          <div className="bg-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black p-6 md:p-8">
            <h2 className="font-Adlam text-2xl md:text-3xl text-black mb-6 flex items-center gap-2">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xl">1</span> 
                Forma de Pagamento
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setFormaPagamento('pix')}
                className={`p-4 rounded-xl border-4 font-Adlam text-xl md:text-2xl transition-all duration-200 transform hover:-translate-y-1
                  ${formaPagamento === 'pix' 
                    ? 'bg-[#4B6584] border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 hover:border-gray-400'}
                `}
              >
                PIX
              </button>
              <button
                onClick={() => setFormaPagamento('dinheiro')}
                className={`p-4 rounded-xl border-4 font-Adlam text-xl md:text-2xl transition-all duration-200 transform hover:-translate-y-1
                  ${formaPagamento === 'dinheiro' 
                    ? 'bg-[#4B6584] border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 hover:border-gray-400'}
                `}
              >
                Dinheiro
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-[#F9E8B0]/50 rounded-xl border-2 border-dashed border-black/20">
                {formaPagamento === 'pix' && (
                    <p className="font-Adlam text-lg text-gray-800">
                    ℹ️ O QR Code será gerado na próxima tela. Pagamento automático!
                    </p>
                )}
                {formaPagamento === 'dinheiro' && (
                    <p className="font-Adlam text-lg text-gray-800">
                    ℹ️ O pagamento em dinheiro será feito no balcão durante a retirada.
                    </p>
                )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black p-6 md:p-8">
            <h2 className="font-Adlam text-2xl md:text-3xl text-black mb-6 flex items-center gap-2">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-xl">2</span>
                Observações
            </h2>
            <textarea
              className="w-full p-4 h-32 rounded-xl border-4 border-gray-300 focus:border-[#F78C26] focus:ring-0 outline-none text-lg font-Adlam transition-colors placeholder-gray-400"
              placeholder="Ex: Tirar cebola, ponto da carne..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="md:col-span-1 animate-slide-up delay-200">
            <div className="bg-[#F78C26] rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black p-6 md:p-8 flex flex-col sticky top-8">
                <h2 className="font-Adlam text-stroke text-white text-4xl mb-8 text-center" style={{ textShadow: "2px 2px 0px #000" }}>
                    RESUMO
                </h2>
            
                <div className="flex-grow space-y-4 mb-8 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
                    {cart.itens.map(item => (
                    <div key={item.produtoId} className="flex flex-col border-b-2 border-black/10 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between font-Adlam text-lg md:text-xl text-black">
                            <span className="flex-1 pr-2">{item.nome}</span>
                            <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                        </div>
                        <span className="font-Adlam text-sm text-black/60 font-bold">Qtd: {item.quantidade}</span>
                    </div>
                    ))}
                </div>

                <div className="space-y-2 border-t-4 border-black pt-6 mb-8">
                    <div className="flex justify-between font-Adlam text-xl text-black">
                        <span>Subtotal:</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-Adlam text-3xl font-bold text-white border-t-2 border-black/20 pt-4 mt-2" style={{ textShadow: "1px 1px 0px #000" }}>
                        <span>Total:</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleFinalizarPedido}
                    disabled={loading || cart.itens.length === 0}
                    className="w-full text-center bg-[#8A3249] text-white font-Adlam text-2xl md:text-3xl py-4 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#A0405A] hover:translate-y-1 hover:shadow-none transition-all disabled:bg-gray-500 disabled:border-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? "Processando..." : (formaPagamento === 'pix' ? "Gerar PIX" : "Confirmar Pedido")}
                </button>
                
                {error && <p className="text-white font-bold bg-red-600/80 p-2 rounded-lg border-2 border-black font-Adlam text-center mt-4 text-sm">{error}</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;