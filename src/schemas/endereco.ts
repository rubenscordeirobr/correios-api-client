
export interface Endereco {
    readonly cep: string,
    readonly uf: string,
    readonly localidade: string,
    readonly logradouro: string,
    readonly tipoLogradouro: string,
    readonly nomeLogradouro: string,
    readonly complemento: string,
    readonly abreviatura: string,
    readonly bairro: string,
    readonly numeroLocalidade: number,
    readonly tipoCEP: number,
    readonly cepUnidadeOperacional?: string,
    readonly lado: string,
    readonly numeroInicial?: number,
    readonly numeroFinal?: number
}
