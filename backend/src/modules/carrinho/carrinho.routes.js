import { Router } from "express";
import { carrinhoController } from "./carrinho.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate(), carrinhoController.listar);
router.post("/", authenticate(), carrinhoController.adicionar);
router.put("/", authenticate(), carrinhoController.atualizar);
router.delete("/:produtoId", authenticate(), carrinhoController.remover);
router.delete("/", authenticate(), carrinhoController.limpar);

export default router;
