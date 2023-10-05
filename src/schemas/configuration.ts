import { Ambientes } from "./ambientes";

/**
 * Represents the configuration options for the Correios API client.
 */
export interface Configuration {
    ambiente: Ambientes,
    idCorreios: string,
    codigoAcesso: string,
    contrato: string,
    cartaoPostagem?: string
}