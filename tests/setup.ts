import apiClient from "../src"
import { Ambientes, Configuration } from "../src/schemas";
import fs from "fs";

declare global {

    var FakeConfiguration: Configuration;
    var Configuration: Configuration;
}

if (!global.FakeConfiguration) {

    global.FakeConfiguration = {
        ambiente: Ambientes.Homologacao ,
        idCorreios: "13442724",
        codigoAcesso: "U6XnzCdiODBVtAVAZhlCrI8HwhnHK51hKZn38eo1",
        contrato: "1234567890",
        cartaoPostagem: "00000"
    };
}

if(!global.Configuration){
    const json = fs.readFileSync("./tests/configuration.json", "utf8");
    const realConfiguration = JSON.parse(json) as Configuration;
    global.Configuration = realConfiguration;
}
 

beforeEach(() => {
    apiClient.initialize(global.Configuration);
});