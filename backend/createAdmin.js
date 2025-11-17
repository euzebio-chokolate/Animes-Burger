import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// --- DEFINA OS DADOS DO NOVO ADMIN AQUI ---
const novoAdmin = {
  nome: "Novo Admin",
  email: "novo@admin.com",
  senha: "senhaforte123"
};
// ------------------------------------------

async function criarAdmin() {
  if (!novoAdmin.email || !novoAdmin.senha || !novoAdmin.nome) {
    console.error("ERRO: Defina nome, email e senha do novo admin.");
    return;
  }

  console.log(`Criando novo admin: ${novoAdmin.email}`);

  // Criptografa a senha
  const senhaHash = await bcrypt.hash(novoAdmin.senha, 10);

  try {
    // Cria o usuário admin
    const usuario = await prisma.usuario.create({
      data: {
        nome: novoAdmin.nome,
        email: novoAdmin.email,
        senhaHash: senhaHash,
        role: "admin" // Define a role como admin
      }
    });

    // Cria o cliente vinculado (importante!)
    await prisma.cliente.create({
      data: {
        usuarioId: usuario.id
      }
    });

    console.log("\n✅ Sucesso! Novo admin foi criado.");
    console.log("Você já pode fazer login com esse email e senha.");

  } catch (err) {
    if (err.code === 'P2002') {
      console.error("\n❌ ERRO: Esse email já está em uso.");
    } else {
      console.error("\n❌ ERRO: Não foi possível criar o usuário.", err);
    }
  } finally {
    await prisma.$disconnect();
  }
}

criarAdmin();