import { CorreiosAPIs } from "./correios-apis";

export interface Contrato {
    api: CorreiosAPIs[]
    dr: number,
    numero: string,
}