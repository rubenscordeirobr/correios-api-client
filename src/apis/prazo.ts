import { CorreiosAPIs, MessageResponse } from "../schemas";
import { Prazo } from "../schemas/prazo";
import { ServicosCorreios } from "../schemas/servicos-correios";
import { DateUtil } from "../util/date";
import { BaseApiClient } from "./base";

/**
 * Client for searching for addresses by CEP using the Correios API.
 */
export class PrazoApiClient extends BaseApiClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Cep;
    protected override readonly Endpoint = "/prazo/v1";

    constructor() {
        super();
    }

    /**
     * Retrieves the estimated delivery time for a national shipment.
     * @param servico The type of service to be used for the shipment.
     * @param cepOrigem The origin zip code for the shipment.
     * @param cepDestino The destination zip code for the shipment.
     * @param dataEvento The date of the event for which the estimated delivery time is being calculated. Defaults to the current date.
     * @returns A promise that resolves to an Endereco object containing the estimated delivery time.
     */
    async nacional(servico: ServicosCorreios, cepOrigem: string, cepDestino: string, dataEvento: Date = new Date()): Promise<Prazo | MessageResponse> {
        
        const dataEventoFormata = DateUtil.format(dataEvento, "dd-MM-yyyy");
        const query = `cepOrigem=${cepOrigem}&cepDestino=${cepDestino}&dtEvento=${dataEventoFormata}`;
        const result = await this.get(`${this.Endpoint}/nacional/${servico}?${query}`);
       
        if (result instanceof MessageResponse) {
            return result;
        }
        return new Prazo(result);
    }

}