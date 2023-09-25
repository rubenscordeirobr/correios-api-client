import config from "./config";
import { Configuration } from "./schemas/";
import { TokenApiClient } from "./apis/token";
import { CepApiClient } from "./apis/cep";

class ApiClient {

    private _token: TokenApiClient;
    private _cep: CepApiClient;

    get Token(): TokenApiClient {
        this.checkIsInitialized();
        return this._token;
    }

    get Cep(): CepApiClient {
        this.checkIsInitialized();
        return this._cep;
    }

    constructor() {
        this._token = new TokenApiClient();
        this._cep = new CepApiClient();
    }

    initialize(init: Configuration) {
        config.initialize(init);
    }

    private checkIsInitialized() {
        config.checkIsInitialized();
    }

}
export default new ApiClient();