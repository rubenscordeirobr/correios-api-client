import { CorreiosAPIs, MessageResponse } from "../schemas";
import { Endereco } from "../schemas/endereco";
import { BaseApiClient } from "./base";

/**
 * Client for searching for addresses by CEP using the Correios API.
 */
export class CepApiClient extends BaseApiClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Cep;
    protected override readonly Endpoint = "/cep/v2/enderecos";

    constructor() {
        super();
    }

    /**
     * Searches for an address by CEP.
     * @param cep The CEP to search for.
     * @returns A promise that resolves to the address associated with the given CEP.
     */
    async search(cep: string): Promise<Endereco | MessageResponse> {

        const result = await this.get(`${this.Endpoint}/${cep}`);
        return this.internalNormalizeResult(result);
    }

    /**
     * Searches for multiple addresses by CEP.
     * @param ceps An array of CEPs to search for.
     * @returns A promise that resolves to an array of addresses associated with the given CEPs.
     */
    async searchMany(ceps: string[]): Promise<(Endereco | MessageResponse)[] | MessageResponse> {

        const query = ceps.map(cep => `cep=${cep}`).join("&");
        const path = `${this.Endpoint}?${query}`;
        const result = await this.get(path);

        if (result instanceof MessageResponse)
            return result;

        const itens = result.itens;
        if (Array.isArray(itens)) {
            return itens.map(item => this.internalNormalizeResult(item));
        }
        return result;
    }

    private internalNormalizeResult(result: any): Endereco | MessageResponse {

        if (result instanceof MessageResponse)
            return result;

        if ((result as Endereco).logradouro != null)
            return new Endereco(result as Endereco);

        return new MessageResponse({
            msgs: ["Result is invalid.", `Type of result: ${typeof result} `],
            method: "GET",
            path: `${this.Endpoint}`,
            stackTrace: "",
            date: new Date().toISOString(),
            causa: ""
        });
    }
}