import { clienteService } from "./cliente.service.js";

export const clienteController = {
    async listar(request, response) {
        try {
            const clientes = await clienteService.listarTudo();
            response.json(clientes);

        } catch (error) {
            response.status(500).json({
                mensagem: 'Erro ao listar clientes', 
                erro: error.mensagem
            })
            
        }
    },

    async criar(request, response) {
        try {
            const {nome} = request.body;
            if (!nome) return response.status(400).json({
                mensagem: 'Campo nome obrigatório'
            })

            const criado = await clienteService.criar(request.body);
            response.status(201).json(criado);

        } catch (error) {
            response.status(500).json({
                mensagem: 'Erro ao criar cliente', 
                erro: error.mensagem
            })
        }
    } 
}