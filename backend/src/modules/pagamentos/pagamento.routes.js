import { Router } from 'express';
import { PagamentoController } from './pagamento.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.post('/pix', authenticate(), PagamentoController.criarPix);
router.get('/:paymentId/status', authenticate(), PagamentoController.checarStatus);

export default router;