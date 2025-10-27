import { Router } from 'express';
import { clienteController } from "./cliente.controller.js";

const router = Router();

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);

export default router;