import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export const authService = {
  async criarUsuario({ nome, email, senha, role = "user" }) {
    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await prisma.usuario.create({
      data: { nome, email, senhaHash, role }
    });
    return user;
  },

  async validarCredenciais(email, senha) {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) return null;
    const ok = await bcrypt.compare(senha, user.senhaHash);
    if (!ok) return null;
    return user;
  },

  gerarTokens(user) {
    const payload = { userId: user.id, role: user.role };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken };
  },

  async salvarRefreshToken(userId, token) {
    await prisma.usuario.update({
      where: { id: userId },
      data: { refreshToken: token }
    });
  },

  async verificarRefreshToken(token) {
    try {
      const payload = jwt.verify(token, JWT_REFRESH_SECRET);
      const user = await prisma.usuario.findUnique({ where: { id: payload.userId } });
      if (!user) throw new Error("Usuário não encontrado");
      if (!user.refreshToken) throw new Error("Refresh token inválido");
      if (user.refreshToken !== token) throw new Error("Refresh token não confere");
      return user;
    } catch (err) {
      throw err;
    }
  },

  async removerRefreshToken(userId) {
    await prisma.usuario.update({ where: { id: userId }, data: { refreshToken: null } });
  }
};
