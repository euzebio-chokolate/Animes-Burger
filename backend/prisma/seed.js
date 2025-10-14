import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando a população de dados...');

  const produto1 = await prisma.product.create({
    data: {
      nome: 'Hambúrguer de Anime Clássico',
      descricao: 'Um hambúrguer suculento com molho especial de soja e gergelim.',
      preco: 25.50,
      disponivel: true,
    },
  });

  const produto2 = await prisma.product.create({
    data: {
      nome: 'Combo Ramen e Batata Frita',
      descricao: 'Batata frita temperada e um pequeno ramen de porco.',
      preco: 35.00,
      disponivel: true,
    },
  });
  
  console.log(`Produto inserido: ${produto1.nome}`);
  console.log(`Produto inserido: ${produto2.nome}`);

}