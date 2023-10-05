import { CorreiosAPIs, MessageResponse } from "../schemas";
import { Rastro, RastroTiposResultado } from "../schemas/rastro";
import { BaseApiClient } from "./base";

export class RastroApiClient extends BaseApiClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Cep;
    protected override readonly Endpoint = "/srorastro/v1/objetos";

    constructor() {
        super();
    }

    
    async search(codigoRastreamento: string, tipoResultado: RastroTiposResultado = RastroTiposResultado.Todos): Promise<Rastro | MessageResponse> {

        const result = await this.get(`${this.Endpoint}/${codigoRastreamento}?resultado=${tipoResultado}`);
        return this.internalNormalizeResult(result);
    }

    async searchMany(codigosRastreamento: string[], tipoResultado: RastroTiposResultado = RastroTiposResultado.Todos): Promise<(Rastro | MessageResponse)[] | MessageResponse> {

        const query = codigosRastreamento.map(cep => `codigosObjetos=${cep}`).join("&");
        const path = `${this.Endpoint}?${query}&resultado=${tipoResultado}`;
        const result = await this.get(path);

        if (result instanceof MessageResponse)
            return result;

        const itens = result.itens;
        if (Array.isArray(itens)) {
            return itens.map(item => this.internalNormalizeResult(item));
        }
        return result;
    }

    private internalNormalizeResult(result: any): Rastro | MessageResponse {

        if (result instanceof MessageResponse)
            return result;

        if ((result as Rastro).objetos != null)
            return new Rastro(result as Rastro);

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