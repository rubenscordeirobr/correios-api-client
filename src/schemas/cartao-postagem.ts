import { Apis } from "./apis";

export interface CartaoPostagem {
    api: Apis[]
    contrato: string,
    dr: number,
    numero: string,
}
