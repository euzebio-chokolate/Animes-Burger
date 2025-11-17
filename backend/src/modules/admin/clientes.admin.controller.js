import { adminService } from "./admin.service.js";

export const ClientesAdminController = {
  async listar(req, res) {
    try {
      const clientes = await adminService.listarClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar clientes" });
    }
  }
};
