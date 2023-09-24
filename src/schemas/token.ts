import { Ambientes, CorreiosAPIs, CartaoPostagem, Contrato } from "./";

export class Token {
    readonly ambiente: Ambientes;
    readonly api: CorreiosAPIs[];
    readonly cartaoPostagem?: CartaoPostagem;
    readonly cie?: string;
    readonly cnpj?: string;
    readonly contrato: Contrato;
    readonly cpf?: string;
    readonly emissao: string;
    readonly expiraEm: string;
    readonly id: string;
    readonly ip: string;
    readonly paths?: string[];
    readonly perfil: "S";
    readonly pjInternacional?: number;
    readonly token: string;
    readonly zoneOffset: string;

    constructor(init: Token) {
        this.ambiente = init.ambiente;
        this.api = init.api;
        this.cartaoPostagem = init.cartaoPostagem;
        this.cie = init.cie;
        this.cnpj = init.cnpj;
        this.contrato = init.contrato;
        this.cpf = init.cpf;
        this.emissao = init.emissao;
        this.expiraEm = init.expiraEm;
        this.id = init.id;
        this.ip = init.ip;
        this.paths = init.paths;
        this.perfil = init.perfil;
        this.pjInternacional = init.pjInternacional;
        this.token = init.token;
        this.zoneOffset = init.zoneOffset;
    }
}