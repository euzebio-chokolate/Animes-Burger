import { adminService } from "./admin.service.js";

export const DashboardAdminController = {
  async resumo(req, res) {
    try {
      const data = await adminService.getDashboardResumo();
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ erro: "Erro ao carregar dashboard" });
    }
  }
};
