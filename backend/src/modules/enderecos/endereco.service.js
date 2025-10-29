import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const  enderecoService = {
    async criar(data){
        return await prisma.endereco.create({
            data: {
                clienteId: data.clienteId,
                rua: data.rua,
                numero: data.numero,
                bairro: data.bairro,
                cidade: data.cidade,
                estado: data.estado,
                cep: data.cep,
                latitude: data.latitude ?? null,
                longitude: data.longitude ?? null,
            },
        });
    },

    async atualizarLoc(clienteId, latitude, longitude){
        return await prisma.endereco.update({
            where: { clienteId },
            data: { latitude, longitude },
        });
    },

    async listar() {
        return await prisma.endereco.findMany({
            include: { cliente: true },
        });
    },

    async buscarLocPorCoordenadas(latitude, longitude) {
        try {
            const apiKey = process.env.LOCATIONIQ_TOKEN;
            const url = `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

            const resposta = await axios.get(url);
            const dados = resposta.data.address;

            return {
                rua: dados.road || null,
                bairro: dados.neighbourhood || dados.suburb || null,
                cidade: dados.city || dados.town || dados.village || null,
                estado: dados.state || null,
                cep: dados.postcode || null,
            };
        }
        catch (erro) {
            console.error(`Erro ao buscar endereço pela API: ${erro.message}`);
            throw new Error('Erro ao buscar localização automática');
        }
    },

    async criarLocAutomatica(clienteId, latitude, longitude){
        const locGerada = await this.buscarLocPorCoordenadas(latitude, longitude);

        const novaLoc = await prisma.endereco.create({
            data: {
                clienteId,
                latitude,
                longitude,
                ...locGerada,
            },
        });

        return novaLoc;
    },
};
