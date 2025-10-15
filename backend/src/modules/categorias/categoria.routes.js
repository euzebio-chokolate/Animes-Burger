import { Router } from "express";
import { CategoriaController } from "./categoria.controller.js";

const router = Router();

router.get('/', CategoriaController.listar);
router.post('/', CategoriaController.criar);

export default router;