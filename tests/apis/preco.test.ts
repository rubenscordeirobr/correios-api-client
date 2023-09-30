import apiClient from "../../src";
import { MessageResponse, Endereco } from "../../src/schemas";
import { ConsultaPreco } from "../../src/schemas/consulta-preco";
import { Prazo } from "../../src/schemas/prazo";
import { Preco } from "../../src/schemas/preco";
import { ServicosCorreios } from "../../src/schemas/servicos-correios";
import { TiposObjeto } from "../../src/schemas/tipos-objeto";

describe("Preco API", () => {

    describe("preco#nacional", () => {

        const consulta: ConsultaPreco = {
            alturaCm: 20,
            cepDestino: "85070555",
            cepOrigem: "85070222",
            comprimentoCm: 20,
            diametroCm: 0,
            tipoObjeto: TiposObjeto.Pacote,
            larguraCm: 20,
            pesoEmGramas: 300,
            codigoProduto: "04162",
            isAvisoRecebimento: false,
            isMaoPropria: false,
            valorDeclarado: 0
        };

          it("should throw error Token is not defined", async () => {
            apiClient.initialize(FakeConfiguration);
            await expect(apiClient.Preco.nacional(consulta))
            .rejects
            .toThrow('Token is not defined');
        });

        it("should return a Preco", async () => {
            const preco = await apiClient.Preco.nacional(consulta);
            assert.isTrue(preco instanceof Preco);
        });

        it("should return a MessageResponse", async () => {
            (consulta as any).codigoProduto = "0000";
            const preco = await apiClient.Preco.nacional(consulta);
            assert.isTrue(preco instanceof MessageResponse);
        });

   
    });
});