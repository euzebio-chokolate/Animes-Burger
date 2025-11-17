import { usuarioService } from "./usuario.service.js";

export const usuarioController = {
  
  async registrar(req, res) {
    try {
      const usuario = await usuarioService.registrar(req.body);
      res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        usuario
      });
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async login(req, res) {
    try {
      const dados = await usuarioService.login(req.body);
      res.json(dados);
    } catch (erro) {
      res.status(400).json({ erro: erro.message });
    }
  },

  async renovar(req, res) {
    try {
      const token = await usuarioService.renovarToken(req.body.refreshToken);
      res.json({ accessToken: token });
    } catch (erro) {
      res.status(401).json({ erro: erro.message });
    }
  }
};
