import { Router } from "express";
import productRoutes from './modules/products/product.routes.js';

const routes = Router();

routes.get('/', (request, response) => {
    response.send('Animes Burguer no ar!');
});

routes.use('/produtos', productRoutes);

export default routes;