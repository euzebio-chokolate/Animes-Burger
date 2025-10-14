import { Router } from 'express';
import { ProductController } from './product.controller.js';

const router = Router();

router.get('/', ProductController.list);

export default router;
