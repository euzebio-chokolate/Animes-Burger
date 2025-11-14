import { Router } from "express";
import produtoRoutes from './modules/produtos/produto.routes.js';
import categoriaRoutes from './modules/categorias/categoria.routes.js';
import clienteRoutes from './modules/clientes/cliente.routes.js';
import pedidoRoutes from './modules/pedidos/pedido.routes.js';
import enderecoRoutes from './modules/enderecos/endereco.routes.js';
import destaquesRoutes from './modules/destaques/destaque.routes.js';
import authRoutes from "./modules/auth/auth.routes.js";

const router = Router();

router.get('/', (request, response) => {
    response.send('Animes Burguer no ar!');
});

router.use('/produtos', produtoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/enderecos', enderecoRoutes);
router.use('/destaques', destaquesRoutes);
router.use("/auth", authRoutes);

export default router;