import { Router } from 'express';
import { PedidoController } from './pedido.controller.js';
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.get('/', authenticate(['admin']), PedidoController.listar);
router.post('/', authenticate(), PedidoController.criar); 
router.get('/:id', PedidoController.obter);

export default router;