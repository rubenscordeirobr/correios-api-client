import { CorreiosAPIs } from "./correios-apis";

/**
 * Represents a CartaoPostagem object, which contains information about a post office card.
 */
export interface CartaoPostagem {
    api: CorreiosAPIs[]
    contrato: string,
    dr: number,
    numero: string,
}
