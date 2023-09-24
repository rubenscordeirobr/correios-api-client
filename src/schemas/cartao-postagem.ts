import { CorreiosAPIs } from "./correios-apis";

export interface CartaoPostagem {
    api: CorreiosAPIs[]
    contrato: string,
    dr: number,
    numero: string,
}
