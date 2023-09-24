import { Ambientes, Configuration as Configuration } from "./schemas/";

const UrlApi = "https://api.correios.com.br";
const UrlApiHomologacao = "https://apihom.correios.com.br";

class ConfigSingleton {

    private _isInitialized: boolean = false;
    private _contrato?: string;
    private _cartaoPostagem?: string;
    private ambiente?: Ambientes;
    private idCorreios?: string;
    private codigoAcesso?: string;

    public get contrato(): string {
        this.checkIsInitialized();
        if (!this._contrato)
            throw new Error("O contrato não foi inicializado, utilize o método config.initialize");
        return this._contrato;
    }

    public get CartaoPostagem(): string | null {
        this.checkIsInitialized();
        return this._cartaoPostagem ?? null;
    }

    get urlApi(): string {
        this.checkIsInitialized();
        return this.ambiente == Ambientes.Producao ? UrlApi : UrlApiHomologacao;
    }

    get basicAuth(): string {
        this.checkIsInitialized();

        if (!this.idCorreios || !this.codigoAcesso)
            throw new Error("As configurações de autenticação não foram inicializadas, utilize o método config.initialize");
        return `Basic ${Buffer.from(`${this.idCorreios}:${this.codigoAcesso}`).toString("base64")}`;
    }
 
    initialize(init: Configuration) {
        this.ambiente = init.ambiente;
        this.idCorreios = init.idCorreios;
        this.codigoAcesso = init.codigoAcesso;
        this._cartaoPostagem = init.cartaoPostagem;
        this._contrato = init.contrato;
        this._isInitialized = true;
    }

    public checkIsInitialized() {
        if (!this._isInitialized)
            throw new Error("As configuração dos correios não foi inicializada, utilize o método config.initialize");
    }

}

class Config {

    public static instance: ConfigSingleton;
 
    public get urlApi(): string {
        return Config.instance.urlApi;
    }

    public get basicAuth(): string {
        return Config.instance.basicAuth;
    }
 
    public get contrato(): string {
        return Config.instance.contrato;
    }

    public get cartaoPostagem(): string | null {
        return Config.instance.CartaoPostagem;
    }

    constructor() {

        if (!Config.instance) {
            Config.instance = new ConfigSingleton();
        }
    }

    initialize(init: Configuration) {
        Config.instance.initialize(init);
    }

    checkIsInitialized() {
        Config.instance.checkIsInitialized();
    }
}

export default new Config();