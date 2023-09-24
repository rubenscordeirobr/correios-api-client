import config from "./config";
import { Configuration } from "./schemas/";
import { TokenClient } from "./apis/token";
import { CepClient } from "./apis/cep";

class ApiClient {

    private _token: TokenClient;
    private _cep: any;

    get Token(): TokenClient {
        this.checkIsInitialized();
        return this._token;
    }

    get Cep(): CepClient {
        this.checkIsInitialized();
        return this._cep;
    }

    constructor() {
        this._token = new TokenClient();
        this._cep = new CepClient();
    }

    initialize(init: Configuration) {
        config.initialize(init);
    }

    private checkIsInitialized() {
        config.checkIsInitialized();
    }

}
export default new ApiClient();