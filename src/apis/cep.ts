import config from "../config";
import { CorreiosAPIs } from "../schemas";
import { Endereco } from "../schemas/endereco";
import { BaseTokenClient } from "./token";


//API de busca CEP.

export class CepClient extends BaseTokenClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Cep;
    protected override readonly Endpoint = "/cep/v2/enderecos";

    constructor() {
        super();
    }

    async search(cep: string): Promise<Endereco> {
        return this.get(`${this.Endpoint}/${cep}`);
    }

    async searchMany(ceps: string[]): Promise<Endereco[]> {
        
        const query = ceps.map(cep => `cep=${cep}`).join("&");
        const path = `${this.Endpoint}?${query}`;
        const result = await this.get(path);
        if (result.itens?.length > 0)
            return result.itens;
        return result;
    }
}