import { Ambientes, Configuration as Configuration, Token } from "./schemas/";

const UrlApi = "https://api.correios.com.br";
const UrlApiHomologacao = "https://apihom.correios.com.br";

class ConfigSingleton {

    private _isInitialized: boolean = false;
    private _contrato?: string;
    private _cartaoPostagem?: string;
    private _lastToken?: Token;
    private ambiente?: Ambientes;
    private idCorreios?: string;
    private codigoAcesso?: string;

    /**
     * The contract number used for making requests to the Correios API.
     * @throws An error if the contract has not been initialized with the `config.initialize` method.
     */
    get contrato(): string {
        this.checkIsInitialized();
        if (!this._contrato)
            throw new Error("O contrato não foi inicializado, utilize o método config.initialize");
        return this._contrato;
    }

    /**
     * Gets the Cartão de Postagem (posting card) number associated with the Correios account.
     * 
     * @returns The Cartão de Postagem number, or `null` if it has not been set.
     * @throws {Error} If the client has not been initialized yet.
     */
    get CartaoPostagem(): string | null {
        this.checkIsInitialized();
        return this._cartaoPostagem ?? null;
    }

    /**
     * Returns the URL of the API to be used based on the current environment.
     * @returns The URL of the API.
     */
    get urlApi(): string {
        this.checkIsInitialized();
        return this.ambiente == Ambientes.Producao ? UrlApi : UrlApiHomologacao;
    }

    /**
     * Returns the basic authentication string for the Correios API client.
     * @throws {Error} If the authentication settings have not been initialized.
     * @returns {string} The basic authentication string.
     */
    get basicAuth(): string {
        this.checkIsInitialized();

        if (!this.idCorreios || !this.codigoAcesso)
            throw new Error("As configurações de autenticação não foram inicializadas, utilize o método config.initialize");
        return `Basic ${Buffer.from(`${this.idCorreios}:${this.codigoAcesso}`).toString("base64")}`;
    }

    /**
     * Returns the last token used to authenticate with the Correios API.
     * If no token has been set, returns null.
     * @returns {Token | null} The last token used to authenticate with the Correios API, or null if no token has been set.
     */
    get lastToken(): Token | null {
        this.checkIsInitialized();
        return this._lastToken ?? null;
    }

    /**
     * Initializes the configuration object with the provided values.
     * @param init - The configuration object to initialize with.
     */
    initialize(init: Configuration) {
        this.ambiente = init.ambiente;
        this.idCorreios = init.idCorreios;
        this.codigoAcesso = init.codigoAcesso;
        this._cartaoPostagem = init.cartaoPostagem;
        this._contrato = init.contrato;
        this._isInitialized = true;
    }

    /**
     * Checks if the configuration for Correios API client has been initialized.
     * Throws an error if it has not been initialized.
     */
    checkIsInitialized() {
        if (!this._isInitialized)
            throw new Error("As configuração dos correios não foi inicializada, utilize o método config.initialize");
    }

    /**
     * Sets the last token used for authentication.
     * @param token The token to set.
     * @throws An error if the token is not defined.
     */
    setLastToken(token: Token) {
        if (!token)
            throw new Error("Token is not defined");
        this._lastToken = token;
    }

}

class Config {

    public static instance: ConfigSingleton;

    get urlApi(): string {
        return Config.instance.urlApi;
    }

    get basicAuth(): string {
        return Config.instance.basicAuth;
    }

    get contrato(): string {
        return Config.instance.contrato;
    }

    get cartaoPostagem(): string | null {
        return Config.instance.CartaoPostagem;
    }

    get lastToken(): Token | null {
        return Config.instance.lastToken;
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

    setLastToken(token: Token) {
        Config.instance.setLastToken(token);
    }
}

export default new Config();