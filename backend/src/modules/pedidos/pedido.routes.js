import { Router } from 'express';
import { PedidoController } from './pedido.controller.js';

const router = Router();

router.get('/', PedidoController.listar);
router.post('/', PedidoController.criar);

export default router;