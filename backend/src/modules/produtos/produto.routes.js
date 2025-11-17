import { Router } from 'express';
import { ProdutoController } from "./produto.controller.js";

const router = Router();

router.get('/', ProdutoController.listar);

export default router;