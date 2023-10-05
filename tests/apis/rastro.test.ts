import apiClient from "../../src";
import { Rastro } from "../../src/schemas";
import { RastroTiposResultado } from "../../src/schemas/rastro";

describe("Rastro API", () => {

    describe("restro#search", () => {

        it("should throw error Token is not defined", async () => {
            apiClient.initialize(FakeConfiguration);
            await expect(apiClient.Rastro.search("LX697446262CN", RastroTiposResultado.Todos))
                .rejects
                .toThrow('Token is not defined');
        });


        it("should return a MessageResponse", async () => {
            const rastro = await apiClient.Rastro.search("000", RastroTiposResultado.Todos);
            assert.isTrue(rastro instanceof Rastro);
        });

        it("should return Rastro", async () => {
            const rastro = await apiClient.Rastro.search("LX697446262CN", RastroTiposResultado.Todos);
            assert.isTrue(rastro instanceof Rastro);
        });

    });
});