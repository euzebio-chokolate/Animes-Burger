import { Router } from "express";
import { clienteController } from "./cliente.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.get("/perfil", authenticate(), clienteController.perfil);
router.put("/telefone", authenticate(), clienteController.atualizarTelefone);
router.post("/endereco", authenticate(), clienteController.salvarEndereco);
router.get("/pedidos", authenticate(), clienteController.pedidos);

export default router;
