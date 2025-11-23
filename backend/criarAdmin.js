import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function run() {
  try {
    const senhaHash = await bcrypt.hash('senhaNova123', 10);
    
    const admin = await prisma.usuario.upsert({
      where: { email: 'novo@admin.com' },
      update: { role: 'admin', senhaHash },
      create: {
        nome: 'Novo Admin',
        email: 'novo@admin.com',
        senhaHash,
        role: 'admin',
        cliente: { create: {} }
      },
    });
    console.log("Sucesso! Admin criado:", admin.email);
  } catch (e) {
    console.error("Erro:", e);
  } finally {
    await prisma.$disconnect();
  }
}

run();