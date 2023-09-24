import apiClient from "../../src/";
import { MessageResponse, Token } from "../../src/schemas/";

describe("Token API", () => {

    describe("token#autentica", () => {

        it("should return a token", async () => {
            assert.isNotNull(apiClient.Token);
            const token = await apiClient.Token.autentica();
            assert.isTrue(token instanceof Token);
        });

        it("should return a MessageResponse", async () => {
            assert.isNotNull(apiClient.Token);
            apiClient.initialize(FakeConfiguration);
            const token = await apiClient.Token.autentica();
            assert.isTrue(token instanceof MessageResponse);
        });
    });

    describe("token#autenticaContrato", () => {

        it("should return a token", async () => {
            const token = await apiClient.Token.autenticaContrato();
            assert.isTrue(token instanceof Token);
        });

        it("should return a MessageResponse", async () => {
            apiClient.initialize(FakeConfiguration);
            const token = await apiClient.Token.autenticaContrato();
            assert.isTrue(token instanceof MessageResponse);
        });
    });

    describe("token#autenticaCartaoPostagem", () => {

        it("should return a token", async () => {
            const token = await apiClient.Token.autenticaCartaoPostagem();
            assert.isTrue(token instanceof Token);
        });

        it("should return a MessageResponse", async () => {
            apiClient.initialize(FakeConfiguration);
            const token = await apiClient.Token.autenticaCartaoPostagem();
            assert.isTrue(token instanceof MessageResponse);
        });
    });


});