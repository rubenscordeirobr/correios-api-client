
/**
 * Represents tracking information for a package.
 */
export class Rastro {
    readonly versao: string;
    readonly quantidade: number;
    readonly objetos: Objeto[];
    readonly tipoResultado: string;

    constructor(rastro: Rastro) {
        this.versao = rastro.versao;
        this.quantidade = rastro.quantidade;
        this.objetos = rastro.objetos;
        this.tipoResultado = rastro.tipoResultado;
    }
}

export enum RastroTiposResultado{
    Todos = "T",
    PrimeiroEvento = "P",
    UltimoEvento = "U",
}

/**
 * Represents an object being tracked by the Correios API.
 */
export interface Objeto {
    codObjeto: string;
    tipoPostal: TipoPostal;
    largura: number;
    comprimento: number;
    altura: number;
    diametro: number;
    peso: number;
    formato: string;
    modalidade: string;
    valorDeclarado: number;
    eventos: Evento[];
}

/**
 * Represents a tracking event for a package.
 */
export interface Evento {
    codigo: string;
    tipo: string;
    dtHrCriado: string;
    descricao: string;
    unidade: Unidade;
    unidadeDestino?: UnidadeDestino;
    detalhe?: string;
}

/**
 * Represents a postal unit.
 */
export interface Unidade {
    codSro?: string;
    tipo: string;
    endereco: UnidadeEndereco;
    nome?: string;
}

/**
 * Represents the address of a post office unit.
 */
export interface UnidadeEndereco {
    cidade?: string;
    uf?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
}

/**
 * Represents the destination unit of a package.
 */
export interface UnidadeDestino {
    tipo: string;
    endereco: UnidadeDestinoEndereco;
    nome?: string;
    codSro?: string;
}

/**
 * Represents the address of the destination unit.
 */
export interface UnidadeDestinoEndereco {
    cidade?: string;
    uf: string;
}

/**
 * Represents a type of postal service.
 */
export interface TipoPostal {
    sigla: string;
    descricao: string;
    categoria: string;
}
