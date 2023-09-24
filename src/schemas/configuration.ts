import { Ambientes } from "./ambientes";

export interface Configuration {
    ambiente: Ambientes,
    idCorreios: string,
    codigoAcesso: string,
    contrato: string,
    cartaoPostagem?: string
}