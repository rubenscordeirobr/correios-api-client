import { CorreiosAPIs } from "../schemas";
import { BaseApiClient } from "./base";

export const TokenEndpoint = "/token/v1";

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
export class TokenApiClient extends BaseApiClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Token;
    protected override readonly Endpoint = TokenEndpoint;
}


