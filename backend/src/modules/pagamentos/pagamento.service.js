import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

// Configuração do Cliente
const prisma = new PrismaClient();
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
const payment = new Payment(client);

export const pagamentoService = {
  
  async gerarPix(pedidoId, valor, email, nome) {
    try {
      const body = {
        transaction_amount: Number(valor),
        description: `Pedido #${pedidoId} - Animes Burger`,
        payment_method_id: 'pix',
        payer: {
          email: email,
          first_name: nome
        },
        
        external_reference: String(pedidoId), 
      };

      const response = await payment.create({ body });
      
      return {
        id: response.id,
        status: response.status,
        qr_code: response.point_of_interaction.transaction_data.qr_code,
        qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
        ticket_url: response.point_of_interaction.transaction_data.ticket_url
      };

    } catch (error) {
      console.error("Erro ao criar PIX:", error);
      throw new Error("Erro ao gerar PIX no Mercado Pago");
    }
  },

  async verificarStatus(paymentId) {
    try {
      const response = await payment.get({ id: paymentId });
      
      if (response.status === 'approved') {
        const pedidoId = Number(response.external_reference);
        
        // Atualiza o pedido para 'preparando' automaticamente
        await prisma.pedido.update({
            where: { id: pedidoId },
            data: { status: 'preparando' }
        });
      }

      return response.status;
    } catch (error) {
      throw new Error("Erro ao verificar pagamento");
    }
  }
};