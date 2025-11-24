import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function run() {
  try {
    const senhaHash = await bcrypt.hash('admin', 10);
    
    const admin = await prisma.usuario.upsert({
      where: { email: 'admin@admin.com' },
      update: { role: 'admin', senhaHash },
      create: {
        nome: 'Administrador',
        email: 'admin@admin.com',
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