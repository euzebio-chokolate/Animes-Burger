import { adminService } from "./admin.service.js";

export const ClientesAdminController = {
  async listar(req, res) {
    try {
      const clientes = await adminService.listarClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar clientes" });
    }
  },

  async promover(req, res) {
    try {
      const { id } = req.params;
      await adminService.promoverUsuario(id);
      res.json({ mensagem: "Usuário promovido para Admin com sucesso!" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao promover usuário." });
    }
  },

  async rebaixar(req, res) {
    try {
      const { id } = req.params;
      await adminService.rebaixarUsuario(id);
      res.json({ mensagem: "Admin rebaixado para Usuário com sucesso!" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao rebaixar usuário." });
    }
  },
};
