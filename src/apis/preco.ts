import { CorreiosAPIs, MessageResponse } from "../schemas";
import { ConsultaPreco } from "../schemas/consulta-preco";
import { Preco } from "../schemas/preco";
import { ServicosAdicionais } from "../schemas/servicos-adicionais";
import { TiposObjeto } from "../schemas/tipos-objeto";
import { DateUtil } from "../util/date";
import { TextUtil } from "../util/text";
import { BaseApiClient } from "./base";

 
/**
 * A client for the Correios Preco API.
 */
export class PrecoApiClient extends BaseApiClient {

    protected override readonly CurrentApi: CorreiosAPIs = CorreiosAPIs.Cep;
    protected override readonly Endpoint = "/preco/v1";

    constructor() {
        super();
    }

    /**
     * Calculates the national shipping price based on the provided parameters.
     * @param consulta - The object containing the parameters for the shipping calculation.
     * @returns A Promise that resolves to a Preco object containing the calculated price, or a MessageResponse object if an error occurred.
     */
    async nacional(consulta: ConsultaPreco): Promise<Preco | MessageResponse> {

        const cepOrigem = TextUtil.getOnlyNumbers(consulta.cepOrigem);
        const cepDestino = TextUtil.getOnlyNumbers(consulta.cepDestino);

        const valorDeclarado = consulta.valorDeclarado?.toLocaleString("pt-BR") ?? "0";
        const pesoEmGramas = consulta.pesoEmGramas?.toLocaleString("pt-BR") ?? "0";
        const tipoObjeto = consulta.tipoObjeto?.toString() ?? TiposObjeto.Pacote;
        const larguraCm = consulta.larguraCm?.toLocaleString("pt-BR") ?? "0";
        const alturaCm = consulta.alturaCm?.toLocaleString("pt-BR") ?? "0";
        const dtEvento = DateUtil.format(new Date(), "dd-MM-yyyy");

        const parametros = new Map<String, string>([
            ["cepOrigem", cepOrigem],
            ["cepDestino", cepDestino],
            ["psObjeto", pesoEmGramas],
            ["tpObjeto", tipoObjeto],
            ["largura", larguraCm],
            ["altura", alturaCm],
            ["vlDeclarado", valorDeclarado],
            ["dtEvento", dtEvento],
        ]);

        if (consulta.tipoObjeto == TiposObjeto.RoloOuPrima) {
            const diametroCm = consulta.diametroCm?.toLocaleString("pt-BR") ?? "0";
            parametros.set("diametro", diametroCm);
        }
        else {
            const comprimentoCm = consulta.comprimentoCm?.toLocaleString("pt-BR") ?? "0";
            parametros.set("comprimento", comprimentoCm);
        }

        if (consulta.isAvisoRecebimento)
            parametros.set("servicosAdicionais", ServicosAdicionais.AvisoRecebimento);

        if (consulta.isMaoPropria)
            parametros.set("servicosAdicionais", ServicosAdicionais.MaoPropria);

        if (consulta.valorDeclarado > 0)
            parametros.set("servicosAdicionais", ServicosAdicionais.ValorDeclarado);

        const query = Array.from(parametros, ([key, val]) => `${key}=${val}`).join('&');
        const codServico = consulta.codigoProduto;

        const result = await this.get(`${this.Endpoint}/nacional/${codServico}?${query}`);

        if (result instanceof MessageResponse) {
            return result;
        }
        return new Preco(result);
    }

}