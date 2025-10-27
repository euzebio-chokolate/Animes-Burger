// testPrisma.js
// Importa o PrismaClient gerado automaticamente
import { PrismaClient } from '@prisma/client'

// Cria uma instância do Prisma para se conectar ao banco
const prisma = new PrismaClient()

// Função assíncrona para testar a conexão e listar produtos
async function main() {
  try {
    // Busca todos os produtos do banco
    const produtos = await prisma.produto.findMany()

    // Exibe no terminal
    console.log("✅ Conexão bem-sucedida! Produtos encontrados:")
    console.log(produtos)
  } catch (error) {
    console.error("❌ Erro ao conectar ou buscar produtos:", error)
  } finally {
    // Encerra a conexão com o banco
    await prisma.$disconnect()
  }
}

// Executa a função principal
main()
