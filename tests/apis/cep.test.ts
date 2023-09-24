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

    describe("cep#searchMany", () => {

        it("should return an array of Endereco", async () => {
            const enderecos = await apiClient.Cep.searchMany(["85070555", "85070200"]);
            logMessageResponse(enderecos);
            assert.equal(enderecos.length, 2);
            assert.equal(enderecos[0].bairro, "Santana");
            assert.equal(enderecos[1].bairro, "Santana");
        });

        it("should return a MessageResponse", async () => {
            const enderecos = await apiClient.Cep.searchMany(["85070-555", "85070-550"]);
            logMessageResponse(enderecos);
            assert.isTrue(enderecos instanceof MessageResponse);
         });

    });

});