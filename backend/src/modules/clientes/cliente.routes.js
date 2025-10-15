import { Router } from 'express';
import { clienteController } from "./cliente.controller";

const router = Router();

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);

export default router;