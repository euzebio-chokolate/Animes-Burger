import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { gerarAccessToken, gerarRefreshToken } from "../../utils/jwt.js";

const prisma = new PrismaClient();

export const usuarioService = {
  
  async registrar(data) {
    const { nome, email, senha } = data;

    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      throw new Error("Email já está em uso");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        role: "user" 
      }
    });

    await prisma.cliente.create({
      data: {
        usuarioId: usuario.id
      }
    });

    return usuario;
  },

  async login({ email, senha }) {

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new Error("Usuário não encontrado");

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaCorreta) throw new Error("Senha incorreta");

    const accessToken = gerarAccessToken(usuario);
    const refreshToken = gerarRefreshToken(usuario);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { refreshToken }
    });

    return { accessToken, refreshToken, usuario };
  },

  async renovarToken(refreshToken) {
    if (!refreshToken) throw new Error("Token ausente");

    const usuario = await prisma.usuario.findFirst({
      where: { refreshToken }
    });

    if (!usuario) throw new Error("Refresh token inválido");

    const novoAccess = gerarAccessToken(usuario);
    return novoAccess;
  }
};
