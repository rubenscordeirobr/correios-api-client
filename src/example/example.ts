import apiClient from "../";
import { Configuration, MessageResponse } from "../schemas/";
import { ConsultaPreco } from "../schemas/consulta-preco";
import { ServicosCorreios } from "../schemas/servicos-correios";
import { TiposObjeto } from "../schemas/tipos-objeto";
 
const fs = require('fs');
const json = fs.readFileSync("./configuration.json", "utf8");
const configuration = JSON.parse(json) as Configuration;

async function examples() {
    try {

        apiClient.initialize(configuration);

        const token = await apiClient.Token.autentica();
        const tokenCartaoPostagem = await apiClient.Token.autenticaCartaoPostagem();
        const tokenContrato = await apiClient.Token.autenticaContrato();
  
        const endereco = await apiClient.Cep.search("85070555");
        const enderecos = await apiClient.Cep.searchMany(["85070555", "85070200"]);
        const prazo = await apiClient.Prazo.nacional(ServicosCorreios.Sedex_SemContrato, "85070555", "85070200");

        const consultaPreco: ConsultaPreco = {
            alturaCm: 20,
            cepDestino: "85070555",
            cepOrigem: "85070222",
            comprimentoCm: 20,
            diametroCm: 0,
            tipoObjeto: TiposObjeto.Pacote,
            larguraCm: 20,
            pesoEmGramas: 300,
            codigoProduto: "03220",
            isAvisoRecebimento: false,
            isMaoPropria: false,
            valorDeclarado: 200
        };

        const preco = await apiClient.Preco.nacional(consultaPreco);
        const rastroErro = await apiClient.Rastro.search("000");
        const rastro = await apiClient.Rastro.search("LX697446262CN");

        maybeLog(token);
        maybeLog(tokenContrato);
        maybeLog(tokenCartaoPostagem);
        maybeLog(preco);
        maybeLog(endereco);
        maybeLog(enderecos);
        maybeLog(prazo);
        maybeLog(rastro);
    }
    catch (error) {
        console.error(error);
        //     }
    }
}
examples().then(() => {
    console.log("End.")
}).catch((error) => {
    console.error(error);
});

function maybeLog(value: any) {

    if (value instanceof MessageResponse) {
        console.error(value.msgs.join("\n"));
    }
}