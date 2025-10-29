import { Router } from "express";
import { enderecoController } from "./endereco.controller.js";

const router = Router();

router.get('/', enderecoController.listar);
router.post('/', enderecoController.criar);
router.post('/localizacao', enderecoController.atualizarLoc);
router.post('/localizacao/auto', enderecoController.criarEnderecoAutomatico);

export default router;