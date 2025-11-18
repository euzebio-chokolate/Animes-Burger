import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import upload from "../../config/cloudinary.js";

import { DashboardAdminController } from "./dashboard.controller.js";
import { PedidosAdminController } from "./pedidos.admin.controller.js";
import { ProdutosAdminController } from "./produtos.admin.controller.js";
import { ClientesAdminController } from "./clientes.admin.controller.js";
import { CategoriasAdminController } from "./categorias.admin.controller.js";
import { DestaqueController } from "../destaques/destaque.controller.js";

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

//CATEGORIAS
routes.get("/categorias", authenticate(['admin']), CategoriasAdminController.listar);
routes.post("/categorias", authenticate(['admin']), CategoriasAdminController.criar);
routes.put("/categorias/:id", authenticate(['admin']), CategoriasAdminController.atualizar);
routes.delete("/categorias/:id", authenticate(['admin']), CategoriasAdminController.remover);

//DESTAQUES
routes.get("/destaques", DestaqueController.listar);
routes.post("/destaques/:produtoId", authenticate(['admin']), DestaqueController.adicionar);
routes.delete("/destaques/:produtoId", authenticate(['admin']), DestaqueController.remover);

export default routes;
