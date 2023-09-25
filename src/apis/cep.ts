import { CorreiosAPIs } from "../schemas";
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
    async search(cep: string): Promise<Endereco> {
        return this.get(`${this.Endpoint}/${cep}`);
    }

    /**
     * Searches for multiple addresses by CEP.
     * @param ceps An array of CEPs to search for.
     * @returns A promise that resolves to an array of addresses associated with the given CEPs.
     */
    async searchMany(ceps: string[]): Promise<Endereco[]> {
        
        const query = ceps.map(cep => `cep=${cep}`).join("&");
        const path = `${this.Endpoint}?${query}`;
        const result = await this.get(path);
        if (result.itens?.length > 0)
            return result.itens;
        return result;
    }
}