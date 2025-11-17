import { Router } from "express";
import { CategoriaController } from "./categoria.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.get('/', CategoriaController.listar);
router.post('/', authenticate(['admin']), CategoriaController.criar);

export default router;