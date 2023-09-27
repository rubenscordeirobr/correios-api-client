import config from "./config";
import { Configuration } from "./schemas/";
import { TokenApiClient } from "./apis/token";
import { CepApiClient } from "./apis/cep";
import { PrazoApiClient } from "./apis/prazo";

class ApiClient {

    private _token: TokenApiClient;
    private _cep: CepApiClient;
    private _prazo: PrazoApiClient;

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

    constructor() {
        this._token = new TokenApiClient();
        this._cep = new CepApiClient();
        this._prazo = new PrazoApiClient();
    }

    initialize(init: Configuration) {
        config.initialize(init);
    }

    private checkIsInitialized() {
        config.checkIsInitialized();
    }

}
export default new ApiClient();