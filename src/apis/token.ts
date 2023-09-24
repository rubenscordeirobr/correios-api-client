import config from "../config";
import { HttpClient } from "../utils/http-client";
import { MessageResponse, Token } from "../schemas/";

const endpoint = "/token/v1";

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
export class TokenClient {

    constructor() {
    }

    /**
     * Generates a token for API access.
     * @returns A Promise that resolves to a Token object if the authentication is successful, or a MessageResponse object if there was an error.
     */
    async autentica(): Promise<Token | MessageResponse> {
        // Check if the configuration has been initialized
        config.checkIsInitialized();
        // Send a POST request to the API to authenticate and generate a token
        return this.post(`/autentica`);
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
        return this.post(`/autentica/contrato`, body);
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
        // Send a POST request to the API to authenticate and generate a token
        return this.post(`/autentica/cartaopostagem`, body);
    }

    /**
     * Sends a POST request to the API to authenticate and generate a token.
     * @param path The path to the API endpoint.
     * @param body The request body.
     * @returns A Promise that resolves to a Token object if the authentication is successful, or a MessageResponse object if there was an error.
     */
    private async post(path: string, body?: any): Promise<Token | MessageResponse> {

        try {
            const fullUrl = `${config.urlApi}${endpoint}${path}`;
            // Send a POST request to the API with the specified path, basic authentication, and request body
            const result = await HttpClient.post(fullUrl, config.basicAuth, body);
            // Check if the result is a Token or a MessageResponse
            if (this.isToken(result))
                return new Token(result);

            if (this.isMessageResponse(result))
                return new MessageResponse(result);

            throw new Error(`Unknown result: ${JSON.stringify(result)}`)
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
}