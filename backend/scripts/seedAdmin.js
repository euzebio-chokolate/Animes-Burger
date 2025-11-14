import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main(){
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const senha = process.env.ADMIN_PASS || "adm!n123";
  const nome = "Administrador";

  const senhaHash = await bcrypt.hash(senha, 10);

  const existing = await prisma.usuario.findUnique({ where: { email }});
  if (!existing) {
    await prisma.usuario.create({
      data: { nome, email, senhaHash, role: "admin" }
    });
    console.log("Admin criado:", email);
  } else {
    console.log("Admin já existe:", email);
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });
