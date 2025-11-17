import { CategoriaService } from "./categoria.service.js";

export const CategoriaController = {
    async listar(request, response) {
        try {
            const categorias = await CategoriaService.listarTudo();
            response.json(categorias);
        } catch (error) {
            response.status(500).json({
                menssagem: 'Erro ao listar as categorias', 
                erro: error.menssagem
            })
        }
    },

    async criar(request, response) {
        try {
            const criado = await CategoriaService.criar(request.body);
            response.status(201).json(criado);
        } catch (error) {
            response.status(500).json({
                menssagem: 'Erro ao criar as categorias', 
                erro: error.message
            })
        }
    } 
}