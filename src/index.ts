import config from "./config";
import {  Configuration } from "./schemas/";
import { TokenClient } from "./apis/token";

class ApiClient {

    private _token: TokenClient;

    get Token(): TokenClient {
        this.checkIsInitialized();
        return this._token;
    }

    constructor() {
        this._token = new TokenClient();
    }

    initialize(init: Configuration) {
        config.initialize(init);
    }

    private checkIsInitialized() {
        config.checkIsInitialized();
    }

}
export default new ApiClient();