import { Router } from "express";
import { usuarioController } from "./usuario.controller.js";

const router = Router();

router.post("/register", usuarioController.registrar);
router.post("/login", usuarioController.login);
router.post("/refresh", usuarioController.renovar);

export default router;
