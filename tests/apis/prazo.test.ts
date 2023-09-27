import apiClient from "../../src/";
import { MessageResponse, Endereco } from "../../src/schemas/";
import { Prazo } from "../../src/schemas/prazo";
import { ServicosCorreios } from "../../src/schemas/servicos-correios";

describe("Prazo API", () => {

    describe("prazo#nacional", () => {


        it("should throw error Token is not defined", async () => {
            apiClient.initialize(FakeConfiguration);
            await expect(apiClient.Prazo.nacional(ServicosCorreios.SedexSemContrato, "85070555", "85070200"))
                .rejects
                .toThrow('Token is not defined');
        });


        it("should return a MessageResponse", async () => {
            const prazo = await apiClient.Prazo.nacional(ServicosCorreios.SedexSemContrato, "00070555", "85070200");
            assert.isTrue(prazo instanceof MessageResponse);
        });

        it("should return a Endereco", async () => {
            const prazo = await apiClient.Prazo.nacional(ServicosCorreios.SedexSemContrato, "85070555", "85070200");
            assert.isTrue(prazo instanceof Prazo);
        });

    });
});