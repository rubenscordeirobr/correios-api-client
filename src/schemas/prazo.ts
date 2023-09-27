
// coProduto:
// '04014'
// dataMaxima:
// '2023-09-27T23:58:00'
// entregaDomiciliar:
// 'S'
// entregaSabado:
// 'N'
// prazoEntrega:
// 1
export class Prazo {

    public readonly coProduto: string;
    public readonly dataMaxima: string;
    public readonly entregaDomiciliar: string;
    public readonly entregaSabado: string;
    public readonly prazoEntrega: number;

    constructor(props: Prazo) {
        this.coProduto = props.coProduto;
        this.dataMaxima = props.dataMaxima;
        this.entregaDomiciliar = props.entregaDomiciliar;
        this.entregaSabado = props.entregaSabado;
        this.prazoEntrega = props.prazoEntrega;
    }
 
}