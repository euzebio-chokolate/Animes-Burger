import { authService } from "./auth.service.js";

export const authController = {
  async register(req, res) {
    try {
      const { nome, email, senha, role } = req.body;
      if (!email || !senha || !nome) return res.status(400).json({ erro: "nome, email e senha são obrigatórios" });

      const user = await authService.criarUsuario({ nome, email, senha, role });
      res.status(201).json({ id: user.id, nome: user.nome, email: user.email, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await authService.validarCredenciais(email, senha);
      if (!user) return res.status(401).json({ erro: "Credenciais inválidas" });

      const { accessToken, refreshToken } = authService.gerarTokens(user);
      await authService.salvarRefreshToken(user.id, refreshToken);

      res.json({ accessToken, refreshToken, user: { id: user.id, nome: user.nome, email: user.email, role: user.role } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: err.message });
    }
  },

  async refresh(req, res) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ erro: "Refresh token requerido" });
      const user = await authService.verificarRefreshToken(refreshToken);
      const { accessToken, refreshToken: newRefresh } = authService.gerarTokens(user);
      await authService.salvarRefreshToken(user.id, newRefresh);
      res.json({ accessToken, refreshToken: newRefresh });
    } catch (err) {
      console.error(err);
      res.status(401).json({ erro: err.message });
    }
  },
  
  async logout(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ erro: "userId required" });
      await authService.removerRefreshToken(userId);
      res.json({ mensagem: "Desconectado" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: err.message });
    }
  }
};
