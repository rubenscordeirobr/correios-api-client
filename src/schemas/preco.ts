/**
 * Represents a pricing object.
 */
export class Preco {

    readonly coProduto: string;
    readonly pcBase: string;
    readonly pcBaseGeral: string;
    readonly peVariacao: string;
    readonly pcReferencia: string;
    readonly vlBaseCalculoImposto: string;
    readonly inPesoCubico: string;
    readonly psCobrado: string;
    readonly servicoAdicional: ServicoAdicional[];
    readonly peAdValorem: string;
    readonly vlSeguroAutomatico: string;
    readonly qtAdicional: string;
    readonly pcFaixa: string;
    readonly pcFaixaVariacao: string;
    readonly pcProduto: string;
    readonly pcTotalServicosAdicionais: string;
    readonly pcFinal: string;

    constructor(preco: Preco) {
        this.coProduto = preco.coProduto;
        this.pcBase = preco.pcBase;
        this.pcBaseGeral = preco.pcBaseGeral;
        this.peVariacao = preco.peVariacao;
        this.pcReferencia = preco.pcReferencia;
        this.vlBaseCalculoImposto = preco.vlBaseCalculoImposto;
        this.inPesoCubico = preco.inPesoCubico;
        this.psCobrado = preco.psCobrado;
        this.servicoAdicional = preco.servicoAdicional;
        this.peAdValorem = preco.peAdValorem;
        this.vlSeguroAutomatico = preco.vlSeguroAutomatico;
        this.qtAdicional = preco.qtAdicional;
        this.pcFaixa = preco.pcFaixa;
        this.pcFaixaVariacao = preco.pcFaixaVariacao;
        this.pcProduto = preco.pcProduto;
        this.pcTotalServicosAdicionais = preco.pcTotalServicosAdicionais;
        this.pcFinal = preco.pcFinal;
    }
}

/**
 * Represents an additional service that can be added to a Correios shipping service.
 */
export interface ServicoAdicional{
    readonly coServAdicional: string;
    readonly tpServAdicional: string;
    readonly pcServicoAdicional: string;
}