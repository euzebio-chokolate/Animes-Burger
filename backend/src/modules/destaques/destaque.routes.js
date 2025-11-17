import { Router } from "express";
import { DestaqueController } from "./destaque.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const routes = Router();

routes.get("/", DestaqueController.listar);
routes.post("/:produtoId", authenticate(['admin']), DestaqueController.adicionar);
routes.delete("/:produtoId", authenticate(['admin']), DestaqueController.remover);

export default routes;
