import { ProductService } from './product.service.js';

export const ProductController = {
  // Listar todos
  async list(request, response) {
    try {
      const produtos = await ProductService.listAll();
      response.json(produtos);
    } catch (error) {
      response.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
    }
  },
};
