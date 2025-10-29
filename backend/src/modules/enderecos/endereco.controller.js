import { enderecoService } from "./endereco.service.js";

export const enderecoController = {
    async criar(request, response){
        try {
            const novoEndereco = await enderecoService.criar(request.body);
            response.status(201).json(novoEndereco);
        }
        catch (error) {
            console.error(`Erro ao criar endereço: ${error}`);
            response.status(500).json({
                mensagem: 'Erro ao criar endereço',
                erro: error.message,
            });
        }
    },

    // atualiza a loc via gps automaticamente
    async atualizarLoc(request, response) {
        try {
            const { clienteId, latitude, longitude } = request.body;
            const atualizado = await enderecoService.atualizarLoc(
                clienteId,
                latitude,
                longitude
            );
            response.json(atualizado);
        }
        catch (error) {
            console.error(`Erro ao atualizar a localização: ${error}`);
            response.status(500).json({
                mensagem: 'Erro ao atualizar localização',
                erro: error.message,
            });
        }
    },

    // listar todos enderecos
    async listar(request,response){
        try {
            const enderecos = await enderecoService.listar();
            response.json(enderecos);    
        } 
        catch (error) {
            response.status(500).json({
                mensagem: 'Erro ao listar endereços',
                erro: error.message,
            })
        }
    },

    async criarEnderecoAutomatico(request, response){
        try { 
            const { clienteId, latitude, longitude } = request.body;

            if(!clienteId || !latitude || !longitude) {
                return response.status(400).json({
                    mensagem: `ClienteId, latitude e longitude são obrigatórios.`
                });
            }

            const novoEndereco = await enderecoService.criarLocAutomatica(
                clienteId,
                latitude,
                longitude
            );

            response.status(201).json({
                mensagem: 'Endereço criado automaticamente com sucesso',
                endereco: novoEndereco,
            });
        }
        catch(erro) {
            console.error('Erro ao criar endereço automático', erro);
            response.status(500).json({ mensagem: 'Erro ao criar endereço automatico'});
        }
    }

}