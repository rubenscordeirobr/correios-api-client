import config from "./config";
import { Configuration } from "./schemas/";
import { TokenApiClient } from "./apis/token";
import { CepApiClient } from "./apis/cep";
import { PrazoApiClient } from "./apis/prazo";
import { PrecoApiClient } from "./apis/preco";
import { RastroApiClient } from "./apis/rastro";

class ApiClient {

    private readonly _token: TokenApiClient;
    private readonly _cep: CepApiClient;
    private readonly _prazo: PrazoApiClient;
    private readonly _preco: PrecoApiClient;
    private readonly _rastro: RastroApiClient;

    get Token(): TokenApiClient {
        this.checkIsInitialized();
        return this._token;
    }

    get Cep(): CepApiClient {
        this.checkIsInitialized();
        return this._cep;
    }

    get Prazo(): PrazoApiClient {
        this.checkIsInitialized();
        return this._prazo;
    }

    get Preco(): PrecoApiClient {
        this.checkIsInitialized();
        return this._preco;
    }

    get Rastro(): RastroApiClient
    {
        this.checkIsInitialized();
        return this._rastro;
    }


    constructor() {
        this._token = new TokenApiClient();
        this._cep = new CepApiClient();
        this._prazo = new PrazoApiClient();
        this._preco = new PrecoApiClient();
        this._rastro = new RastroApiClient();
    }

    initialize(init: Configuration) {
        config.initialize(init);
    }

    private checkIsInitialized() {
        config.checkIsInitialized();
    }

}
export default new ApiClient();