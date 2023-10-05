
/**
 * Represents a message response from the API.
 */
export class MessageResponse {

    readonly causa: string;
    readonly date: string;
    readonly method: string;
    readonly msgs: string[];
    readonly path: string;
    readonly stackTrace: string;

    public constructor(init: MessageResponse) {
        this.causa = init.causa;
        this.date = init.date;
        this.method = init.method;
        this.msgs = init.msgs;
        this.path = init.path;
        this.stackTrace = init.stackTrace;
    }
}