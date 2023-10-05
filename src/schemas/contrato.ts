import { CorreiosAPIs } from "./correios-apis";

/**
 * Represents a contract with the Correios API.
 */
export interface Contrato {
    api: CorreiosAPIs[]
    dr: number,
    numero: string,
}