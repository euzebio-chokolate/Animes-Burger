import { Router } from "express";
import produtoRoutes from './modules/produtos/produto.routes.js';
import categoriaRoutes from './modules/categorias/categoria.routes.js';
import clienteRoutes from './modules/clientes/cliente.routes.js';
import pedidoRoutes from './modules/pedidos/pedidos.routes.js';

const router = Router();

routes.get('/', (request, response) => {
    response.send('Animes Burguer no ar!');
});

router.use('/produtos', produtoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/clientes', clienteRoutes);
router.use('/pedidos', pedidoRoutes);

export default router;