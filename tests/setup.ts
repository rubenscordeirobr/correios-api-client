import apiClient from "../src"
import { Ambientes, Configuration, MessageResponse } from "../src/schemas";
import fs from "fs";

declare global {

    var FakeConfiguration: Configuration;
    var Configuration: Configuration;
    var logMessageResponse: (messageResponse: any) => void;
}

if (!global.FakeConfiguration) {

    global.FakeConfiguration = {
        ambiente: Ambientes.Homologacao,
        idCorreios: "13442724",
        codigoAcesso: "U6XnzCdiODBVtAVAZhlCrI8HwhnHK51hKZn38eo1",
        contrato: "1234567890",
        cartaoPostagem: "00000"
    };
}

if (!global.Configuration) {
    const json = fs.readFileSync("./configuration.json", "utf8");
    const realConfiguration = JSON.parse(json) as Configuration;
    console.log("Configuration", realConfiguration);
    global.Configuration = realConfiguration;
}

if (!global.logMessageResponse) {
    global.logMessageResponse = function(messageResponse: any) {

        if (messageResponse instanceof MessageResponse)
            console.log(messageResponse.msgs.join("\n"));

        if (messageResponse instanceof Error)
            console.log(messageResponse);
    }
}

beforeEach(() => {
    apiClient.initialize(global.Configuration);
});