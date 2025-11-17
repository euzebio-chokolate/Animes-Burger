import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function resetPassword() {
  // --- DEFINA SUA NOVA SENHA AQUI ---
  const novaSenha = "admin123";
  // ---------------------------------

  if (!novaSenha) {
    console.error("ERRO: Defina a 'novaSenha' dentro do script.");
    return;
  }

  console.log(`Resetando a senha do 'admin@admin.com' para: "${novaSenha}"`);

  // Criptografa a nova senha
  const senhaHash = await bcrypt.hash(novaSenha, 10);

  try {
    // Atualiza o usuário no banco
    await prisma.usuario.update({
      where: { email: "admin@admin.com" },
      data: { senhaHash: senhaHash },
    });

    console.log("\n✅ Sucesso! Senha do admin foi atualizada.");
    console.log("Tente fazer login novamente com a nova senha.");

  } catch (err) {
    console.error("\n❌ ERRO: Não foi possível atualizar o usuário.");
    console.error("Verifique se o email 'admin@admin.com' existe no seu banco.");
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();