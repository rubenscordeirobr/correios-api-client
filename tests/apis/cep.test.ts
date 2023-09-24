import apiClient from "../../src/";
import { MessageResponse, Endereco } from "../../src/schemas/";

describe("CEP Api", () => {

    describe("cep#search", () => {

        it("should return a Endereco", async () => {
            const endereco = await apiClient.Cep.search("85070555");
            assert.equal(endereco.bairro, "Santana");
            assert.equal(endereco.logradouro, "Rua América Central");
        });

        it("should return a MessageResponse", async () => {

           const endereco = await apiClient.Cep.search("85070-555");
           logMessageResponse(endereco);
           assert.isTrue(endereco instanceof MessageResponse);
        });
        it("should return an error message when the CEP doesn't exist", async () => {

            const endereco = await apiClient.Cep.search("00070555");
            logMessageResponse(endereco);
            assert.isTrue(endereco instanceof MessageResponse);
         });

    });

});