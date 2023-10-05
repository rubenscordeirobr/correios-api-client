import { ServicosCorreios } from "./servicos-correios";
import { TiposObjeto } from "./tipos-objeto"

/**
 * Represents a request to consult the price of a shipment with Correios API.
 */
export interface ConsultaPreco {
    readonly codigoProduto: ServicosCorreios | string;
    readonly cepOrigem: string;
    readonly cepDestino: string;
    readonly pesoEmGramas: number;
    readonly tipoObjeto: TiposObjeto;
    readonly larguraCm: number;
    readonly alturaCm: number;
    readonly comprimentoCm: number;
    readonly diametroCm?: number;
    readonly valorDeclarado:number;
    readonly isAvisoRecebimento: boolean;
    readonly isMaoPropria: boolean;
}
