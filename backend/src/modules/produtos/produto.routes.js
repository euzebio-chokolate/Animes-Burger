import { Router } from 'express';
import { ProdutoController } from "./produto.controller.js";
import upload from "../../config/cloudinary.js"

const router = Router();

router.get('/', ProdutoController.listar);
router.post('/', upload.single("imagem"), ProdutoController.criar);

export default router;
