import { ServicosCorreios } from "./servicos-correios";
import { TiposObjeto } from "./tipos-objeto"

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
