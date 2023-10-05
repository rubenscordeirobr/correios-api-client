
/**
 * A utility class for making HTTP requests.
 */
export class HttpClient {

    /**
     * Sends a POST request to the specified URL with the given authorization and body.
     * @param url - The URL to send the request to.
     * @param authorization - The authorization header to include in the request.
     * @param body - The body of the request.
     * @returns A Promise that resolves with the response data.
     */
    static async post<T>(url: string, authorization: string, body?: any): Promise<T> {
        return HttpClient.requestInternal("POST", url, authorization, body);
    }

    /**
     * Sends a GET request to the specified URL with the given authorization and optional request body.
     * @param url The URL to send the request to.
     * @param authorization The authorization header value to include in the request.
     * @param body The optional request body to include in the request.
     * @returns A Promise that resolves with the response data of type T.
     */
    static async get<T>(url: string, authorization: string, body?: any): Promise<T> {
        return HttpClient.requestInternal("GET", url, authorization, body);
    }

    private static async requestInternal<T>(method: "POST" | "GET", url: string, authorization: string, body?: any): Promise<T> {
        const request = HttpClient.getRequest(method, authorization, body);
        const response = await fetch(url, request);
        const result = await response.json();
        return result as T
    }

    private static getRequest(method: "POST" | "GET", authorization: string, body?: any): RequestInit {

        const request: RequestInit = {
            method: method,
            headers: {
                "Accept": "application/json",
                "Accept-Language": "pt-BR",
                "Authorization": authorization,
            },
        }

        if (body != null) {
            request.headers = {
                ...request.headers,
                "Content-Type": "application/json"
            }
            request.body = JSON.stringify(body);
        }
        return request;
    }

}