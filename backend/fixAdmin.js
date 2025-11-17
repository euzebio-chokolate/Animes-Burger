import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// --- Defina a senha que você QUER usar ---
const SENHA_DEFINITIVA = "admin123";
const EMAIL_PARA_CORRIGIR = "novo@admin.com";
// ---------------------------------------

async function fixPassword() {
  console.log(`\nIniciando correção de senha para: ${EMAIL_PARA_CORRIGIR}`);

  try {
    // 1. Gera um novo hash limpo
    console.log(`Gerando novo hash para a senha: "${SENHA_DEFINITIVA}"...`);
    const novoHash = await bcrypt.hash(SENHA_DEFINITIVA, 10);
    console.log("Novo hash gerado:", novoHash);

    // 2. Atualiza o usuário no banco
    await prisma.usuario.update({
      where: { email: EMAIL_PARA_CORRIGIR },
      data: { senhaHash: novoHash },
    });

    console.log("\n✅ Sucesso! A senha foi corrigida no banco de dados.");
    console.log("Por favor, reinicie seu servidor de back-end e tente fazer login.");

  } catch (err) {
    console.error("\n❌ ERRO: Não foi possível corrigir a senha.", err);
  } finally {
    await prisma.$disconnect();
  }
}

fixPassword();