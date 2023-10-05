/**
 * Represents an address object with information such as zip code, state, city, street, and more.
 */
export class Endereco {
    
    readonly cep: string;
    readonly uf: string;
    readonly localidade: string;
    readonly logradouro: string;
    readonly tipoLogradouro: string;
    readonly nomeLogradouro: string;
    readonly complemento: string;
    readonly abreviatura: string;
    readonly bairro: string;
    readonly numeroLocalidade: number;
    readonly tipoCEP: number;
    readonly cepUnidadeOperacional?: string;
    readonly lado: string;
    readonly numeroInicial?: number;
    readonly numeroFinal?: number;

    constructor(props: Endereco) {
        this.cep = props.cep;
        this.uf = props.uf;
        this.localidade = props.localidade;
        this.logradouro = props.logradouro;
        this.tipoLogradouro = props.tipoLogradouro;
        this.nomeLogradouro = props.nomeLogradouro;
        this.complemento = props.complemento;
        this.abreviatura = props.abreviatura;
        this.bairro = props.bairro;
        this.numeroLocalidade = props.numeroLocalidade;
        this.tipoCEP = props.tipoCEP;
        this.cepUnidadeOperacional = props.cepUnidadeOperacional;
        this.lado = props.lado;
        this.numeroInicial = props.numeroInicial;
        this.numeroFinal = props.numeroFinal;
    }
}
