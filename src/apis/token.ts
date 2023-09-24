import config from "../config";
import { HttpClient } from "../utils/http-client";
import { CorreiosAPIs, MessageResponse, Token } from "../schemas/";

const TokenEndpoint = "/token/v1";

/**
 * TokenClient is a class that provides methods to authenticate and generate tokens for accessing APIs.
 * Represents a client for generating authentication tokens for accessing the Correios API.
 * Token Generation:
 * To request a token, you need to make a request with 'Authorization: Basic', passing the user (Meu Correios) and password (access code).
 * 
 * Token Expiration:
 * The obtained token has an expiration date in the 'expiraEm' attribute, so the same token can be used until the expiration date.
 * We recommend that you request a new token close to the expiration date, a few minutes before the token expires.
 * A NEW token will be returned when:
 * - The token has expired;
 * - There is any change in access permissions;
 * - Within a tolerance of up to 30 minutes before the expiration date.
 * In other cases, a previously requested token will be returned.
 * 
 * Request Limit:
 * The 'token' API has a limit of 3 requests per second.
 * If you exceed this limit, HTTP status 429 - Too Many Requests is triggered.
 * To avoid receiving HTTP status 429, always check the expiration date of the token before sending a new request.
 */
export abstract class BaseTokenClient {

    protected abstract readonly CurrentApi: CorreiosAPIs;
    protected abstract readonly Endpoint: string;

    constructor() {
    }

    /**
     * Generates a token for API access.
     * @returns A Promise that resolves to a Token object if the authentication is successful, or a MessageResponse object if there was an error.
     */
    async autentica(): Promise<Token | MessageResponse> {
        config.checkIsInitialized();
        return this.autenticaInternal(`/autentica`);
    }

    /**
     * Generates a token for accessing APIs that require authorization by contract number.
     * @returns A promise that resolves with a Token object or a MessageResponse object.
     */
    async autenticaContrato(): Promise<Token | MessageResponse> {

        const numero = config.contrato;
        const body = {
            numero: numero
        }
        // Send a POST request to the API to authenticate and generate a token
        return this.autenticaInternal(`/autentica/contrato`, body);
    }

    /**
     * Generates a token for accessing APIs that require authorization by postcard.
     * @returns A promise that resolves to a Token object or a MessageResponse object if an error occurs.
     * @throws An error if the postcard is not configured.
     */
    async autenticaCartaoPostagem(): Promise<Token | MessageResponse> {

        const numero = config.cartaoPostagem;
        if (numero == null)
            throw new Error("Postcard not configured");

        const body = {
            numero: numero
        }
        return this.autenticaInternal(`/autentica/cartaopostagem`, body);
    }

    /**
     * Authenticates the user and returns a token or a message response.
     * @param path - The path to authenticate the user.
     * @param body - The body of the request.
     * @returns A promise that resolves to a Token object or a MessageResponse object.
     */
    async autenticaInternal(path: string, body?: any): Promise<Token | MessageResponse> {

        const result = await this.post(`${TokenEndpoint}${path}`, body);
        if (result instanceof Token) {
            config.setLastToken(result);

            if (this.CurrentApi !== CorreiosAPIs.Token && result.api != null && result.api.indexOf(this.CurrentApi) == -1)
                console.error("The Cep API is not authorized in the current token");
        }
        return result;
    }

    /**
     * Validates the token for the specified API. If a new token is needed, it will be obtained by calling the `autenticaContrato` method.
     * @param apiId The ID of the API to validate the token for.
     */
    protected async validateToken(): Promise<void> {
        if (this.isNeedNewToken())
            await this.generateNewToken();
    }

    /**
     * Sends a POST request to the API to authenticate and generate a token.
     * @param path The path to the API endpoint.
     * @param body The request body.
     * @returns A Promise that resolves to a Token object if the authentication is successful, or a MessageResponse object if there was an error.
     */
    protected async post(path: string, body?: any): Promise<any> {

        try {
            const fullUrl = `${config.urlApi}${path}`;
            const result = await HttpClient.post(fullUrl, config.basicAuth, body);
            return this.normalizeResult(result);
            // throw new Error(`Unknown result: ${JSON.stringify(result)}`)
        }
        catch (erro: any) {
            // If an error occurs, return a MessageResponse object with the error details
            return new MessageResponse({
                msgs: [erro.message ?? "Unknown catch error"],
                path: path,
                method: "POST",
                date: new Date().toISOString(),
                causa: "Catch error",
                stackTrace: erro.stackTrace
            });
        }
    }

    /**
     * Sends a GET request to the specified URL with the authorization token.
     * @param fullUrl - The full URL to send the GET request to.
     * @returns A Promise that resolves with the response data of type T.
     * @throws An error if the token is not defined or the Cep API is not authorized in the current token.
     */
    protected async get(path: string): Promise<any> {

        await this.validateToken();

        const lastToken = config.lastToken;
        if (lastToken == null || lastToken.token == null)
            throw new Error("Token is not defined");


        try {
            const fullUrl = `${config.urlApi}${path}`;
            const bearerToken = `Bearer ${lastToken.token}`;
            const result = await HttpClient.get(fullUrl, bearerToken);
            return this.normalizeResult(result);
        }
        catch (erro: any) {
            return new MessageResponse({
                msgs: [erro?.message ?? "Unknown catch error"],
                path: path,
                method: "POST",
                date: new Date().toISOString(),
                causa: "Catch error",
                stackTrace: erro.stackTrace
            });
        }

    }


    private normalizeResult(result: any): any {
        if (this.isToken(result))
            return new Token(result);

        if (this.isMessageResponse(result))
            return new MessageResponse(result);

        return result
    }

    /**
     * Checks if the object is a Token.
     * @param obj The object to check.
     * @returns True if the object is a Token, false otherwise.
     */
    private isToken(obj: any): obj is Token {
        return obj.token !== undefined;
    }

    /**
     * Checks if the object is a MessageResponse.
     * @param obj The object to check.
     * @returns True if the object is a MessageResponse, false otherwise.
     */
    private isMessageResponse(obj: any): obj is MessageResponse {
        return obj.msgs !== undefined;
    }

    /**
     * Determines whether a new token is needed for the specified API.
     * @param apiId The ID of the API to check.
     * @returns True if a new token is needed, false otherwise.
     */
    private isNeedNewToken(): boolean {
        return config.lastToken == null ||
            config.lastToken.expiraEm == null ||
            new Date(config.lastToken.expiraEm) < new Date() ||
            config.lastToken.api?.indexOf(this.CurrentApi) == -1;
    }

    /**
     * Generates a new token for authentication.
     * If a cartaoPostagem is set in the config, it will authenticate using that.
     * If a contrato is set in the config, it will authenticate using that.
     * Otherwise, it will authenticate using the default credentials.
     */
    private async generateNewToken(): Promise<void> {

        config.checkIsInitialized();

        if (config.cartaoPostagem != null) {
            console.log("autenticaCartaoPostagem");
            await this.autenticaCartaoPostagem();
            return;
        }

        if (config.contrato != null) {
            console.log("autenticaContrato");
            await this.autenticaContrato();
        }

        console.log("autentica");
        await this.autentica();
    }
}

export class TokenClient extends BaseTokenClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Token;
    protected override readonly Endpoint = TokenEndpoint;
}


