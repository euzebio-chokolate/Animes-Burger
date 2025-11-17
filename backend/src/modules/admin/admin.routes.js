import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import upload from "../../config/cloudinary.js";

import { DashboardAdminController } from "./dashboard.controller.js";
import { PedidosAdminController } from "./pedidos.admin.controller.js";
import { ProdutosAdminController } from "./produtos.admin.controller.js";
import { ClientesAdminController } from "./clientes.admin.controller.js";

const routes = Router();

//DASHBOARD
routes.get("/dashboard", authenticate(['admin']), DashboardAdminController.resumo);

//PEDIDOS
routes.get("/pedidos", authenticate(['admin']), PedidosAdminController.listar);
routes.put("/pedidos/:id/status", authenticate(['admin']), PedidosAdminController.atualizarStatus);

//PRODUTOS
routes.post("/produtos", authenticate(['admin']), upload.single("imagem"), ProdutosAdminController.criar);
routes.put("/produtos/:id", authenticate(['admin']), upload.single("imagem"), ProdutosAdminController.editar);
routes.delete("/produtos/:id", authenticate(['admin']), ProdutosAdminController.remover);

//CLIENTES
routes.get("/clientes", authenticate(['admin']), ClientesAdminController.listar);

export default routes;
